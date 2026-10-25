"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  Check,
  Circle,
  MessageCircle,
  Plus,
  Search,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const STORAGE_KEY = "mindmesh-chat-v1";

const contacts = [
  {
    id: "lakshmi",
    name: "Lakshmi",
    craft: "Kasuti embroidery artisan",
    location: "Dharwad, Karnataka",
    avatar: "L",
    color: "violet",
    online: true,
    initialMessage:
      "Namaskara! Thanks for your interest in our Kasuti embroidery. How can I help you?",
  },
  {
    id: "meera",
    name: "Meera",
    craft: "Coastal craft artisan",
    location: "Udupi, Karnataka",
    avatar: "M",
    color: "orange",
    online: true,
    initialMessage:
      "Hello! I make palm-leaf baskets and home decor. Feel free to ask about custom orders.",
  },
  {
    id: "ramesh",
    name: "Ramesh",
    craft: "Woodcraft artisan",
    location: "Channapatna, Karnataka",
    avatar: "R",
    color: "lime",
    online: false,
    initialMessage:
      "Welcome! I create handcrafted wooden products. What are you looking for?",
  },
  {
    id: "savitha",
    name: "Savitha",
    craft: "Embroidery artisan",
    location: "Ilkal, Karnataka",
    avatar: "S",
    color: "pink",
    online: false,
    initialMessage:
      "Hi there! I would be happy to discuss embroidery designs and bulk orders.",
  },
];

function timeLabel(date) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("people");
  const [activeContact, setActiveContact] = useState("lakshmi");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [aiDraft, setAiDraft] = useState("");
  const [messages, setMessages] = useState({});
  const [aiMessages, setAiMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );

      setMessages(saved.people || {});
      setAiMessages(saved.ai || []);
    } catch {
      setMessages({});
      setAiMessages([]);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          people: messages,
          ai: aiMessages,
        })
      );
    } catch {
      console.warn("Chat messages could not be saved.");
    }
  }, [messages, aiMessages, loaded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiMessages, activeTab, activeContact]);

  const currentContact =
    contacts.find((contact) => contact.id === activeContact) ||
    contacts[0];

  const currentMessages = messages[activeContact] || [];

  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.craft} ${contact.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function sendPeopleMessage(event) {
    event.preventDefault();

    const text = draft.trim();
    if (!text || !loaded) return;

    const message = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      sender: "you",
      createdAt: new Date().toISOString(),
    };

    setMessages((previous) => ({
      ...previous,
      [activeContact]: [
        ...(previous[activeContact] || []),
        message,
      ],
    }));

    setDraft("");
  }

  function sendAiMessage(event) {
    event.preventDefault();

    const text = aiDraft.trim();
    if (!text) return;

    setAiMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${Math.random()}`,
        text,
        sender: "you",
        createdAt: new Date().toISOString(),
      },
    ]);

    setAiDraft("");
  }

  function clearCurrentChat() {
    if (activeTab === "ai") {
      setAiMessages([]);
    } else {
      setMessages((previous) => ({
        ...previous,
        [activeContact]: [],
      }));
    }
  }

  const suggestions = [
    "Help me price my craft",
    "Write a product story",
    "Plan a bulk order",
  ];

  return (
    <main className="chat-page min-h-screen bg-[#100F19] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="chat-orb absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#9B5CFF]/10 blur-[120px]" />
        <div className="chat-orb chat-orb-orange absolute -right-40 top-96 h-96 w-96 rounded-full bg-[#FF7A45]/10 blur-[120px]" />
        <div className="chat-orb chat-orb-lime absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#D8FF70]/5 blur-[110px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-[1500px] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Page heading */}
        <div className="chat-enter mb-6 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-xs text-white/45 transition hover:-translate-x-1 hover:text-[#D8FF70]"
            >
              <ArrowLeft size={14} />
              Back home
            </Link>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              The <span className="text-[#9B5CFF]">Mesh.</span>
            </h1>

            <p className="mt-2 text-sm text-white/45">
              Conversations connect the people behind every craft.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/50 md:flex">
            <Sparkles size={16} className="text-[#D8FF70]" />
            AI integration coming next
          </div>
        </div>

        {/* Chat application */}
        <div className="chat-window grid min-h-[650px] overflow-hidden rounded-3xl border border-white/[0.09] bg-[#15131F] shadow-2xl lg:h-[min(760px,calc(100vh-190px))] lg:grid-cols-[310px_1fr]">
          {/* Sidebar */}
          <aside className="flex min-h-0 flex-col border-b border-white/[0.08] lg:border-b-0 lg:border-r">
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/[0.06] bg-black/20 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("people")}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    activeTab === "people"
                      ? "bg-[#9B5CFF] text-white shadow-lg"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Users size={16} />
                  People
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    activeTab === "ai"
                      ? "bg-[#9B5CFF] text-white shadow-lg"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Sparkles size={16} />
                  AI Chat
                </button>
              </div>

              <div className="relative mt-5">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Find a conversation..."
                  aria-label="Find a conversation"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-white/30 focus:border-[#9B5CFF]/60"
                />
              </div>
            </div>

            {activeTab === "people" ? (
              <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
                <p className="px-3 pb-3 pt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
                  Artisan conversations
                </p>

                {filteredContacts.map((contact, index) => {
                  const lastMessage =
                    messages[contact.id]?.slice(-1)[0]?.text ||
                    contact.initialMessage;

                  const lastSent =
                    messages[contact.id]?.slice(-1)[0];

                  return (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => setActiveContact(contact.id)}
                      style={{ animationDelay: `${index * 70}ms` }}
                      className={`chat-contact mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                        activeContact === contact.id
                          ? "border border-[#9B5CFF]/25 bg-[#9B5CFF]/10"
                          : "border border-transparent hover:bg-white/[0.035]"
                      }`}
                    >
                      <span
                        className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-black ${
                          contact.color === "violet"
                            ? "bg-[#9B5CFF]/20 text-[#C6A4FF]"
                            : contact.color === "orange"
                              ? "bg-[#FF7A45]/15 text-[#FFAD8C]"
                              : contact.color === "lime"
                                ? "bg-[#D8FF70]/10 text-[#D8FF70]"
                                : "bg-pink-400/10 text-pink-300"
                        }`}
                      >
                        {contact.avatar}

                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#15131F] ${
                            contact.online
                              ? "bg-[#D8FF70]"
                              : "bg-white/25"
                          }`}
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-bold">
                            {contact.name}
                          </span>

                          <span className="text-[10px] text-white/25">
                            {lastSent
                              ? timeLabel(lastSent.createdAt)
                              : ""}
                          </span>
                        </span>

                        <span className="mt-1 block truncate text-xs text-white/40">
                          {lastMessage}
                        </span>
                      </span>
                    </button>
                  );
                })}

                {filteredContacts.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-white/40">
                    No conversations match your search.
                  </p>
                )}

                <div className="mx-2 mt-4 rounded-2xl border border-dashed border-white/10 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#D8FF70]">
                    <Plus size={15} />
                    More connections
                  </div>

                  <p className="mt-2 text-xs leading-5 text-white/40">
                    New conversations and artisan discovery can be connected
                    through the backend later.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 p-4 sm:p-5">
                <div className="rounded-2xl border border-[#9B5CFF]/20 bg-gradient-to-br from-[#9B5CFF]/10 to-transparent p-5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#9B5CFF]/20 text-[#C6A4FF]">
                    <Bot size={24} />
                  </div>

                  <h2 className="mt-4 font-bold">MINDMESH AI</h2>

                  <p className="mt-2 text-xs leading-6 text-white/45">
                    Your future craft assistant for product stories, pricing,
                    artisan discovery, and order planning.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FF7A45]/20 bg-[#FF7A45]/[0.06] px-3 py-1.5 text-[10px] text-[#FFAD8C]">
                    <Circle size={7} fill="currentColor" />
                    AI not connected yet
                  </span>
                </div>

                <p className="mt-5 text-xs leading-6 text-white/35">
                  The chat interface is ready. AI-generated responses will
                  require connecting an AI model.
                </p>
              </div>
            )}
          </aside>

          {/* Chat area */}
          <section className="flex min-h-[560px] min-w-0 flex-col lg:min-h-0">
            {/* Chat header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                {activeTab === "ai" ? (
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#9B5CFF]/20 text-[#C6A4FF]">
                    <Bot size={23} />
                  </div>
                ) : (
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#D8FF70]/10 font-black text-[#D8FF70]">
                    {currentContact.avatar}
                  </div>
                )}

                <div className="min-w-0">
                  <h2 className="truncate font-bold">
                    {activeTab === "ai"
                      ? "MINDMESH AI"
                      : currentContact.name}
                  </h2>

                  <p className="mt-1 truncate text-xs text-white/40">
                    {activeTab === "ai"
                      ? "Craft intelligence · AI connection pending"
                      : `${currentContact.craft} · ${currentContact.location}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={clearCurrentChat}
                title="Clear this conversation"
                aria-label="Clear this conversation"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white/35 transition hover:bg-white/[0.06] hover:text-[#FF7A45]"
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="mx-auto max-w-3xl">
                <div className="mb-7 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] uppercase tracking-wider text-white/35">
                    <MessageCircle size={12} />
                    {activeTab === "ai"
                      ? "Your AI workspace"
                      : "A new connection"}
                  </span>
                </div>

                {activeTab === "ai" ? (
                  aiMessages.length === 0 ? (
                    <div className="mx-auto max-w-md py-10 text-center">
                      <div className="chat-ai-icon mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-[#9B5CFF]/20 bg-[#9B5CFF]/10 text-[#C6A4FF]">
                        <Sparkles size={30} />
                      </div>

                      <h3 className="mt-6 text-xl font-bold">
                        Ideas start here.
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/45">
                        Write a message to test the chat interface. AI-generated
                        replies will be enabled when the model is connected.
                      </p>

                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => setAiDraft(suggestion)}
                            className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/55 transition hover:border-[#9B5CFF]/50 hover:text-white"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {aiMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`chat-message flex ${
                            message.sender === "you"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                              message.sender === "you"
                                ? "rounded-br-md bg-[#9B5CFF] text-white"
                                : "rounded-bl-md border border-white/10 bg-white/[0.04]"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words text-sm leading-6">
                              {message.text}
                            </p>

                            <p className="mt-2 text-right text-[10px] opacity-45">
                              {timeLabel(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}

                      <p className="text-center text-xs leading-5 text-[#FFAD8C]/80">
                        Messages are saved locally. AI replies are not enabled
                        yet.
                      </p>
                    </div>
                  )
                ) : currentMessages.length === 0 ? (
                  <div className="mx-auto max-w-md py-10 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-[#D8FF70]/15 bg-[#D8FF70]/[0.06] text-[#D8FF70]">
                      <Users size={28} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      Start a conversation.
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/45">
                      Say hello to {currentContact.name}. Ask about their
                      products, custom designs, availability, or bulk orders.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setDraft(
                          `Hi ${currentContact.name}! I'd like to know more about your crafts.`
                        )
                      }
                      className="mt-5 rounded-xl border border-[#D8FF70]/20 bg-[#D8FF70]/[0.06] px-4 py-3 text-sm font-semibold text-[#D8FF70] transition hover:bg-[#D8FF70]/10"
                    >
                      <span className="flex items-center gap-2">
                        <Send size={15} />
                        Write an introduction
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`chat-message flex ${
                          message.sender === "you"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                            message.sender === "you"
                              ? "rounded-br-md bg-[#9B5CFF] text-white"
                              : "rounded-bl-md border border-white/10 bg-[#201D2C]"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words text-sm leading-6">
                            {message.text}
                          </p>

                          <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] opacity-45">
                            {timeLabel(message.createdAt)}
                            {message.sender === "you" && <Check size={12} />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-white/[0.08] bg-[#100F19]/35 p-4 sm:p-5">
              <form
                onSubmit={
                  activeTab === "ai"
                    ? sendAiMessage
                    : sendPeopleMessage
                }
                className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.035] p-2 transition focus-within:border-[#9B5CFF]/50"
              >
                <textarea
                  value={activeTab === "ai" ? aiDraft : draft}
                  onChange={(event) =>
                    activeTab === "ai"
                      ? setAiDraft(event.target.value)
                      : setDraft(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  rows={1}
                  placeholder={
                    activeTab === "ai"
                      ? "Message MINDMESH AI..."
                      : `Message ${currentContact.name}...`
                  }
                  className="max-h-32 min-h-11 flex-1 resize-y bg-transparent px-3 py-3 text-sm leading-5 outline-none placeholder:text-white/30"
                />

                <button
                  type="submit"
                  disabled={
                    !(activeTab === "ai"
                      ? aiDraft.trim()
                      : draft.trim())
                  }
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#9B5CFF] text-white transition hover:bg-[#AD7AFF] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Send message"
                >
                  <ArrowUp size={20} />
                </button>
              </form>

              <p className="mx-auto mt-3 max-w-3xl text-center text-[10px] leading-5 text-white/25">
                {activeTab === "ai"
                  ? "Demo interface · AI responses will be connected later"
                  : "Local demo only · Messages are not delivered to other users"}
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* Chat-specific animations */}
      <style jsx global>{`
        @keyframes chatFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes chatFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes chatGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(155, 92, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 28px rgba(155, 92, 255, 0.23);
          }
        }

        .chat-enter {
          animation: chatFadeUp 550ms ease-out both;
        }

        .chat-window {
          animation: chatFadeUp 650ms ease-out both;
        }

        .chat-contact {
          animation: chatFadeUp 400ms ease-out both;
        }

        .chat-message {
          animation: chatFadeUp 250ms ease-out both;
        }

        .chat-ai-icon {
          animation: chatGlow 4s ease-in-out infinite;
        }

        .chat-orb {
          animation: chatFloat 9s ease-in-out infinite;
        }

        .chat-orb-orange {
          animation-delay: -3s;
        }

        .chat-orb-lime {
          animation-delay: -6s;
        }

        .chat-page button,
        .chat-page a {
          -webkit-tap-highlight-color: transparent;
        }

        .chat-page button:not(:disabled):active {
          transform: scale(0.98);
        }

        .chat-page input:focus,
        .chat-page textarea:focus {
          outline: none;
        }

        .chat-page ::selection {
          background: #9b5cff;
          color: white;
        }

        @media (prefers-reduced-motion: reduce) {
          .chat-enter,
          .chat-window,
          .chat-contact,
          .chat-message,
          .chat-ai-icon,
          .chat-orb {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}