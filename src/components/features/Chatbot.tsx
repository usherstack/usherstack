import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotManual } from "@/data/chatbotManual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, MessageSquare, Send, Trash2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp?: string;
};

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
    if (lowerInput.includes("error") || lowerInput.includes("issue") || lowerInput.includes("help")) {
        if (lowerInput.includes("mobile")) return chatbotManual.issues["mobile issue"];
        if (lowerInput.includes("team not loading")) return chatbotManual.issues["team not loading"];
        if (lowerInput.includes("build")) return chatbotManual.issues["build error"];
        if (lowerInput.includes("deployment")) return chatbotManual.issues["deployment error"];
        if (lowerInput.includes("dependency")) return chatbotManual.issues["dependency issue"];
        if (lowerInput.includes("backend") || lowerInput.includes("connection")) return chatbotManual.issues["backend connection"];
        if (lowerInput.includes("node") || lowerInput.includes("npm") || lowerInput.includes("pnpm")) return chatbotManual.issues["node npm pnpm"];
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

  useEffect(() => {
    const storedMessages = localStorage.getItem("usherChatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("usherChatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([
          {
            id: "welcome-1",
            role: "bot",
            content: chatbotManual.general.introduction,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
     if (scrollViewportRef.current) {
      setTimeout(() => {
        scrollViewportRef.current!.scrollTop = scrollViewportRef.current!.scrollHeight;
      }, 100);
    }
  };
  
  const handleSendMessage = (e?: FormEvent) => {
    if(e) e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("usherChatMessages");
    setTimeout(() => {
        setMessages([
          {
            id: "welcome-clear",
            role: "bot",
            content: chatbotManual.general.introduction,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 200);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-5 w-[calc(100vw-40px)] sm:w-96 h-[70vh] max-h-[600px] bg-white dark:bg-gray-950 rounded-lg shadow-2xl flex flex-col z-[1000] border border-gray-200 dark:border-gray-800"
          >
            <header className="flex items-center justify-between p-3 border-b dark:border-gray-800 shrink-0">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white pl-2">USHER Assistant</h3>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={clearChat} aria-label="Clear chat">
                    <Trash2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Button>
              </div>
            </header>

            <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
              <div className="p-4 space-y-5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2.5 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-bold shrink-0">B</div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-lg px-3.5 py-2.5 shadow-sm ${
                        message.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm" style={{whiteSpace: "pre-wrap"}}>{message.content}</p>
                      {message.timestamp && <p className="text-xs text-right mt-1.5 opacity-60">{message.timestamp}</p>}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-end gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-bold shrink-0">B</div>
                    <div className="max-w-[85%] rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-bl-none shadow-sm">
                        <div className="flex items-center justify-center space-x-1.5 h-8">
                            <motion.div animate={{ scale: [1, 1.25, 1], y:[0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-gray-500 rounded-full" />
                            <motion.div animate={{ scale: [1, 1.25, 1], y:[0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-2 h-2 bg-gray-500 rounded-full" />
                            <motion.div animate={{ scale: [1, 1.25, 1], y:[0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="w-2 h-2 bg-gray-500 rounded-full" />
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="p-3 border-t dark:border-gray-800 shrink-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Ask something..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="pr-12 rounded-full h-11"
                  aria-label="Chat input"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-1.5 -translate-y-1/2"
                  disabled={inputValue.trim() === "" || isTyping}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-5 right-5 z-[1000]"
       >
        <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
            size="icon"
            aria-label={isOpen ? "Close chat" : "Open chat"}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isOpen ? "x" : "message"}
                    initial={{ rotate: 45, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -45, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                </motion.div>
            </AnimatePresence>
        </Button>
      </motion.div>
    </>
  );
}
