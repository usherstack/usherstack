import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotManual } from "@/data/chatbotManual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, MessageSquare, Send, Trash2 } from "lucide-react";
import { debounce } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp?: string;
};

// Optimized bot response function
const getBotResponse = (input: string): string => {
  const lowerInput = input.toLowerCase().trim();

  if (!lowerInput) return chatbotManual.fallback;

  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return chatbotManual.general.greeting;
  }
  if (lowerInput.includes("team")) {
    return chatbotManual.team.info;
  }
  if (lowerInput.includes("contact")) {
    return chatbotManual.contact.info;
  }
  if (lowerInput.includes("service")) {
    return chatbotManual.services.overview;
  }
  if (lowerInput.includes("portfolio") || lowerInput.includes("project")) {
    return chatbotManual.portfolio.info;
  }
  if (lowerInput.includes("booking") || lowerInput.includes("meeting")) {
    return chatbotManual.contact.booking;
  }
  if (lowerInput.includes("tech stack") || lowerInput.includes("technology")) {
    return chatbotManual.technical.stack;
  }
  if (
    lowerInput.includes("error") ||
    lowerInput.includes("issue") ||
    lowerInput.includes("help")
  ) {
    if (lowerInput.includes("mobile"))
      return chatbotManual.issues["mobile issue"];
    if (lowerInput.includes("team not loading"))
      return chatbotManual.issues["team not loading"];
    if (lowerInput.includes("build"))
      return chatbotManual.issues["build error"];
    if (lowerInput.includes("deployment"))
      return chatbotManual.issues["deployment error"];
    if (lowerInput.includes("dependency"))
      return chatbotManual.issues["dependency issue"];
    if (lowerInput.includes("backend") || lowerInput.includes("connection"))
      return chatbotManual.issues["backend connection"];
    if (
      lowerInput.includes("node") ||
      lowerInput.includes("npm") ||
      lowerInput.includes("pnpm")
    )
      return chatbotManual.issues["node npm pnpm"];
    return chatbotManual.issues.fallback;
  }

  return chatbotManual.fallback;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  // Debounced scroll to bottom
  const scrollToBottom = useCallback(
    debounce(() => {
      // Avoid forced reflow by deferring the geometry read until after paint.
      requestAnimationFrame(() => {
        const el = scrollViewportRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
      });
    }, 100),
    [],
  );

  // Load messages from localStorage
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem("usherChatMessages");
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages);
        if (Array.isArray(parsed)) {
          setMessages(parsed.slice(-50));
        }
      }
    } catch (err) {
      console.error("Failed to load chat history:", err);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("usherChatMessages", JSON.stringify(messages));
      } catch (err) {
        console.error("Failed to save chat history:", err);
      }
    }
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([
          {
            id: "welcome-1",
            role: "bot",
            content: chatbotManual.general.introduction,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInputValue = inputValue;
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(currentInputValue);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    try {
      localStorage.removeItem("usherChatMessages");
    } catch (err) {
      console.error("Failed to clear chat history:", err);
    }
    setTimeout(() => {
      setMessages([
        {
          id: "welcome-clear",
          role: "bot",
          content: chatbotManual.general.introduction,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 100);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 90 }}
        transition={{
          delay: 1,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="fixed bottom-5 right-5 z-[1000]"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-white flex items-center justify-center"
          size="icon"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="chat-modal"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-24 right-5 w-[calc(100vw-40px)] sm:w-80 max-w-md h-[60vh] max-h-[500px] bg-white dark:bg-gray-950 rounded-xl shadow-2xl flex flex-col z-[1000] border border-gray-200 dark:border-gray-800"
          role="dialog"
          aria-label="Chat dialog"
        >
          <header className="flex items-center justify-between p-3 border-b dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                aria-hidden="true"
              ></div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                USHER Assistant
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                aria-label="Clear chat history"
                className="hover:bg-muted"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <ScrollArea className="flex-1 p-4">
            <div
              className="space-y-4"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "bot" && (
                    <div
                      className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold shrink-0"
                      aria-hidden="true"
                    >
                      B
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                      message.role === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                    }`}
                  >
                    <p
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {message.content}
                    </p>
                    {message.timestamp && (
                      <p className="text-xs opacity-50 mt-1">
                        {message.timestamp}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold shrink-0"
                    aria-hidden="true"
                  >
                    B
                  </div>
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-bl-none">
                    <div
                      className="flex items-center gap-1.5"
                      aria-label="Bot is typing"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], y: [0, -3, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], y: [0, -3, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.15,
                        }}
                        className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], y: [0, -3, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3,
                        }}
                        className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t dark:border-gray-800 shrink-0"
          >
            <div className="relative flex items-end gap-2">
              <Input
                type="text"
                placeholder="Ask about our services..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-12 rounded-full h-10 text-sm"
                aria-label="Chat input"
                maxLength={500}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-1.5 bottom-1.5 h-7 w-7 hover:bg-muted"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
