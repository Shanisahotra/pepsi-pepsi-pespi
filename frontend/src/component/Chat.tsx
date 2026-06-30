import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey 👋 How are you?", sender: "other" },
    { id: 2, text: "I'm good! Working on dashboard UI 🚀", sender: "me" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "me",
    };

    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="h-screen flex bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-white border-r p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare /> Chats
        </h2>

        <div className="mt-4 space-y-3">
          {["Ali", "Zeeshan", "Ahmed"].map((user, i) => (
            <div
              key={i}
              className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {user}
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="p-4 border-b bg-white font-semibold">
          Chat Room
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow
                ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 bg-white border-t flex gap-2">
          <input
            className="flex-1 border rounded-xl px-3 py-2 focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Send size={18} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}