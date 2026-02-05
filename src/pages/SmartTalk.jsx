import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { requestToGroq } from "../utils/groq";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

const SmartTalk = () => {
  const { isDarkMode } = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // add user message langsung
    const userMessage = {
      id: Date.now(),
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const ai = await requestToGroq(input);

      const aiResponse = {
        id: Date.now() + 1,
        type: "assistant",
        text: ai.content,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "assistant",
          text: "❌ Terjadi error saat memanggil AI",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    t("suggestedQuestions1"),
    t("suggestedQuestions2"),
    t("suggestedQuestions3"),
    t("suggestedQuestions4"),
    t("suggestedQuestions5"),
  ];

  return (
    <div
      className={`min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-4 ${
        isDarkMode ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Messages Area */}
      {messages.length > 0 ? (
        <div className="w-full max-w-4xl flex-1 overflow-y-auto py-4 sm:py-8 space-y-3 sm:space-y-6 pb-24 sm:pb-32">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-3xl px-3 sm:px-6 py-3 sm:py-4 rounded-2xl break-words whitespace-pre-wrap overflow-hidden text-sm sm:text-base ${
                  message.type === "user"
                    ? isDarkMode
                      ? "bg-purple-600 text-white"
                      : "bg-purple-500 text-white"
                    : isDarkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                {message.type === "assistant" ? (
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <pre
                          {...props}
                          className="whitespace-pre-wrap break-words overflow-hidden max-w-full text-xs sm:text-sm bg-gray-900 p-2 sm:p-3 rounded-lg my-2"
                        />
                      ),
                      code: ({ node, inline, ...props }) =>
                        inline ? (
                          <code
                            {...props}
                            className="break-words whitespace-pre-wrap bg-gray-700 px-1 py-0.5 rounded text-xs sm:text-sm"
                          />
                        ) : (
                          <code
                            {...props}
                            className="break-words whitespace-pre-wrap text-xs sm:text-sm"
                          />
                        ),
                      p: ({ node, ...props }) => (
                        <p {...props} className="mb-2 last:mb-0" />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul {...props} className="list-disc ml-4 mb-2" />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol {...props} className="list-decimal ml-4 mb-2" />
                      ),
                      li: ({ node, ...props }) => (
                        <li {...props} className="mb-1" />
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  <p className="break-words whitespace-pre-wrap">
                    {message.text}
                  </p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div
                className={`max-w-[85%] sm:max-w-2xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Empty State - Center Screen
        <div className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-4">
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row max-w-2xl">
            {/* Icon */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
                isDarkMode
                  ? "bg-purple-600/20 border border-purple-500"
                  : "bg-purple-100 border border-purple-300"
              }`}
            >
              <i
                className={`fas fa-robot text-2xl sm:text-3xl md:text-4xl ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              ></i>
            </div>

            {/* Text */}
            <h1
              className={`text-2xl sm:text-3xl md:text-5xl font-normal text-center ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t("smartTalkGreeting")}
            </h1>
          </div>
        </div>
      )}

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="w-full max-w-4xl pb-3 sm:pb-4 px-2">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(question)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area - Fixed Bottom */}
      <div className="w-full max-w-4xl pb-4 sm:pb-8 pt-3 sm:pt-4 px-2 sm:px-0">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-4 rounded-full border ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-300 shadow-lg"
            }`}
          >
            {/* Input Field */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("askAnything")}
              className={`flex-1 bg-transparent outline-none text-sm sm:text-base ${
                isDarkMode
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!input.trim()}
              className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                input.trim()
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-600"
                  : "bg-gray-200 text-gray-400"
              } transition-all`}
            >
              <i className="fas fa-arrow-up text-sm sm:text-lg"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmartTalk;