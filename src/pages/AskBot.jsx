import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { requestToGroq } from "../utils/groq";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

const AskBot = () => {
  const { isDarkMode } = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("smartTalkMessages");
    const savedTime = localStorage.getItem("smartTalkTimestamp");
    
    // 24 Jam dalam milidetik
    const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    if (savedMessages && savedTime) {
      if (Date.now() - parseInt(savedTime) < EXPIRATION_TIME) {
        return JSON.parse(savedMessages);
      } else {
        localStorage.removeItem("smartTalkMessages");
        localStorage.removeItem("smartTalkTimestamp");
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("smartTalkMessages", JSON.stringify(messages));
      localStorage.setItem("smartTalkTimestamp", Date.now().toString());
    } else {
      localStorage.removeItem("smartTalkMessages");
      localStorage.removeItem("smartTalkTimestamp");
    }
  }, [messages]);

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

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem("smartTalkMessages");
    localStorage.removeItem("smartTalkTimestamp");
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
      className={`min-h-[100dvh] flex flex-col items-center justify-between px-3 sm:px-4 ${
        isDarkMode ? "bg-[#0A0A0C]" : "bg-white"
      }`}
    >
      {/* Top Header Eyebrow */}
      <div
        className={`w-full max-w-4xl pt-20 xl:pt-8 pb-4 flex items-center justify-between border-b ${
          isDarkMode ? "border-white/[0.08]" : "border-black/[0.08]"
        }`}
      >
        <div
          className={`flex items-center gap-2 font-mono text-xs ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
            }`}
          ></span>
          <span>AI COMMAND TERMINAL // V2</span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="font-mono text-xs px-3 py-1.5 rounded-md border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-1.5"
          >
            <i className="fas fa-trash-alt text-[10px]"></i>
            <span>{t("clearHistory")}</span>
          </button>
        )}
      </div>

      {/* Messages Area */}
      {messages.length > 0 ? (
        <div className="w-full max-w-4xl flex-1 flex flex-col py-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 pb-12 px-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-3xl px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm leading-relaxed border ${
                    message.type === "user"
                      ? isDarkMode
                        ? "bg-[#181920] border-[#D4F933]/30 text-white"
                        : "bg-gray-900 border-gray-800 text-white"
                      : isDarkMode
                      ? "bg-[#121216] border-white/[0.08] text-gray-200"
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-inherit font-mono text-[10px] text-gray-400">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                      }`}
                    >
                      {message.type === "user" ? "// USER QUERY" : "// ASSISTANT RESPONSE"}
                    </span>
                  </div>

                  {message.type === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => (
                          <pre
                            {...props}
                            className="whitespace-pre-wrap break-words overflow-x-auto max-w-full font-mono text-xs bg-black/50 p-3 rounded-lg border border-white/[0.08] my-3"
                          />
                        ),
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code
                              {...props}
                              className={`font-mono px-1.5 py-0.5 rounded text-xs ${
                                isDarkMode
                                  ? "bg-white/[0.08] text-[#D4F933]"
                                  : "bg-black/[0.08] text-[#2D5204]"
                              }`}
                            />
                          ) : (
                            <code
                              {...props}
                              className="font-mono text-xs"
                            />
                          ),
                        p: ({ node, ...props }) => (
                          <p {...props} className="mb-2 last:mb-0" />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul {...props} className="list-disc ml-5 mb-2 space-y-1" />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol {...props} className="list-decimal ml-5 mb-2 space-y-1" />
                        ),
                        li: ({ node, ...props }) => (
                          <li {...props} className="mb-0.5" />
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  ) : (
                    <p className="break-words whitespace-pre-wrap font-sans">
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className={`px-5 py-3 rounded-xl border ${
                    isDarkMode ? "bg-[#121216] border-white/[0.08]" : "bg-white border-gray-200"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 font-mono text-xs ${
                      isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                        isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
                      }`}
                    ></span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s] ${
                        isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
                      }`}
                    ></span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s] ${
                        isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
                      }`}
                    ></span>
                    <span className="ml-1 text-[11px] text-gray-400">PROCESSING TRANSMISSION...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-4 my-auto py-12">
          <div className="flex flex-col items-center text-center max-w-xl">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg ${
                isDarkMode
                  ? "bg-[#D4F933]/10 border border-[#D4F933]/30 text-[#D4F933]"
                  : "bg-[#0A0A0C] border border-black text-[#D4F933]"
              }`}
            >
              <i className="fas fa-terminal text-2xl"></i>
            </div>

            <h1
              className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t("smartTalkGreeting")}
            </h1>
            <p
              className={`font-mono text-xs max-w-md ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Ask about Fernanda's technical stack, experience, repositories, and architectural methodologies.
            </p>
          </div>
        </div>
      )}

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="w-full max-w-4xl pb-4 px-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(question)}
                className={`px-3.5 py-2 rounded-lg font-mono text-xs transition-all border ${
                  isDarkMode
                    ? "bg-[#121216] border-white/[0.08] text-gray-300 hover:border-[#D4F933]/50 hover:text-white"
                    : "bg-gray-100 border-black/[0.08] text-gray-700 hover:border-[#2D5204] hover:bg-gray-200"
                }`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="w-full max-w-4xl pb-16 sm:pb-8 pt-3 px-2 sm:px-0">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.12] focus-within:border-[#D4F933]"
                : "bg-white border-black/[0.12] focus-within:border-[#2D5204] shadow-sm"
            }`}
          >
            <span
              className={`font-mono text-xs mr-3 select-none font-bold ${
                isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
              }`}
            >
              &gt;
            </span>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("askAnything")}
              className={`flex-1 bg-transparent outline-none font-mono text-xs sm:text-sm min-w-0 ${
                isDarkMode
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                input.trim()
                  ? isDarkMode
                    ? "bg-[#D4F933] hover:bg-[#bce615] text-black font-bold shadow-xs"
                    : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] font-bold shadow-xs"
                  : isDarkMode
                  ? "bg-[#181920] text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-arrow-up text-xs"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskBot;