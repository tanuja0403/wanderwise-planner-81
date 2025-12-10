import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface PlannerActivity {
  time: string;
  type: string;
  title: string;
  description?: string;
  duration?: string;
  tip?: string;
  period?: "morning" | "afternoon" | "evening";
}

export interface PlannerDay {
  day: number;
  activities: PlannerActivity[];
}

interface ChatbotProps {
  itinerary: PlannerDay[];
  onUpdate: (next: PlannerDay[]) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const ItineraryPlannerChatbot = ({ itinerary, onUpdate }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Tell me what to change: “remove breakfast on Day 1” or “add night market on Day 2 at 7:30 PM”.",
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
    const match = text.match(/day\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const handleRemove = (text: string) => {
    const dayNumber = parseDay(text);
    const titleMatch = text.match(/remove\s+(.*?)(?:\s+on\s+day\s+\d+)?$/i);
    const title = titleMatch?.[1]?.trim().toLowerCase();

    if (!title) return "I couldn't tell what to remove. Try “remove museum on Day 1”.";

    let updated = false;
    const next = itinerary.map((day) => {
      if (dayNumber && day.day !== dayNumber) return day;
      const filtered = day.activities.filter((a) => !a.title.toLowerCase().includes(title));
      if (filtered.length !== day.activities.length) updated = true;
      return { ...day, activities: filtered };
    });

    if (!updated) return "Didn't find that item. Mention the title and day if possible.";

    onUpdate(next);
    return "Done. I removed that activity.";
  };

  const handleAdd = (text: string) => {
    const dayNumber = parseDay(text) ?? itinerary.at(-1)?.day ?? 1;
    const timeMatch = text.match(/at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
    const afterAdd = text.replace(/add\s+/i, "");
    const title = afterAdd
      .replace(/on\s+day\s+\d+/i, "")
      .replace(/at\s+\d{1,2}(?::\d{2})?\s*(am|pm)?/i, "")
      .trim();

    if (!title) return "What should I add? Try “add walking tour on Day 2 at 2 PM”.";

    const newActivity: PlannerActivity = {
      time: timeMatch ? timeMatch[1] : "12:00 PM",
      type: "custom",
      title: title.replace(/^\bthe\b\s+/i, ""),
      description: "Custom activity",
      duration: "1 hour",
      period: "afternoon",
    };

    let inserted = false;
    const next = itinerary.map((day) => {
      if (day.day !== dayNumber) return day;
      inserted = true;
      return { ...day, activities: [...day.activities, newActivity] };
    });

    if (!inserted) return "I couldn't find that day. Try “add <item> on Day 1”.";

    onUpdate(next);
    return `Added “${newActivity.title}” to Day ${dayNumber}.`;
  };

  const handleCommand = (text: string) => {
    if (/remove\s+/i.test(text)) return handleRemove(text);
    if (/add\s+/i.test(text)) return handleAdd(text);
    return "I can add or remove items. Try “remove lunch on Day 2” or “add boat tour on Day 3 at 5 PM”.";
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
          <p className="text-sm font-semibold text-foreground">Trip Planner Assistant</p>
        </div>
        <span className="text-xs text-muted-foreground">Adjust itinerary via chat</span>
      </div>

      <div className="max-h-72 overflow-y-auto space-y-3 pb-2">
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
          placeholder='e.g. "remove dinner on Day 1" or "add museum tour on Day 2 at 10:00 AM"'
        />
        <Button variant="teal" onClick={handleSend} disabled={!input.trim() || isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ItineraryPlannerChatbot;

