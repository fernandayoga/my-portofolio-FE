import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  auth,
  database,
  googleProvider,
  githubProvider,
} from "../firebase/config";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
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

  // Auth State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (!user) return;

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

  // Login with GitHub
  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      Swal.fire({
        text: t("errorLoginGithub"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: t("logoutConfirmation"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7c3aed", // purple
        cancelButtonColor: "#6b7280", // gray
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
      title: t("deleteConfirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed", // purple
      cancelButtonColor: "#6b7280", // gray
      confirmButtonText: t("confirmButtonText"),
      cancelButtonText: t("cancelButtonText"),
    });

    if (!result.isConfirmed) return;

    setDeletingMessageId(messageId);

    try {
      const messageRef = ref(database, `messages/${messageId}`);
      await remove(messageRef);
    } catch (error) {
      console.error("Delete message error:", error);
      alert("Failed to delete message. Please try again.");
    } finally {
      setDeletingMessageId(null);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get avatar URL
  const getAvatarUrl = (photoURL, displayName) => {
    if (photoURL) return photoURL;
    // Generate avatar dengan inisial, background purple, text putih
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName || "User",
    )}&background=9333ea&color=fff&bold=true&size=128`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          isDarkMode ? "bg-black" : "bg-gray-50"
        }`}
      >
        <div
          className={`max-w-md w-full p-8 rounded-2xl ${
            isDarkMode
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-gray-200 shadow-xl"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comments text-white text-3xl"></i>
            </div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t("chatRoom")}
            </h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {t("signInToChat")}
            </p>
          </div>

          {/* Login Buttons */}
          <div className="space-y-3">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? "bg-white hover:bg-gray-100 text-gray-900"
                  : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t("continueWithGoogle")}
            </button>

            {/* GitHub Login */}
            <button
              onClick={handleGithubLogin}
              className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              <i className="fab fa-github text-xl"></i>
              {t("continueWithGithub")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chat Room (Logged In)
  return (
    <div className="min-h-screen py-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("chatRoom")}
          </h1>
          <p
            className={`text-sm sm:text-base  ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("chatRoomSubtitle")}
          </p>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3">
          <img
            src={getAvatarUrl(user.photoURL, user.displayName)}
            alt={user.displayName}
            className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
          />
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm  font-medium transition-all ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            {t("logout")}
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200 shadow-lg"
        }`}
      >
        {/* Messages Area */}
        <div
          className={`h-[500px]  overflow-y-auto p-6 space-y-4 ${
            isDarkMode ? "bg-gray-950" : "bg-gray-50"
          }`}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <i
                className={`fas fa-comments text-6xl mb-4 ${
                  isDarkMode ? "text-gray-700" : "text-gray-300"
                }`}
              ></i>
              <p
                className={`${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                {t("noMessages")}
              </p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.userId === user.uid;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    isOwnMessage ? "flex-row-reverse" : "flex-row"
                  } group`}
                >
                  {/* Avatar */}
                  <img
                    src={getAvatarUrl(message.userPhoto, message.userName)}
                    alt={message.userName}
                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                  />

                  {/* Message */}
                  <div
                    className={`flex flex-col ${
                      isOwnMessage ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {isOwnMessage ? t("you") : message.userName}
                      </span>
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <div
                        className={`px-4 py-2 rounded-2xl max-w-md ${
                          isOwnMessage
                            ? "bg-purple-600 text-white rounded-br-none"
                            : isDarkMode
                            ? "bg-gray-800 text-gray-100 rounded-bl-none"
                            : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm break-words">{message.text}</p>
                      </div>

                      {/* Delete Button - Only show for own messages */}
                      {isOwnMessage && (
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          disabled={deletingMessageId === message.id}
                          className={`opacity-100 transition-opacity p-2 rounded-lg ${
                            isDarkMode
                              ? "hover:bg-gray-800 text-gray-400 hover:text-red-400"
                              : "hover:bg-gray-100 text-gray-400 hover:text-red-500"
                          }`}
                          title={t("deleteMessage")}
                        >
                          {deletingMessageId === message.id ? (
                            <i className="fas fa-spinner fa-spin text-sm"></i>
                          ) : (
                            <i className="fas fa-trash text-sm"></i>
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

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className={`p-4 border-t ${
            isDarkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex gap-1 sm:gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t("typeMessage")}
              disabled={sending}
              className={`flex-1 max-w-[200px] sm:max-w-none px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode
                  ? "bg-gray-800 text-white placeholder-gray-500"
                  : "bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200"
              }`}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className={`px-6 py-3 rounded-lg   font-medium transition-all ${
                !newMessage.trim() || sending
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {sending ? (
                <i className="fas fa-spinner fa-spin "></i>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
