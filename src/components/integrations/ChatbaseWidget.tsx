import { useEffect, useState } from "react";

declare global {
  interface Window {
    chatbase?: ((...args: any[]) => void) & { q?: any[] };
  }
}

const CHATBASE_WIDGET_ID = "n-JyXMkVJxaWrUiDeq27g";

const ChatbaseWidget = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById(CHATBASE_WIDGET_ID);
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    const initChatbase = () => {
      const state =
        typeof window.chatbase === "function" ? (window.chatbase as any)("getState") : null;

      if (!window.chatbase || state !== "initialized") {
        const chatbaseProxy: any = (...args: any[]) => {
          if (!chatbaseProxy.q) chatbaseProxy.q = [];
          chatbaseProxy.q.push(args);
        };

        window.chatbase = new Proxy(chatbaseProxy, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args: any[]) => target(prop as any, ...args);
          },
        }) as any;
      }

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = CHATBASE_WIDGET_ID;
      (script as any).domain = "www.chatbase.co";
      script.async = true;
      script.onload = () => setIsLoaded(true);

      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      initChatbase();
    } else {
      window.addEventListener("load", initChatbase, { once: true });
    }

    return () => {
      window.removeEventListener("load", initChatbase);
    };
  }, []);

  useEffect(() => {
    const identityEndpoint = import.meta.env.VITE_CHATBASE_IDENTITY_URL;
    if (!identityEndpoint || !isLoaded) return;

    const sendIdentity = async () => {
      try {
        const response = await fetch(identityEndpoint, { credentials: "include" });
        if (!response.ok) return;

        const { token } = await response.json();
        if (token && typeof window.chatbase === "function") {
          window.chatbase("identify", { token });
        }
      } catch (error) {
        console.warn("Chatbase identity verification skipped", error);
      }
    };

    sendIdentity();
  }, [isLoaded]);

  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
      <p className="mb-1 font-semibold text-foreground">Chatbase Assistant</p>
      <p>
        Use the floating chat widget to request itinerary tweaks or ask questions. If identity
        verification is configured, you'll be signed in automatically.
      </p>
    </div>
  );
};

export default ChatbaseWidget;

