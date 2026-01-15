"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, BookOpen, ChefHat } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}


// Knowledge base for the chatbot
const knowledgeBase = {
    greetings: [
        "Hello! I'm your Salad Course Assistant. I can help you with questions about salad classification, components, dressing types, and preparation guidelines. What would you like to know?",
        "Hi there! 👋 I'm here to help you learn about salad preparation. Feel free to ask me anything about the course modules!"
    ],

    classification: {
        keywords: ["classification", "classify", "types of salad", "module 1", "appetizer", "main course", "side dish", "dessert salad"],
        responses: [
            "Great question about salad classification! Salads can be classified based on their role in a meal:\n\n🥗 **Appetizer Salads** - Light, served at the beginning to stimulate appetite\n🥗 **Side Salads** - Accompany the main dish\n🥗 **Main Course Salads** - Hearty enough to be the meal itself (like Caesar or Cobb)\n🥗 **Dessert Salads** - Sweet salads served at the end\n\nWhich type interests you most?",
            "Salads are classified by when and how they're served in a meal. Module 1 covers appetizer salads (to start meals), side salads (accompaniments), main course salads (the star of the meal), and dessert salads (sweet endings). Would you like details on any specific type?"
        ]
    },

    components: {
        keywords: ["component", "parts", "structure", "base", "body", "garnish", "dressing", "module 2", "ingredient"],
        responses: [
            "Every great salad has 4 essential components:\n\n🌿 **Base** - Usually lettuce or greens that form the foundation\n🥕 **Body** - The main ingredients (vegetables, proteins, grains)\n✨ **Garnish** - Decorative elements that add color and texture\n🧴 **Dressing** - The sauce that brings everything together\n\nThese four pillars work together to create a perfect salad!",
            "Module 2 teaches the anatomy of a salad! Think of it like building a house:\n- **Base** (foundation) = leafy greens\n- **Body** (structure) = main ingredients\n- **Garnish** (decoration) = finishing touches\n- **Dressing** (coating) = flavor that binds it all\n\nWhat component would you like to explore deeper?"
        ]
    },

    dressing: {
        keywords: ["dressing", "sauce", "vinaigrette", "emulsified", "cooked", "cream", "module 3", "oil", "vinegar"],
        responses: [
            "Module 3 covers the 4 main types of salad dressings:\n\n🥗 **Vinaigrette** - Simple oil and vinegar mixture (3:1 ratio)\n🥫 **Emulsified** - Thick, creamy like mayonnaise (oil + egg)\n🍳 **Cooked** - Thickened with flour/cornstarch, sweeter\n🥛 **Cream-based** - Made with sour cream, yogurt, or buttermilk\n\nEach dressing type has its perfect salad pairing!",
            "Great question about dressings! There are 4 classic types:\n\n1. **Vinaigrette** - The simplest! Oil + vinegar + seasonings\n2. **Emulsified** - Permanently mixed, thick (Caesar, Ranch)\n3. **Cooked Dressing** - Heated with starch for body\n4. **Cream Dressing** - Rich and tangy dairy-based\n\nWant to know which salads use which dressing?"
        ]
    },

    guidelines: {
        keywords: ["guideline", "prepare", "preparation", "safety", "hygiene", "module 4", "fresh", "clean", "how to"],
        responses: [
            "Module 4 covers essential preparation guidelines:\n\n✅ **Freshness First** - Use the freshest ingredients possible\n🧼 **Hygiene** - Wash hands and all produce thoroughly\n❄️ **Temperature** - Keep ingredients chilled until serving\n🔪 **Technique** - Use proper cutting methods\n⚖️ **Balance** - Create harmonious flavors and textures\n\nFollowing these ensures safe, delicious salads!",
            "Smart preparation makes all the difference! Key guidelines include:\n\n• Inspect and select fresh ingredients\n• Clean everything properly (triple-wash leafy greens!)\n• Cut vegetables uniformly for even texture\n• Keep salads cold until serving\n• Balance flavors: sweet, salty, sour, bitter\n\nWhich guideline would you like to know more about?"
        ]
    },

    examples: {
        keywords: ["example", "Caesar", "Greek", "Cobb", "Waldorf", "coleslaw", "potato salad", "fruit salad"],
        responses: [
            "Here are some classic salad examples by type:\n\n🥗 **Tossed** - Caesar, Greek, Garden\n🎨 **Composed** - Cobb, Nicoise (arranged, not mixed)\n🥄 **Bound** - Potato salad, Coleslaw, Macaroni salad\n🍇 **Fruit** - Waldorf, Ambrosia\n\nEach follows different preparation techniques!",
            "Popular salads you might know:\n- **Caesar** = Emulsified dressing, tossed style\n- **Greek** = Vinaigrette, composed style\n- **Coleslaw** = Bound with mayo\n- **Waldorf** = Fruit salad with cooked dressing\n\nWant to learn how to make any of these?"
        ]
    },

    tips: {
        keywords: ["tip", "advice", "help", "learn", "study", "how can"],
        responses: [
            "Here are my top study tips for this course:\n\n📚 Complete modules in order (1→2→3→4)\n✍️ Take notes on key techniques\n👨‍🍳 Practice making salads at home\n🎯 Focus on understanding WHY, not just WHAT\n✅ Try the quiz after each module\n\nWhat module are you currently on?",
            "To master salad preparation:\n\n1. Start with Module 1 to understand the foundation\n2. Learn the 4 components in Module 2\n3. Master dressing types in Module 3\n4. Apply safety guidelines from Module 4\n\nPractice makes perfect! Try making one salad from each category."
        ]
    }
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const openChat = () => setIsOpen(true);
        window.addEventListener("open-chat", openChat);
        return () => window.removeEventListener("open-chat", openChat);
    }, []);


    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! 👨‍🍳 I'm your Salad Course Assistant. I can help you with:\n\n📚 Module 1 - Classification of Salad\n🥗 Module 2 - Components of a Salad\n🧴 Module 3 - Types of Salad Dressing\n✅ Module 4 - Guidelines in Preparing Salad\n\nWhat would you like to learn about?",
            sender: "bot",
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        // Check for greetings
        if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
            return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
        }

        // Check each category
        for (const [category, data] of Object.entries(knowledgeBase)) {
            if (category === 'greetings') continue;

            const categoryData = data as { keywords: string[], responses: string[] };
            const matchedKeyword = categoryData.keywords.some(keyword =>
                lowerMessage.includes(keyword.toLowerCase())
            );

            if (matchedKeyword) {
                return categoryData.responses[Math.floor(Math.random() * categoryData.responses.length)];
            }
        }

        // If no match found, provide helpful response
        const defaultResponses = [
            "I can help you with:\n• Classification of salads (Module 1)\n• Components of a salad (Module 2)\n• Types of dressing (Module 3)\n• Preparation guidelines (Module 4)\n\nWhich topic interests you?",
            "I'm here to help with the salad preparation course! Try asking me about:\n- Salad classification\n- Salad components (base, body, garnish, dressing)\n- Different dressing types\n- Preparation and safety guidelines\n\nWhat would you like to know?",
            "That's an interesting question! I specialize in salad preparation. I can explain:\n✓ How salads are classified\n✓ The 4 main components of salads\n✓ Different types of dressings\n✓ Best practices for preparation\n\nAsk me anything about these topics!"
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === "") return;

        const newUserMessage: Message = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            timestamp: new Date()
        };

        setMessages([...messages, newUserMessage]);
        setInputMessage("");
        setIsTyping(true);

        setTimeout(() => {
            const botResponseText = getBotResponse(inputMessage);

            const botResponse: Message = {
                id: messages.length + 2,
                text: botResponseText,
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 800 + Math.random() * 800);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleQuickQuestion = (question: string) => {
        setInputMessage(question);
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-emerald-600 to-lime-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-50 group"
                    aria-label="Open chat"
                >
                    <ChefHat className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
                    <div className="bg-gradient-to-r from-emerald-600 to-lime-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold">Salad Course Bot</h3>
                                <p className="text-xs text-emerald-100">Your learning assistant</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${message.sender === "user"
                                            ? "bg-gradient-to-r from-emerald-600 to-lime-600 text-white rounded-br-sm"
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                                    <span
                                        className={`text-xs mt-1 block ${message.sender === "user" ? "text-emerald-100" : "text-gray-400"
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.length === 1 && !isTyping && (
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 text-center mb-2">Quick questions:</p>
                                {[
                                    "What are the types of salad?",
                                    "Explain salad components",
                                    "Types of salad dressing?",
                                    "Preparation guidelines?"
                                ].map((question, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="w-full text-left px-3 py-2 bg-white border border-emerald-200 rounded-lg text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about salad preparation..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={inputMessage.trim() === ""}
                                className="bg-gradient-to-r from-emerald-600 to-lime-600 text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Press Enter to send
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}