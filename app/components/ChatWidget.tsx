"use client";

import { useState, useRef, useEffect } from "react";
import { ChefHat, X, Send } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

// Comprehensive Knowledge Base from all 4 Modules
const knowledgeBase = {
    greetings: [
        "Hello! 👨‍🍳 I'm your Salad Course Assistant. I can help you with:\n\n📚 Module 1 - Classification of Salad\n🥗 Module 2 - Components of a Salad\n🧴 Module 3 - Types of Salad Dressing\n✅ Module 4 - Guidelines in Preparing Salad\n\nWhat would you like to learn about?",
        "Hi there! Ready to learn about salad preparation? Ask me anything from the 4 modules!"
    ],

    // MODULE 1: Classification of Salads
    saladDefinition: {
        keywords: ["what is a salad", "salad meaning", "definition of salad", "salad definition"],
        answer: "A salad is a combination of vegetables, fruits, and other ingredients served with a dressing."
    },

    misEnPlace: {
        keywords: ["mis en place", "setting everything", "organizing", "preparing materials"],
        answer: "Mis en place is a French term meaning 'setting everything in place.' It refers to the process of organizing and preparing all materials and ingredients before you actually start the food preparation."
    },

    classificationIngredients: {
        keywords: ["classification according to ingredients", "salads ingredients used", "types according to ingredients", "classify salad", "classification of salad", "how salads classified", "how are salads classified", "salad classification", "salad types"],
        answer: "**Classification of Salads According to Ingredients Used:**\n\n🥬 Green Salads\n🥕 Vegetables, Grain Legumes and Pasta Salads\n🥄 Bound Salads\n🍎 Fruit Salads\n🎨 Composed Salads\n🍮 Gelatin Salads"
    },

    classificationFunction: {
        keywords: ["classification according to function", "salads functions", "function in the meal", "when served", "classification meal"],
        answer: "**Classification of Salads According to their Functions in the Meal:**\n\n🥗 Appetizer Salads\n🍽️ Accompaniment Salad / Side Dish Salad\n🥩 Main Course Salads\n🍋 Separate Course Salads\n🍰 Dessert Salads"
    },

    greenSalad: {
        keywords: ["green salad", "leafy vegetables", "lettuce salad", "spinach salad"],
        answer: "**Green Salad:** A salad made primarily of leafy vegetables like lettuce, spinach, or cabbage. They must be fresh, crisp, and well-drained.\n\n**Primary ingredients:** Fresh leafy greens like Romaine lettuce, iceberg lettuce, spinach, cabbage, or arugula."
    },

    vegetableSalad: {
        keywords: ["vegetable salad", "grain salad", "legume salad", "pasta salad", "macaroni", "rice salad"],
        answer: "**Vegetables, Grain Legumes, and Pasta Salads:** These are salads where the main ingredients are vegetables (other than leafy greens) or starchy items like macaroni, rice, or beans.\n\n**Ingredients:** Starchy items like pasta (rotini, macaroni), grains (rice, quinoa), or legumes (beans, peas). Examples include broccoli, cauliflower, or carrots."
    },

    boundSalad: {
        keywords: ["bound salad", "mayonnaise salad", "thick dressing", "potato salad", "tuna salad"],
        answer: "**Bound Salad:** A mixture of ingredients (like tuna, chicken, or potato) held together or 'bound' by a thick dressing, usually mayonnaise.\n\n**Binding ingredients:** A heavy or thick dressing, most commonly mayonnaise, yogurt, or a boiled dressing."
    },

    fruitSalad: {
        keywords: ["fruit salad", "fresh fruit", "fruit ingredients", "pineapple salad"],
        answer: "**Fruit Salad:** A salad that uses various fruits as the main ingredients. These can be served as appetizers, side dishes, or desserts.\n\n**Ingredients:** Various fruits like pineapples, apples, grapes, and bananas."
    },

    composedSalad: {
        keywords: ["composed salad", "arranged salad", "cobb salad", "plated salad", "artfully arranged"],
        answer: "**Composed Salad:** A salad where the ingredients are arranged attractively on a plate rather than being tossed or mixed together.\n\n**Example:** A Cobb Salad is a famous composed salad with sliced grilled chicken, avocado, hard-boiled egg wedges, and bacon bits arranged in rows.\n\n**Uniqueness:** The ingredients are layered or arranged artfully on a plate rather than being mixed."
    },

    gelatinSalad: {
        keywords: ["gelatin salad", "jello salad", "jell-o", "flavored gelatin"],
        answer: "**Gelatin Salad:** A salad made using flavored or unflavored gelatin, often mixed with fruits or vegetables. It is also commonly known as a 'Jello salad.'\n\n**Key ingredients:** Sweetened gelatin mix (like Jell-O), fruit juices, and suspended items like canned fruits or nuts."
    },

    appetizerSalad: {
        keywords: ["appetizer salad", "appetizer", "stimulate appetite", "cheese salad", "shrimp salad"],
        answer: "**Appetizer Salad:** Stimulates appetite with fresh, crisp ingredients, tangy flavorful dressing, and attractive appearance.\n\n**Examples:** Cheese, ham, salami, shrimp, crabmeat.\n\n**Note:** Crisp raw or lightly cooked vegetables may be added."
    },

    accompanimentSalad: {
        keywords: ["accompaniment salad", "side dish salad", "balance meal", "harmonize"],
        answer: "**Accompaniment Salad / Side Dish Salad:** Must balance and harmonize with the meal, like a side dish.\n\n**Guidelines:**\n• Should be light and flavorful\n• Vegetable salads are ideal\n• Avoid serving potato salad with French fries or another starch\n• Sweet fruit salads are rarely suitable except with ham or pork\n• Macaroni or protein-rich salads (seafood, cheese) are less appropriate unless the main course is light"
    },

    mainCourseSalad: {
        keywords: ["main course salad", "protein salad", "full meal", "substantial salad"],
        answer: "**Main Course Salad:** Large enough to serve as a full meal with a substantial portion of protein.\n\n**Ingredients:** Meat, poultry, seafood, egg, and cheese.\n\n**Characteristics:**\n• Contains protein\n• Includes variety of flavors and textures\n• Can be eaten as a complete meal"
    },

    separateCourseSalad: {
        keywords: ["separate course", "cleanse palate", "after main course", "light salad"],
        answer: "**Separate Course Salad:** Very light and not filling, served after the main course to cleanse the plate and refresh the appetite.\n\n**Characteristics:**\n• Served before dessert\n• Avoid heavy dressing like sour cream or mayonnaise\n• Very light composition"
    },

    dessertSalad: {
        keywords: ["dessert salad", "sweet salad", "fruits dessert", "sweetened gelatin"],
        answer: "**Dessert Salad:** Usually sweeter and may contain items such as fruits, sweetened gelatin, nuts and cream.\n\nServed at the end of the meal."
    },

    // MODULE 2: Components of a Salad
    saladBase: {
        keywords: ["base of salad", "salad base", "foundation", "leafy greens base", "lettuce base"],
        answer: "**The Base:** The foundation of the salad and is usually made of leafy greens like lettuce.\n\n**Main role:**\n• Gives structure, volume, and support to the other salad ingredients\n• Holds the body ingredients\n• Affects the salad's shape and portion size"
    },

    saladBody: {
        keywords: ["body of salad", "salad body", "main part", "main ingredients"],
        answer: "**The Body:** The main part of the salad and includes vegetables, fruits, meat, or seafood.\n\n**Importance:**\n• Adds flavor, texture, and nutritional value\n• Main source of nutrients\n• Placed on top of the base\n• Can be cooked or raw"
    },

    saladDressing: {
        keywords: ["salad dressing", "dressing liquid", "flavor moisture", "when add dressing", "what is dressing"],
        answer: "**The Dressing:** A liquid or semi-liquid mixture that adds flavor and moisture to the salad.\n\n**Common ingredients:** Oil, vinegar, mayonnaise, or cream\n\n**When to add:** Before or during service (can be served on the side)\n\n**Note:** Timing affects salad quality - add too early and greens may wilt"
    },

    dressingTypes: {
        keywords: ["types of dressing", "dressing types", "kinds of dressing", "different dressings", "types of salad dressing"],
        answer: "**Types of Salad Dressing:**\n\n🫒 **Oil & Vinegar** - Simple combination (3:1 ratio)\n🥫 **Emulsified** - Thick and creamy with mayonnaise base\n🥗 **Vinaigrette** - Temporary emulsion (separates over time)\n🧈 **Permanent Emulsion** - Stays mixed (mayonnaise, ranch)\n🍳 **Cooked Dressing** - Thickened with heat\n\nWould you like details on any specific type?"
    },

    saladGarnish: {
        keywords: ["garnish", "decoration", "edible decoration", "visual appeal", "appearance"],
        answer: "**The Garnish:** An edible decoration that improves the appearance of the salad.\n\n**Purpose:**\n• Adds visual appeal\n• Should complement the other salad ingredients\n• Must be edible\n• Should not overpower the salad\n• Can be simple\n• Optional but recommended"
    },

    // MODULE 3: Types of Salad Dressing
    oilVinegarDressing: {
        keywords: ["oil and vinegar", "less oil", "tarter", "milder", "oil balance"],
        answer: "**Oil and Vinegar Dressing:**\n\nUsing **less oil** makes the dressing tarter and helps avoid the salad dressing tasting milder and oilier.\n\nThis is important for balancing high acidity in creating oil and vinegar dressing."
    },

    emulsifiedDressing: {
        keywords: ["emulsified dressing", "mayonnaise base", "thick creamy", "emulsion"],
        answer: "**Emulsified Dressings:**\n\nUse mayonnaise as a base and are usually thick and creamy.\n\n• Mayonnaise IS an emulsified dressing\n• They are thick and stable\n• Mayonnaise is used as a base for many variations"
    },

    vinaigretteRatio: {
        keywords: ["vinaigrette ratio", "oil to vinegar", "3 to 1", "how much oil", "ratio"],
        answer: "**Vinaigrette Oil-to-Vinegar Ratio:**\n\nThe standard ratio is **3 parts oil to 1 part vinegar**, but it can be adjusted to taste.\n\n• More oil = milder, smoother\n• Less oil = tarter, more acidic\n• Adjustable based on preference"
    },

    vinaigretteType: {
        keywords: ["vinaigrette type", "temporary emulsion", "vinaigrette emulsion", "oil vinegar seasonings"],
        answer: "**Vinaigrette:**\n\nA **temporary emulsion** made from oil, vinegar, and seasonings.\n\n• Not permanent - will separate over time\n• Contains oil and vinegar\n• Needs to be shaken or whisked before use\n• Is an emulsion but temporary"
    },

    // MODULE 4: Guidelines in Preparing Salad and Dressing
    vegetablePastaGuidelines: {
        keywords: ["vegetable preparation", "cutting vegetables", "cook vegetables", "pasta grain", "accurate cutting"],
        answer: "**Guidelines for Vegetables, Legumes, Grains and Pasta Salads:**\n\n✓ Neat and accurate cutting is important for appearance\n✓ Cut vegetables close to serving time to maintain freshness\n✓ Cook vegetables properly - not overcooked\n✓ Cooked vegetables must be drained and chilled\n✓ Pasta and grains should not be overcooked\n✓ Prepare close to serving time"
    },

    boundSaladGuidelines: {
        keywords: ["bound salad preparation", "mayonnaise cooling", "potato cooking", "crisp vegetables bound"],
        answer: "**Guidelines for Bound Salads:**\n\n✓ Ingredients must be cooled before adding mayonnaise\n✓ Keep bound salads chilled at all times\n✓ Potatoes should be cooked whole before peeling\n✓ Add crisp vegetables for texture\n✓ Fold dressings in gently to avoid breaking ingredients\n✓ Mix gently and portion properly"
    },

    fruitSaladGuidelines: {
        keywords: ["fruit salad preparation", "handle fruit", "acidic liquid", "drain fruit", "discoloration"],
        answer: "**Guidelines for Fruit Salads:**\n\n✓ Handle fruit salads carefully to avoid bruising\n✓ Dip some fruits in acidic liquid to prevent discoloration\n✓ Prepare vegetables before fruit salads\n✓ Canned fruits must be well drained\n✓ Place attractive fruit pieces on top\n✓ Arrange attractively"
    },

    composedSaladGuidelines: {
        keywords: ["composed salad preparation", "separate preparation", "season individually", "contrast", "plating"],
        answer: "**Guidelines for Composed Salads:**\n\n✓ Prepare ingredients separately\n✓ Season each ingredient individually\n✓ Add delicate ingredients just before serving\n✓ Create contrast in colors and textures\n✓ Proper plating is important\n✓ Careful arrangement required"
    },

    gelatinSaladGuidelines: {
        keywords: ["gelatin salad preparation", "gelatin ratio", "dissolve gelatin", "pineapple papaya", "gelatin liquid"],
        answer: "**Guidelines for Gelatin Salads:**\n\n✓ Correct gelatin-to-liquid ratio is important\n✓ Unflavored gelatin must be properly dissolved in cold water first, then hot\n✓ Flavored gelatin is dissolved in hot water\n✓ Raw pineapple and papaya are NOT allowed (enzymes prevent setting)\n✓ Fruits must be drained before adding to gelatin\n✓ Must be refrigerated to set properly"
    },

    balance: {
        keywords: ["balance in salad", "color balance", "texture balance", "shape size", "flavor balance"],
        answer: "**Balance in Salad Preparation:**\n\nBalance ensures salad ingredients are arranged by color, shape, texture, and flavor to enhance appearance.\n\n• Balance color for visual appeal\n• Balance texture for eating experience\n• Arrange by shape and size\n• Balance flavors for overall taste"
    },

    harmony: {
        keywords: ["harmony in salad", "ingredients harmonize", "unity dressing", "complement"],
        answer: "**Harmony in Salad Preparation:**\n\nHarmony means choosing ingredients that complement each other and the dressing for a unified taste and presentation.\n\n• Ingredients should harmonize with each other\n• Herbs, spices, or sauces add harmony\n• Unity between dressing and ingredients is important\n• Improves overall appeal"
    },

    color: {
        keywords: ["color in salad", "colored vegetables", "eye appeal", "visual", "shredded carrots beets"],
        answer: "**Color in Salad Presentation:**\n\nColor adds eye appeal; combining different colored ingredients makes the salad visually attractive.\n\n• Different colored vegetables improve appearance\n• Add shredded carrots, beets, or red cabbage\n• Color affects appetite\n• Using only one color makes salad less appealing"
    },

    texture: {
        keywords: ["texture in salad", "contrast texture", "crisp vegetables", "tender meat"],
        answer: "**Texture in Salad:**\n\nTexture creates contrast between ingredients, such as crisp vegetables and tender meat or fish, making the salad more appealing.\n\n• Important for eating experience\n• Contrast improves the salad\n• Pair crisp vegetables with meat or fish\n• Makes salad more visually appealing"
    },

    safetyStorage: {
        keywords: ["storage", "cold plate", "refrigerate", "1-2 hours", "holding time", "temperature control"],
        answer: "**Safety and Hygienic Practices in Storing Salad:**\n\n✓ Plate green salads on a cold plate\n✓ Do not plate more than 1–2 hours before serving\n✓ Add dressing to green salads just before serving\n✓ Refrigerate salads until serving\n✓ Salads held too long will wilt and spoil\n✓ Holding boxes should have high humidity\n✓ Proper temperature control prevents spoilage"
    },

    hygienePreparation: {
        keywords: ["hygiene", "washing vegetables", "clean hands", "clean utensils", "personal hygiene", "damaged parts", "why wash vegetables", "importance of washing", "why clean utensils", "why use clean equipment"],
        answer: "**Principles and Practices of Hygiene in Preparing Salads:**\n\n✓ Wash salad vegetables thoroughly before preparation\n✓ Wash hands before and after handling food\n✓ Use clean utensils and equipment\n✓ Remove damaged or bruised parts\n✓ Food handlers must observe proper personal hygiene\n\nThis helps prevent contamination and ensures safe and healthy salads."
    },

    washingProduce: {
        keywords: ["wash fruits", "wash vegetables", "running water", "scrub", "dry produce", "why running water", "how to wash", "washing produce", "clean produce"],
        answer: "**How to Wash Fruits and Vegetables:**\n\n✓ Wash fruits and vegetables before use\n✓ Use clean running water when washing produce\n✓ Remove bruised or damaged areas\n✓ Scrub firm produce properly\n✓ Dry washed produce before use\n\nThis helps remove dirt, bacteria, and contaminants, ensuring food safety and cleanliness."
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
        if (lowerMessage.match(/\b(hi|hello|hey|greetings|good morning|good afternoon)\b/)) {
            return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
        }

        // Special handling for general classification questions
        if (lowerMessage.match(/\b(classification|classify|how.*classified)\b/) && 
            lowerMessage.match(/\b(salad|salads)\b/) &&
            !lowerMessage.includes("ingredient") &&
            !lowerMessage.includes("function")) {
            return "Salads can be classified in **two ways**:\n\n**1. According to Ingredients Used:**\n🥬 Green Salads\n🥕 Vegetables, Grain Legumes & Pasta Salads\n🥄 Bound Salads\n🍎 Fruit Salads\n🎨 Composed Salads\n🍮 Gelatin Salads\n\n**2. According to Function in the Meal:**\n🥗 Appetizer Salads\n🍽️ Accompaniment/Side Dish Salads\n🥩 Main Course Salads\n🍋 Separate Course Salads\n🍰 Dessert Salads\n\nWhich classification would you like to learn more about?";
        }

        // Search through all knowledge base entries
        for (const [key, data] of Object.entries(knowledgeBase)) {
            if (key === 'greetings') continue;

            const entry = data as { keywords: string[], answer: string };
            
            // Check if any keyword matches the user message
            const matchedKeyword = entry.keywords.some(keyword =>
                lowerMessage.includes(keyword.toLowerCase())
            );

            if (matchedKeyword) {
                return entry.answer;
            }
        }

        // If no match found, provide helpful response
        const defaultResponses = [
            "I can help you with:\n\n📚 Module 1 - Classification of salads\n🥗 Module 2 - Components (base, body, garnish, dressing)\n🧴 Module 3 - Types of dressing\n✅ Module 4 - Preparation guidelines\n\nWhich topic interests you?",
            "I'm here to help with the salad preparation course! Try asking me about:\n\n• Salad classification and types\n• Salad components and structure\n• Different dressing types and ratios\n• Preparation and safety guidelines\n\nWhat would you like to know?",
            "That's an interesting question! I specialize in salad preparation. I can explain:\n\n✓ How salads are classified\n✓ The 4 main components of salads\n✓ Different types of dressings\n✓ Best practices for preparation\n✓ Safety and hygiene practices\n\nAsk me anything about these topics!"
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
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-50 group"
                    aria-label="Open chat"
                >
                    <ChefHat className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-green-200">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold">Salad Course Bot</h3>
                                <p className="text-xs text-green-100">Your learning assistant</p>
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
                                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-sm"
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                                    <span
                                        className={`text-xs mt-1 block ${message.sender === "user" ? "text-green-100" : "text-gray-400"
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
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.length === 1 && !isTyping && (
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 text-center mb-2">Quick questions:</p>
                                {[
                                    "How are salads classified?",
                                    "What are the 4 components?",
                                    "What is vinaigrette?",
                                    "How to wash vegetables?"
                                ].map((question, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="w-full text-left px-3 py-2 bg-white border border-green-200 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:border-green-300 transition-colors"
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
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={inputMessage.trim() === ""}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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