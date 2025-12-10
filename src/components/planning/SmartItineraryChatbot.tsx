import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface SmartActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  notes?: string;
}

export interface SmartDay {
  id: string;
  day: number;
  date: string;
  activities: SmartActivity[];
}

interface ChatbotProps {
  itinerary: SmartDay[];
  onUpdate: (next: SmartDay[]) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SmartItineraryChatbot = ({ itinerary, onUpdate }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Tell me what to change. Example: “remove lunch on Day 2” or “add sunset cruise on Day 3 at 6:00 PM in Marina”.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${role}`, role, content }]);
  };

  const parseDay = (text: string) => {
    const dayMatch = text.match(/day\s+(\d+)/i);
    return dayMatch ? parseInt(dayMatch[1], 10) : null;
  };

  const handleRemove = (text: string) => {
    const dayNumber = parseDay(text);
    const titleMatch = text.match(/remove\s+(.*?)(?:\s+on\s+day\s+\d+)?$/i);
    const title = titleMatch?.[1]?.trim().toLowerCase();

    if (!title) {
      return "I couldn't find which activity to remove. Try “remove museum visit on Day 1”.";
    }

    let updated = false;
    const next = itinerary.map((day) => {
      if (dayNumber && day.day !== dayNumber) return day;
      const filtered = day.activities.filter((a) => !a.title.toLowerCase().includes(title));
      if (filtered.length !== day.activities.length) updated = true;
      return { ...day, activities: filtered };
    });

    if (!updated) {
      return "I couldn't find that activity. Try mentioning the exact title and day.";
    }

    onUpdate(next);
    return "Done. I removed that activity.";
  };

  const handleAdd = (text: string) => {
    const dayNumber = parseDay(text) ?? itinerary.at(-1)?.day ?? 1;
    const timeMatch = text.match(/at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
    const locationMatch = text.match(/\b(in|at)\s+([A-Za-z0-9 ,'-]+)$/i);
    const afterAdd = text.replace(/add\s+/i, "");
    const title = afterAdd
      .replace(/on\s+day\s+\d+/i, "")
      .replace(/at\s+\d{1,2}(?::\d{2})?\s*(am|pm)?/i, "")
      .replace(/\b(in|at)\s+[A-Za-z0-9 ,'-]+$/i, "")
      .trim();

    if (!title) {
      return "What should I add? Try “add museum tour on Day 2 at 10:00 AM in Downtown”.";
    }

    const newActivity: SmartActivity = {
      id: `${Date.now()}`,
      time: timeMatch ? timeMatch[1] : "12:00",
      title: title.replace(/^\bthe\b\s+/i, ""),
      location: locationMatch ? locationMatch[2] : "TBD",
      notes: "",
    };

    let inserted = false;
    const next = itinerary.map((day) => {
      if (day.day !== dayNumber) return day;
      inserted = true;
      return { ...day, activities: [...day.activities, newActivity] };
    });

    if (!inserted) {
      return "I couldn't find that day. Try “add <item> on Day 1”.";
    }

    onUpdate(next);
    return `Added “${newActivity.title}” to Day ${dayNumber}.`;
  };

  const handleCommand = (text: string) => {
    if (/remove\s+/i.test(text)) return handleRemove(text);
    if (/add\s+/i.test(text)) return handleAdd(text);
    return "I can add or remove items. Try “remove lunch on Day 2” or “add boat tour on Day 3 at 5 PM in Harbor”.";
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput("");
    addMessage("user", userText);
    setIsLoading(true);

    setTimeout(() => {
      const reply = handleCommand(userText);
      addMessage("assistant", reply);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-teal" />
          <p className="text-sm font-semibold text-foreground">Smart Itinerary Assistant</p>
        </div>
        <span className="text-xs text-muted-foreground">Add/remove activities via chat</span>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-3 pb-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                m.role === "user" ? "bg-coral text-primary-foreground" : "bg-teal text-primary-foreground"
              }`}
            >
              {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.role === "user" ? "bg-coral text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-muted rounded-2xl px-3 py-2">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "120ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "240ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder='e.g. "remove dinner on Day 1" or "add museum tour on Day 2 at 10:00 AM in Downtown"'
        />
        <Button variant="teal" onClick={handleSend} disabled={!input.trim() || isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SmartItineraryChatbot;

