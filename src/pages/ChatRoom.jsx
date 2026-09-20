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
} from "firebase/database";
import Swal from "sweetalert2";

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

  const messagesEndRef = useRef(null);

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

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Login with Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      Swal.fire({
        text: t("errorLoginGoogle"),
        icon: "error",
        confirmButtonText: "OK",
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
      Swal.fire({
        text: "Failed to sign in anonymously",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsAnonLoggingIn(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: t("logoutConfirmation"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D4F933",
        cancelButtonColor: "#4b5563",
        confirmButtonText: t("confirmLogoutButtonText"),
        cancelButtonText: t("cancelLogoutButtonText"),
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
      Swal.fire({
        text: t("errorSendingMessage"),
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSending(false);
    }
  };

  // Delete message
  const handleDeleteMessage = async (messageId) => {
    const result = await Swal.fire({
      title: t("deleteMessageConfirmation"),
      text: t("deleteMessageWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#4b5563",
      confirmButtonText: t("confirmDeleteButtonText"),
      cancelButtonText: t("cancelLogoutButtonText"),
    });

    if (result.isConfirmed) {
      setDeletingMessageId(messageId);
      try {
        const messageRef = ref(database, `messages/${messageId}`);
        await remove(messageRef);
      } catch (error) {
        console.error("Delete message error:", error);
        Swal.fire({
          text: t("errorDeletingMessage"),
          icon: "error",
          confirmButtonText: "OK",
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
          <div
            className={`flex items-center gap-2 font-mono text-xs mb-2 ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
              }`}
            ></span>
            <span>DISPATCH NETWORK // LIVE FEED</span>
          </div>

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
            className={`flex items-center gap-3 self-start sm:self-center p-2 rounded-xl border ${
              isDarkMode
                ? "border-white/[0.08] bg-[#121216]"
                : "border-black/[0.08] bg-white shadow-xs"
            }`}
          >
            <img
              src={getAvatarUrl(user.photoURL, user.displayName || "Anonymous")}
              alt={user.displayName || "Anonymous"}
              className="w-9 h-9 rounded-lg border border-[#D4F933]/40 object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getAvatarUrl(null, user.displayName || "Anonymous");
              }}
            />
            <div className="pr-2">
              <p className="font-mono text-[10px] text-gray-400">
                {user.isAnonymous ? "AUTH // ANON" : "AUTH // GOOGLE"}
              </p>
              <p className={`font-mono text-xs font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {user.displayName || "Anonymous"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className={`px-2.5 py-1.5 rounded-md font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 hover:text-red-400 border transition-all ${
                isDarkMode
                  ? "border-white/[0.08] hover:border-red-400/30"
                  : "border-black/[0.08] hover:border-red-400/30"
              }`}
              title={t("logout")}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-2xl ${
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
            <span className="ml-2 text-gray-400 font-mono text-[11px]">CHANNEL // PUBLIC-STREAM</span>
          </div>
          <span
            className={`font-semibold text-[11px] ${
              isDarkMode ? "text-[#D4F933]/90" : "text-[#2D5204]"
            }`}
          >
            [ACTIVE MESSAGES: {messages.length}]
          </span>
        </div>

        {/* Messages Stream Area */}
        <div
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
                  } group`}
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
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="font-mono text-[11px] font-semibold text-gray-400">
                        {isOwnMessage ? (
                          <>
                            {isOwner && (
                              <i
                                className={`fas fa-crown text-xs mr-1 ${
                                  isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                                }`}
                              ></i>
                            )}
                            <span
                              className={
                                isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                              }
                            >
                              {t("you")}
                            </span>
                          </>
                        ) : (
                          <>
                            {isOwner && (
                              <i
                                className={`fas fa-crown text-xs mr-1 ${
                                  isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                                }`}
                              ></i>
                            )}
                            <span>{message.userName}</span>
                          </>
                        )}
                      </span>
                      <span className="font-mono text-[10px] text-gray-600">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm leading-relaxed border break-words ${
                          isOwnMessage
                            ? isDarkMode
                              ? "bg-[#181920] border-[#D4F933]/30 text-white rounded-tr-xs"
                              : "bg-gray-900 border-gray-800 text-white rounded-tr-xs"
                            : isDarkMode
                            ? "bg-[#121216] border-white/[0.08] text-gray-200 rounded-tl-xs"
                            : "bg-white border-black/[0.08] text-gray-900 rounded-tl-xs shadow-xs"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      </div>

                      {isOwnMessage && (
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          disabled={deletingMessageId === message.id}
                          className="p-1.5 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
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
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input / Authentication Form */}
        {user ? (
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-inherit bg-inherit"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t("typeMessage")}
                disabled={sending}
                className={`flex-1 px-4 py-3 rounded-xl font-mono text-xs sm:text-sm focus:outline-none transition-all ${
                  isDarkMode
                    ? "bg-[#181920] border border-white/[0.1] text-white placeholder-gray-500 focus:border-[#D4F933]"
                    : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#2D5204]"
                }`}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || sending}
                className={`px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  !newMessage.trim() || sending
                    ? "bg-white/[0.05] text-gray-600 border border-white/[0.05] cursor-not-allowed"
                    : isDarkMode
                    ? "bg-[#D4F933] hover:bg-[#bce615] text-black border border-[#D4F933] shadow-md"
                    : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] border border-black shadow-md"
                }`}
              >
                {sending ? (
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                ) : (
                  <>
                    <span className="hidden sm:inline">TRANSMIT</span>
                    <i className="fas fa-paper-plane text-xs"></i>
                  </>
                )}
              </button>
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
