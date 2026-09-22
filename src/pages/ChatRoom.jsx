import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  auth,
  database,
  googleProvider,
} from "../firebase/config";
import { signInWithPopup, signOut, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  ref,
  push,
  onValue,
  serverTimestamp,
  query,
  orderByChild,
  limitToLast,
  remove,
  set,
} from "firebase/database";
import Swal from "sweetalert2";

const MAX_CHARS = 300;
const POPULAR_EMOJIS = ["👍", "❤️", "🔥", "🚀", "💻", "⚡", "✨", "🎉", "👀", "🙌", "😂", "😎", "💯", "🤖", "☕", "👋"];
const QUICK_REACTIONS = ["👍", "❤️", "🔥", "🚀", "😂"];

const ChatRoom = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const OWNER_UID = import.meta.env.VITE_OWNER_UID;

  // Auth State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAnonLoggingIn, setIsAnonLoggingIn] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState(null);

  // Advanced UX & Animation States
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [activeReactionMenuId, setActiveReactionMenuId] = useState(null);
  const [bursts, setBursts] = useState([]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to messages
  useEffect(() => {
    const messagesRef = ref(database, "messages");
    const messagesQuery = query(
      messagesRef,
      orderByChild("timestamp"),
      limitToLast(50),
    );

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    }, (error) => {
      console.error("Gagal mengambil pesan dari Firebase:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // Close emoji picker or reaction menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
      if (!e.target.closest(".reaction-container")) {
        setActiveReactionMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect scroll position for Floating Scroll-To-Bottom button
  const handleChatScroll = () => {
    const el = chatContainerRef.current;
    if (!el) return;
    const isUp = el.scrollHeight - el.scrollTop - el.clientHeight > 120;
    setShowScrollBottom(isUp);
  };

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollBottom(false);
  };

  // Auto scroll to bottom only when user isn't scrolled far up
  useEffect(() => {
    if (!showScrollBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showScrollBottom]);

  // Custom Cyber Alert Helper
  const showCyberAlert = ({ title, text, icon = "info" }) => {
    const isDark = isDarkMode;
    const iconColors = {
      error: "bg-red-500/10 border-red-500/30 text-red-400",
      warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      info: "bg-[#D4F933]/10 border-[#D4F933]/30 text-[#D4F933]",
      success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    };
    const iconIcons = {
      error: "fas fa-exclamation-triangle",
      warning: "fas fa-shield-alt",
      info: "fas fa-info-circle",
      success: "fas fa-check-circle",
    };

    return Swal.fire({
      html: `
        <div class="flex flex-col items-center text-center">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center border ${iconColors[icon] || iconColors.info} mb-4">
            <i class="${iconIcons[icon] || iconIcons.info} text-2xl"></i>
          </div>
          ${title ? `<h3 class="font-mono text-base sm:text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'} mb-1.5">${title}</h3>` : ''}
          ${text ? `<p class="font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed max-w-xs">${text}</p>` : ''}
        </div>
      `,
      buttonsStyling: false,
      background: isDark ? "#121216" : "#ffffff",
      color: isDark ? "#ffffff" : "#0f172a",
      backdrop: isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(15, 23, 42, 0.4)",
      confirmButtonText: "OK",
      customClass: {
        popup: `rounded-2xl border ${
          isDark
            ? "border-white/[0.12] bg-[#121216] shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
            : "border-gray-200 bg-white shadow-2xl"
        } p-6 sm:p-7 backdrop-blur-xl`,
        actions: "!flex !justify-center !mt-6 !w-full",
        confirmButton: `px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
          isDark
            ? "bg-[#D4F933] hover:bg-[#bce615] text-black shadow-[0_0_16px_rgba(212,249,51,0.3)]"
            : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] shadow-md"
        }`,
      },
      showClass: { popup: "animate-modal-zoom" },
    });
  };

  // Login with Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      showCyberAlert({
        title: "Login Failed",
        text: t("errorLoginGoogle"),
        icon: "error",
      });
    }
  };

  // Login Anonymously
  const handleAnonymousLogin = async () => {
    setIsAnonLoggingIn(true);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous login error:", error);
      showCyberAlert({
        title: "Login Failed",
        text: "Failed to sign in anonymously",
        icon: "error",
      });
    } finally {
      setIsAnonLoggingIn(false);
    }
  };

  // Logout with Cyberpunk Modal
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        html: `
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 mb-4">
              <i class="fas fa-sign-out-alt text-2xl"></i>
            </div>
            <h3 class="font-mono text-base sm:text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1.5">
              ${t("logoutConfirmation")}
            </h3>
            <p class="font-mono text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed max-w-xs">
              ${t("logoutWarning")}
            </p>
          </div>
        `,
        showCancelButton: true,
        buttonsStyling: false,
        background: isDarkMode ? "#121216" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#0f172a",
        backdrop: isDarkMode ? "rgba(0, 0, 0, 0.75)" : "rgba(15, 23, 42, 0.4)",
        confirmButtonText: t("confirmLogoutButtonText"),
        cancelButtonText: t("cancelLogoutButtonText"),
        customClass: {
          popup: `rounded-2xl border ${
            isDarkMode
              ? "border-white/[0.12] bg-[#121216] shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
              : "border-gray-200 bg-white shadow-2xl"
          } p-6 sm:p-7 backdrop-blur-xl`,
          actions: "!flex !gap-3 !justify-center !mt-6 !w-full",
          confirmButton: `px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
            isDarkMode
              ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 hover:border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.3)]"
              : "bg-red-600 hover:bg-red-700 text-white shadow-md"
          }`,
          cancelButton: `px-5 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
            isDarkMode
              ? "bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white border border-white/[0.1]"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
          }`,
        },
        showClass: { popup: "animate-modal-zoom" },
      });

      if (!result.isConfirmed) return;
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || sending) return;

    setIsLaunching(true);
    setTimeout(() => setIsLaunching(false), 550);

    setSending(true);

    try {
      const messagesRef = ref(database, "messages");
      await push(messagesRef, {
        text: newMessage.trim(),
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userPhoto: user.photoURL || "",
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Send message error:", error);
      showCyberAlert({
        title: "Transmission Failed",
        text: t("errorSendingMessage"),
        icon: "error",
      });
    } finally {
      setSending(false);
    }
  };

  // Delete message with Cyberpunk Modal
  const handleDeleteMessage = async (messageId) => {
    const result = await Swal.fire({
      html: `
        <div class="flex flex-col items-center text-center">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 mb-4">
            <i class="fas fa-trash-alt text-2xl"></i>
          </div>
          <h3 class="font-mono text-base sm:text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1.5">
            ${t("deleteMessageConfirmation")}
          </h3>
          <p class="font-mono text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed max-w-xs">
            ${t("deleteMessageWarning")}
          </p>
        </div>
      `,
      showCancelButton: true,
      buttonsStyling: false,
      background: isDarkMode ? "#121216" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#0f172a",
      backdrop: isDarkMode ? "rgba(0, 0, 0, 0.75)" : "rgba(15, 23, 42, 0.4)",
      confirmButtonText: t("confirmDeleteButtonText"),
      cancelButtonText: t("cancelDeleteButtonText"),
      customClass: {
        popup: `rounded-2xl border ${
          isDarkMode
            ? "border-white/[0.12] bg-[#121216] shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
            : "border-gray-200 bg-white shadow-2xl"
        } p-6 sm:p-7 backdrop-blur-xl`,
        actions: "!flex !gap-3 !justify-center !mt-6 !w-full",
        confirmButton: `px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
          isDarkMode
            ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 hover:border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.3)]"
            : "bg-red-600 hover:bg-red-700 text-white shadow-md"
        }`,
        cancelButton: `px-5 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
          isDarkMode
            ? "bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white border border-white/[0.1]"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
        }`,
      },
      showClass: { popup: "animate-modal-zoom" },
    });

    if (result.isConfirmed) {
      setDeletingMessageId(messageId);
      try {
        const messageRef = ref(database, `messages/${messageId}`);
        await remove(messageRef);
      } catch (error) {
        console.error("Delete message error:", error);
        showCyberAlert({
          title: "Error",
          text: t("errorDeletingMessage"),
          icon: "error",
        });
      } finally {
        setDeletingMessageId(null);
      }
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  // Get avatar URL
  const getAvatarUrl = (photoURL, displayName) => {
    if (photoURL) return photoURL;
    const name = displayName || "Anonymous";
    if (name === "Anonymous") {
      return "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=D4F933&color=000&bold=true&size=128`;
  };

  // Date Label Helper (Today, Yesterday, or Date with Year)
  const getDateLabel = (timestamp) => {
    if (!timestamp) return "";
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    if (isSameDay(messageDate, today)) {
      return t("today");
    }
    if (isSameDay(messageDate, yesterday)) {
      return t("yesterday");
    }

    return messageDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Toggle Reaction Handler
  const handleToggleReaction = async (messageId, emoji) => {
    if (!user) {
      showCyberAlert({
        title: "Access Required",
        text: t("signInToReact"),
        icon: "info",
      });
      return;
    }

    const currentMsg = messages.find((m) => m.id === messageId);
    if (!currentMsg) return;

    const hasReacted = Boolean(currentMsg.reactions?.[emoji]?.[user.uid]);
    const reactionRef = ref(database, `messages/${messageId}/reactions/${emoji}/${user.uid}`);

    // 1. Optimistic UI update for immediate response
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id !== messageId) return msg;
        const reactions = { ...(msg.reactions || {}) };
        const emojiGroup = { ...(reactions[emoji] || {}) };

        if (hasReacted) {
          delete emojiGroup[user.uid];
          if (Object.keys(emojiGroup).length === 0) {
            delete reactions[emoji];
          } else {
            reactions[emoji] = emojiGroup;
          }
        } else {
          emojiGroup[user.uid] = true;
          reactions[emoji] = emojiGroup;
        }

        return { ...msg, reactions };
      })
    );

    // 2. Trigger floating emoji burst animation
    if (!hasReacted) {
      const burstId = `${Date.now()}-${Math.random()}`;
      setBursts((prev) => [...prev, { id: burstId, messageId, emoji }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 850);
    }

    try {
      if (hasReacted) {
        await remove(reactionRef);
      } else {
        await set(reactionRef, true);
      }
    } catch (err) {
      console.error("Failed to toggle reaction:", err);

      // Revert optimistic update
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === messageId ? currentMsg : msg))
      );

      const errStr = (err?.message || "").toLowerCase();
      if (errStr.includes("permission_denied") || errStr.includes("permission denied")) {
        showCyberAlert({
          title: "Firebase Rules Restriction",
          text: "Izin ditolak (Permission Denied). Perbarui Security Rules di Firebase Console agar semua pengguna dapat memberi reaksi.",
          icon: "warning",
        });
      } else {
        showCyberAlert({
          title: "Error",
          text: "Gagal menyimpan reaksi ke database.",
          icon: "error",
        });
      }
    }
  };

  // Insert Emoji to Message
  const handleInsertEmoji = (emoji) => {
    if (newMessage.length + emoji.length > MAX_CHARS) return;
    setNewMessage((prev) => prev + emoji);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className={`flex items-center gap-3 font-mono text-sm ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full animate-ping ${
              isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
            }`}
          ></div>
          <span>CONNECTING TO DISPATCH NODE...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 pt-20 xl:pt-8 max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("chatRoom")}
          </h1>
          <p
            className={`font-mono text-xs sm:text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("chatRoomSubtitle")}
          </p>
        </div>

        {/* User Status / Logout */}
        {user && (
          <div
            className={`flex items-center gap-3 self-start sm:self-center px-3 py-2 rounded-xl border transition-all ${
              isDarkMode
                ? "border-white/[0.08] bg-[#121216]/90 backdrop-blur-md shadow-lg"
                : "border-black/[0.08] bg-white/90 backdrop-blur-md shadow-xs"
            }`}
          >
            <div className="relative">
              <img
                src={getAvatarUrl(user.photoURL, user.displayName || "Anonymous")}
                alt={user.displayName || "Anonymous"}
                className="w-9 h-9 rounded-lg border border-[#D4F933]/50 object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getAvatarUrl(null, user.displayName || "Anonymous");
                }}
              />
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 ${
                isDarkMode ? "border-[#121216]" : "border-white"
              }`}></span>
            </div>

            <div className="pr-1">
              <p className={`font-mono text-xs font-semibold tracking-wide ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {user.displayName || "Anonymous"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className={`group/logout relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border overflow-hidden cursor-pointer select-none active:scale-95 ${
                isDarkMode
                  ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_16px_rgba(239,68,68,0.3)]"
                  : "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 shadow-xs"
              }`}
              title={t("logout")}
            >
              {/* Holographic Sheen Sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/logout:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]" />

              <span className="relative z-10 hidden sm:inline">
                {t("logout")}
              </span>
              <i className="fas fa-sign-out-alt text-xs transition-transform duration-300 group-hover/logout:translate-x-0.5 relative z-10"></i>
            </button>
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div
        className={`relative rounded-2xl border overflow-hidden shadow-2xl ${
          isDarkMode
            ? "bg-[#121216] border-white/[0.08]"
            : "bg-white border-black/[0.08]"
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="px-5 py-3 border-b border-inherit bg-white/[0.01] flex items-center justify-between font-mono text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
            <span className="ml-2 text-gray-400 font-mono text-[11px] font-medium tracking-wide">
              {t("publicChannel")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold text-[11px] flex items-center gap-2 ${
                isDarkMode ? "text-[#D4F933]/90" : "text-[#2D5204]"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F933] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4F933]"></span>
              </span>
              <span>[ACTIVE MESSAGES: {messages.length}]</span>
            </span>
          </div>
        </div>

        {/* Messages Stream Area */}
        <div
          ref={chatContainerRef}
          onScroll={handleChatScroll}
          className={`h-[520px] overflow-y-auto p-5 sm:p-6 space-y-4 ${
            isDarkMode ? "bg-[#0A0A0C]" : "bg-gray-50/50"
          }`}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <i
                className={`fas fa-terminal text-4xl mb-3 ${
                  isDarkMode ? "text-gray-700" : "text-gray-300"
                }`}
              ></i>
              <p
                className={`font-mono text-xs ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {t("noMessages")}
              </p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = user && message.userId === user.uid;
              const isOwner = message.userId === OWNER_UID;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    isOwnMessage ? "flex-row-reverse" : "flex-row"
                  } group animate-message-pop`}
                >
                  <img
                    src={getAvatarUrl(message.userPhoto, message.userName)}
                    alt={message.userName}
                    className="w-8 h-8 rounded-md flex-shrink-0 object-cover border border-white/[0.1] mt-0.5"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getAvatarUrl(null, message.userName);
                    }}
                  />

                  <div
                    className={`flex flex-col ${
                      isOwnMessage ? "items-end" : "items-start"
                    } max-w-[85%] sm:max-w-md`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {/* Special Creator / Developer Badge (Option 6) */}
                      {isOwner && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-[#D4F933]/15 text-[#D4F933] border border-[#D4F933]/40 shadow-[0_0_8px_rgba(212,249,51,0.25)] mr-0.5">
                          <i className="fas fa-crown text-[8px] text-[#D4F933]"></i>
                          <span>{t("creatorBadge")}</span>
                        </span>
                      )}

                      <span className="font-mono text-[11px] font-semibold text-gray-400">
                        {isOwnMessage ? (
                          <span className={isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"}>
                            {t("you")}
                          </span>
                        ) : (
                          <span>{message.userName}</span>
                        )}
                      </span>

                      {message.timestamp && (
                        <span className="font-mono text-[10px] text-gray-500 flex items-center gap-1">
                          <span>{getDateLabel(message.timestamp)}</span>
                          <span className="text-[8px] text-gray-600">•</span>
                          <span>{formatTime(message.timestamp)}</span>
                        </span>
                      )}
                    </div>

                      {/* Bubble & Hover Actions */}
                      <div className="relative flex items-start gap-1.5 reaction-container">
                        {/* Floating Reaction Emoji Burst (Option 2) */}
                        {bursts
                          .filter((b) => b.messageId === message.id)
                          .map((b) => (
                            <span
                              key={b.id}
                              className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl animate-float-reaction z-40 select-none pointer-events-none drop-shadow-[0_0_12px_rgba(212,249,51,0.7)]"
                            >
                              {b.emoji}
                            </span>
                          ))}
                        <div
                          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm leading-relaxed border break-words ${
                            isOwnMessage
                              ? isDarkMode
                                ? "bg-[#181920] border-[#D4F933]/30 text-white rounded-tr-xs"
                                : "bg-gray-900 border-gray-800 text-white rounded-tr-xs"
                              : isOwner
                              ? isDarkMode
                                ? "bg-[#121216] border-[#D4F933]/40 text-gray-100 rounded-tl-xs shadow-[0_0_12px_rgba(212,249,51,0.12)]"
                                : "bg-white border-[#D4F933] text-gray-900 rounded-tl-xs shadow-sm"
                              : isDarkMode
                              ? "bg-[#121216] border-white/[0.08] text-gray-200 rounded-tl-xs"
                              : "bg-white border-black/[0.08] text-gray-900 rounded-tl-xs shadow-xs"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>

                        {/* Actions: React & Delete */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* React Button & Floating Quick Reactions (Option 1) */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveReactionMenuId(
                                  activeReactionMenuId === message.id ? null : message.id
                                )
                              }
                              className="p-1.5 text-gray-500 hover:text-yellow-400 transition-colors cursor-pointer"
                              title="React"
                            >
                              <i className="far fa-smile text-xs"></i>
                            </button>

                            {/* Floating Quick Reaction Bar */}
                            {activeReactionMenuId === message.id && (
                              <div
                                className={`absolute ${
                                  isOwnMessage ? "right-0" : "left-0"
                                } bottom-full mb-1 flex items-center gap-1 p-1 rounded-full border shadow-xl backdrop-blur-md z-30 ${
                                  isDarkMode
                                    ? "bg-[#181920]/95 border-white/[0.15] shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                                    : "bg-white/95 border-gray-200 shadow-md"
                                }`}
                              >
                                {QUICK_REACTIONS.map((emoji) => (
                                  <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => {
                                      handleToggleReaction(message.id, emoji);
                                      setActiveReactionMenuId(null);
                                    }}
                                    className="w-7 h-7 flex items-center justify-center text-sm hover:scale-125 transition-transform active:scale-90 cursor-pointer"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Delete Message Button */}
                          {isOwnMessage && (
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              disabled={deletingMessageId === message.id}
                              className="p-1.5 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                              title={t("deleteMessage")}
                            >
                              {deletingMessageId === message.id ? (
                                <i className="fas fa-spinner fa-spin text-xs"></i>
                              ) : (
                                <i className="fas fa-trash-alt text-xs"></i>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Reaction Chips (Option 1) */}
                      {message.reactions && Object.keys(message.reactions).length > 0 && (
                        <div
                          className={`flex flex-wrap gap-1 mt-1.5 ${
                            isOwnMessage ? "justify-end" : "justify-start"
                          }`}
                        >
                          {Object.entries(message.reactions).map(([emoji, uids]) => {
                            const count = uids && typeof uids === "object" ? Object.keys(uids).length : 0;
                            if (count === 0) return null;
                            const userReacted = Boolean(user && uids && typeof uids === "object" && uids[user.uid]);

                            return (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => handleToggleReaction(message.id, emoji)}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold border transition-all cursor-pointer select-none active:scale-95 ${
                                  userReacted
                                    ? isDarkMode
                                      ? "bg-[#D4F933]/15 border-[#D4F933]/50 text-[#D4F933] shadow-[0_0_8px_rgba(212,249,51,0.2)]"
                                      : "bg-[#2D5204]/10 border-[#2D5204] text-[#2D5204]"
                                    : isDarkMode
                                    ? "bg-white/[0.04] border-white/[0.08] text-gray-400 hover:border-white/[0.2]"
                                    : "bg-gray-100 border-black/[0.08] text-gray-600 hover:border-black/[0.2]"
                                }`}
                                title={`${count} reaction(s)`}
                              >
                                <span>{emoji}</span>
                                <span>{count}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Floating Scroll to Bottom Button (Option 4) */}
        {showScrollBottom && (
          <button
            type="button"
            onClick={scrollToBottom}
            className={`absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border animate-bounce cursor-pointer select-none backdrop-blur-md ${
              isDarkMode
                ? "bg-[#181920]/95 text-[#D4F933] border-[#D4F933]/50 hover:bg-[#22242e] hover:border-[#D4F933] hover:scale-110 active:scale-95 shadow-[0_0_24px_rgba(212,249,51,0.35)]"
                : "bg-white/95 text-gray-900 border-gray-300 hover:bg-gray-50 hover:scale-110 active:scale-95 shadow-xl"
            }`}
            title={t("scrollToBottom")}
          >
            <i className="fas fa-arrow-down text-sm"></i>
          </button>
        )}

        {/* Input / Authentication Form */}
        {user ? (
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-inherit bg-inherit"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Emoji Picker Button & Popover (Option 1) */}
              <div className="relative" ref={emojiPickerRef}>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-3 rounded-xl border font-mono text-sm transition-all flex items-center justify-center cursor-pointer ${
                    showEmojiPicker
                      ? isDarkMode
                        ? "bg-[#D4F933]/20 border-[#D4F933] text-[#D4F933]"
                        : "bg-gray-200 border-gray-400 text-black"
                      : isDarkMode
                      ? "bg-[#181920] border-white/[0.1] text-gray-400 hover:text-white hover:border-white/[0.25]"
                      : "bg-gray-100 border-gray-300 text-gray-600 hover:text-black"
                  }`}
                  title="Emoji Picker"
                >
                  <i className="far fa-smile text-base"></i>
                </button>

                {/* Emoji Popover */}
                {showEmojiPicker && (
                  <div
                    className={`absolute bottom-full mb-2 left-0 z-30 p-3 rounded-xl border shadow-2xl backdrop-blur-xl w-64 ${
                      isDarkMode
                        ? "bg-[#181920]/95 border-white/[0.15] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                        : "bg-white/95 border-gray-200 shadow-xl"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-inherit text-[10px] font-mono text-gray-400">
                      <span className="font-semibold uppercase tracking-wider">Quick Emojis</span>
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(false)}
                        className="hover:text-red-400 p-0.5 cursor-pointer"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {POPULAR_EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleInsertEmoji(emoji)}
                          className={`h-9 rounded-lg flex items-center justify-center text-lg transition-transform hover:scale-125 active:scale-95 cursor-pointer ${
                            isDarkMode ? "hover:bg-white/[0.08]" : "hover:bg-gray-100"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value.slice(0, MAX_CHARS))}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder={t("typeMessage")}
                  disabled={sending}
                  maxLength={MAX_CHARS}
                  className={`w-full px-4 py-3 rounded-xl font-mono text-xs sm:text-sm focus:outline-none transition-all duration-300 ${
                    isDarkMode
                      ? isInputFocused
                        ? "bg-[#181920] border border-[#D4F933] text-white placeholder-gray-500 shadow-[0_0_20px_rgba(212,249,51,0.22)] ring-1 ring-[#D4F933]/50"
                        : "bg-[#181920] border border-white/[0.1] text-white placeholder-gray-500 hover:border-white/[0.2]"
                      : isInputFocused
                      ? "bg-white border border-[#2D5204] text-gray-900 placeholder-gray-400 shadow-[0_0_15px_rgba(0,0,0,0.08)] ring-1 ring-[#2D5204]/40"
                      : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 hover:border-gray-400"
                  }`}
                />

                {/* Cyber Gradient Sweep Line under Input when Focused (Option 5) */}
                {isInputFocused && (
                  <div className="pointer-events-none absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#D4F933] to-transparent animate-pulse rounded-full" />
                )}
              </div>

              <button
                type="submit"
                disabled={!newMessage.trim() || sending}
                className={`group relative overflow-hidden px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 select-none ${
                  !newMessage.trim() || sending
                    ? "bg-white/[0.05] text-gray-600 border border-white/[0.05] cursor-not-allowed"
                    : isDarkMode
                    ? "bg-[#D4F933] hover:bg-[#bce615] text-black border border-[#D4F933] hover:shadow-[0_0_24px_rgba(212,249,51,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                    : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] border border-black hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                }`}
              >
                {/* Holographic Sheen Sweep on Hover */}
                {newMessage.trim() && !sending && (
                  <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg]" />
                )}

                {sending ? (
                  <i className="fas fa-spinner fa-spin text-xs relative z-10"></i>
                ) : (
                  <>
                    <span className="hidden sm:inline relative z-10">{t("send")}</span>
                    <i
                      className={`fas fa-paper-plane text-xs relative z-10 transition-all duration-500 ease-out ${
                        isLaunching
                          ? "translate-x-6 -translate-y-6 opacity-0 rotate-45 scale-125"
                          : "group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-12"
                      }`}
                    ></i>
                  </>
                )}
              </button>
            </div>

            {/* Character Counter & Keyboard Hint (Option 4) */}
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-mono">
              <span className="text-gray-500 hidden sm:inline flex items-center gap-1.5">
                
                {t("enterToSend")}
              </span>
              <span
                className={`ml-auto font-mono text-[10px] transition-colors ${
                  newMessage.length >= MAX_CHARS
                    ? "text-red-400 font-bold"
                    : newMessage.length > MAX_CHARS - 40
                    ? "text-yellow-400 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {newMessage.length} / {MAX_CHARS}
              </span>
            </div>
          </form>
        ) : (
          <div className="p-6 border-t border-inherit text-center bg-inherit">
            <p className={`font-mono text-xs mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {t("signInToChat")}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleGoogleLogin}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-semibold transition-all border ${
                  isDarkMode
                    ? "bg-[#181920] border-white/[0.1] hover:border-[#D4F933] text-white"
                    : "bg-white border-black/[0.1] hover:border-[#2D5204] text-gray-900"
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>SIGN IN WITH GOOGLE</span>
              </button>

              <button
                onClick={handleAnonymousLogin}
                disabled={isAnonLoggingIn}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-semibold transition-all border ${
                  isDarkMode
                    ? "bg-[#181920] border-white/[0.1] hover:border-[#D4F933] text-gray-300 hover:text-white"
                    : "bg-gray-100 border-black/[0.1] hover:border-[#2D5204] text-gray-800"
                } ${isAnonLoggingIn ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isAnonLoggingIn ? (
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                ) : (
                  <i
                    className={`fas fa-user-secret text-xs ${
                      isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                    }`}
                  ></i>
                )}
                <span>ANONYMOUS</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
