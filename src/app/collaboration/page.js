"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Users,
  Search,
  Plus,
  Handshake,
  Package,
  Clock3,
  MapPin,
  CheckCircle2,
  Sparkles,
  Boxes,
  X,
} from "lucide-react";

const STORAGE_KEY = "mindmesh-collaborations-v1";

const SAMPLE_OPPORTUNITIES = [
  {
    id: "sample-1",
    title: "Coastal Craft Collective",
    category: "Handicrafts",
    location: "Udupi, Karnataka",
    description:
      "Bring coastal artisans together to create a coordinated collection of palm-leaf and natural-fibre handicrafts.",
    skills: ["Palm-leaf craft", "Natural fibres", "Finishing"],
    members: 6,
    target: 20,
    deadline: "Open collaboration",
    createdBy: "MINDMESH Community",
  },
  {
    id: "sample-2",
    title: "Kasuti Heritage Collection",
    category: "Embroidery",
    location: "Karnataka",
    description:
      "Collaborate on traditional Kasuti embroidery products for a shared collection that celebrates regional artistry.",
    skills: ["Kasuti embroidery", "Textile design", "Stitching"],
    members: 8,
    target: 15,
    deadline: "Open collaboration",
    createdBy: "MINDMESH Community",
  },
  {
    id: "sample-3",
    title: "Festive Bulk Order Network",
    category: "Bulk Orders",
    location: "Coastal Karnataka",
    description:
      "Coordinate production capacity across artisan groups to fulfil larger festive and corporate gift orders.",
    skills: ["Production planning", "Packaging", "Quality checks"],
    members: 4,
    target: 12,
    deadline: "Open collaboration",
    createdBy: "MINDMESH Community",
  },
];

const CATEGORIES = [
  "All",
  "Handicrafts",
  "Embroidery",
  "Textiles",
  "Bulk Orders",
  "Other",
];

export default function CollaborationPage() {
  const [customOpportunities, setCustomOpportunities] = useState([]);
  const [joinedIds, setJoinedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "Handicrafts",
    location: "",
    description: "",
    skills: "",
    target: "10",
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );

      if (Array.isArray(saved.opportunities)) {
        setCustomOpportunities(saved.opportunities);
      }

      if (Array.isArray(saved.joinedIds)) {
        setJoinedIds(saved.joinedIds);
      }
    } catch {
      // Use the sample opportunities if saved data is invalid.
    }
  }, []);

  function saveData(opportunities, joined) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          opportunities,
          joinedIds: joined,
        })
      );
    } catch {
      setNotice("Could not save changes in this browser.");
    }
  }

  const allOpportunities = useMemo(
    () => [...customOpportunities, ...SAMPLE_OPPORTUNITIES],
    [customOpportunities]
  );

  const filteredOpportunities = useMemo(() => {
    const term = search.trim().toLowerCase();

    return allOpportunities.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchableText = [
        item.title,
        item.category,
        item.location,
        item.description,
        ...(item.skills || []),
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!term || searchableText.includes(term))
      );
    });
  }, [allOpportunities, category, search]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newOpportunity = {
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      description: form.description.trim(),
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      members: 1,
      target: Math.max(2, Number(form.target) || 10),
      deadline: "Open collaboration",
      createdBy: "Community member",
    };

    if (
      !newOpportunity.title ||
      !newOpportunity.location ||
      !newOpportunity.description
    ) {
      setNotice("Please complete all required fields.");
      return;
    }

    const updated = [
      newOpportunity,
      ...customOpportunities,
    ];

    setCustomOpportunities(updated);
    saveData(updated, joinedIds);

    setForm({
      title: "",
      category: "Handicrafts",
      location: "",
      description: "",
      skills: "",
      target: "10",
    });

    setShowForm(false);
    setCategory("All");
    setSearch("");
    setNotice("Your collaboration opportunity has been created!");
  }

  function handleJoin(item) {
    if (joinedIds.includes(item.id)) {
      setNotice("You've already joined this opportunity.");
      return;
    }

    const updated = [...joinedIds, item.id];

    setJoinedIds(updated);
    saveData(customOpportunities, updated);

    setNotice(`You've joined "${item.title}" on this browser!`);
  }

  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/marketplace";
    }
  }

  const totalMembers = allOpportunities.reduce(
    (total, item) => total + (Number(item.members) || 0),
    0
  );

  return (
    <main className="collab-page min-h-screen overflow-hidden bg-[#100F19] text-white">
      {/* Animated ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="collab-orb absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#9B5CFF]/10 blur-[120px]" />
        <div className="collab-orb absolute -right-40 top-96 h-96 w-96 rounded-full bg-[#FF7A45]/10 blur-[120px]" />
        <div className="collab-orb absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#D8FF70]/5 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        {/* Hero */}
        <section className="grid gap-10 pb-14 pt-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:pt-12">
          <div>
            <button
              type="button"
              onClick={goBack}
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/75 transition-all duration-300 hover:-translate-x-1 hover:border-[#D8FF70]/50 hover:text-[#D8FF70]"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8FF70]/20 bg-[#D8FF70]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8FF70]">
              <Sparkles size={14} />
              Stronger together
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              Small makers.
              <br />
              <span className="bg-gradient-to-r from-[#B58AFF] via-[#9B5CFF] to-[#FF9B70] bg-clip-text text-transparent">
                Bigger possibilities.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
              Find fellow artisans, combine skills, coordinate bulk orders,
              and turn individual craftsmanship into collective opportunity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm((current) => !current);
                  setNotice("");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#D8FF70] px-5 py-3.5 font-bold text-[#171714] transition hover:-translate-y-0.5 hover:bg-[#e4ff9c]"
              >
                {showForm ? <X size={18} /> : <Plus size={18} />}
                {showForm ? "Close form" : "Start a collaboration"}
              </button>

              <a
                href="#opportunities"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 font-semibold text-white transition hover:border-[#9B5CFF] hover:text-[#D0AEFF]"
              >
                Explore opportunities
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          {/* Community statistics */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-[#9B5CFF]/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/60">
                  The power of community
                </span>
                <Users className="text-[#D8FF70]" size={22} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#9B5CFF]/20 bg-[#9B5CFF]/10 p-5">
                  <Users className="mb-5 text-[#C6A1FF]" size={24} />
                  <div className="text-3xl font-black">
                    {totalMembers}+
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    Sample members
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D8FF70]/20 bg-[#D8FF70]/5 p-5">
                  <Boxes className="mb-5 text-[#D8FF70]" size={24} />
                  <div className="text-3xl font-black">
                    {allOpportunities.length}
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    Opportunities
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF7A45]/10 text-[#FF9A70]">
                    <Handshake size={22} />
                  </div>
                  <div>
                    <p className="font-bold">One connected ecosystem</p>
                    <p className="mt-1 text-xs text-white/45">
                      Share skills. Grow together.
                    </p>
                  </div>
                  <ArrowUpRight
                    className="ml-auto text-white/40"
                    size={20}
                  />
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-white/35">
                Sample opportunities demonstrate the collaboration experience.
              </p>
            </div>
          </div>
        </section>

        {/* Status message */}
        {notice && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-xl border border-[#D8FF70]/20 bg-[#D8FF70]/5 p-4 text-sm text-[#D8FF70]"
          >
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              className="ml-auto text-white/50 hover:text-white"
              aria-label="Dismiss message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Create opportunity form */}
        {showForm && (
          <section className="mb-12 rounded-3xl border border-[#9B5CFF]/25 bg-[#9B5CFF]/[0.06] p-5 sm:p-8">
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#BFA0FF]">
                Community builder
              </div>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Create an opportunity
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Describe what you want to make and which artisans you want to
                work with.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 md:grid-cols-2"
            >
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/75">
                  Opportunity title *
                </span>
                <input
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  required
                  maxLength={100}
                  placeholder="e.g. Coastal artisan gift collection"
                  className="w-full rounded-xl border border-white/10 bg-[#100F19]/80 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-[#9B5CFF]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/75">
                  Category *
                </span>
                <select
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  className="w-full rounded-xl border border-white/10 bg-[#100F19] px-4 py-3 text-white outline-none focus:border-[#9B5CFF]"
                >
                  {CATEGORIES.filter((item) => item !== "All").map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/75">
                  Location *
                </span>
                <input
                  name="location"
                  value={form.location}
                  onChange={updateField}
                  required
                  maxLength={100}
                  placeholder="e.g. Udupi, Karnataka"
                  className="w-full rounded-xl border border-white/10 bg-[#100F19]/80 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#9B5CFF]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white/75">
                  Target collaborators
                </span>
                <input
                  name="target"
                  type="number"
                  min="2"
                  max="1000"
                  value={form.target}
                  onChange={updateField}
                  className="w-full rounded-xl border border-white/10 bg-[#100F19]/80 px-4 py-3 text-white outline-none focus:border-[#9B5CFF]"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-white/75">
                  Description *
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  required
                  maxLength={1000}
                  rows={4}
                  placeholder="What do you want to create? What help do you need?"
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#100F19]/80 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#9B5CFF]"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-white/75">
                  Skills needed
                </span>
                <input
                  name="skills"
                  value={form.skills}
                  onChange={updateField}
                  maxLength={250}
                  placeholder="Embroidery, packaging, textile design"
                  className="w-full rounded-xl border border-white/10 bg-[#100F19]/80 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#9B5CFF]"
                />
                <span className="mt-2 block text-xs text-white/35">
                  Separate skills with commas.
                </span>
              </label>

              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D8FF70] px-5 py-3 font-bold text-[#171714] transition hover:bg-[#e4ff9c]"
                >
                  Publish opportunity
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-white/65 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Opportunity list */}
        <section id="opportunities" className="pb-16 pt-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#BFA0FF]">
                Find your people
              </div>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Open opportunities<span className="text-[#9B5CFF]">.</span>
              </h2>
              <p className="mt-3 text-sm text-white/45">
                Discover projects that match your craft and skills.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search opportunities..."
                aria-label="Search opportunities"
                className="w-full rounded-xl border border-white/10 bg-white/[0.035] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#9B5CFF]"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "border-[#D8FF70] bg-[#D8FF70] text-[#171714]"
                    : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredOpportunities.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
              <Search className="mx-auto text-white/30" size={30} />
              <h3 className="mt-4 text-xl font-bold">
                No matching opportunities
              </h3>
              <p className="mt-2 text-sm text-white/45">
                Try another search or category, or create a new opportunity.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 text-sm font-bold text-[#D8FF70] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredOpportunities.map((item, index) => {
                const joined = joinedIds.includes(item.id);

                const progress = Math.min(
                  100,
                  ((Number(item.members) || 0) /
                    Math.max(1, Number(item.target) || 1)) *
                    100
                );

                return (
                  <article
                    key={item.id}
                    style={{ animationDelay: `${index * 90}ms` }}
                    className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#9B5CFF]/40 hover:bg-white/[0.055] sm:p-6"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          index % 3 === 0
                            ? "bg-[#9B5CFF]/15 text-[#C6A1FF]"
                            : index % 3 === 1
                              ? "bg-[#FF7A45]/10 text-[#FF9A70]"
                              : "bg-[#D8FF70]/10 text-[#D8FF70]"
                        }`}
                      >
                        {item.category === "Bulk Orders" ? (
                          <Package size={23} />
                        ) : item.category === "Embroidery" ? (
                          <Sparkles size={23} />
                        ) : (
                          <Handshake size={23} />
                        )}
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-white/55">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold leading-snug transition group-hover:text-[#D0AEFF]">
                      {item.title}
                    </h3>

                    <p className="mt-3 flex items-center gap-2 text-xs text-white/40">
                      <MapPin size={14} />
                      {item.location}
                    </p>

                    <p className="mt-4 flex-1 text-sm leading-7 text-white/55">
                      {item.description}
                    </p>

                    {item.skills?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-white/[0.08] bg-black/20 px-2.5 py-1.5 text-xs text-white/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 border-t border-white/[0.08] pt-5">
                      <div className="mb-3 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-white/45">
                          <Users size={14} />
                          {item.members} current members
                        </span>
                        <span className="text-white/35">
                          Goal: {item.target}
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#9B5CFF] to-[#D8FF70] transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-white/35">
                        <Clock3 size={13} />
                        {item.deadline || "Open collaboration"}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleJoin(item)}
                        disabled={joined}
                        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                          joined
                            ? "cursor-default border border-[#D8FF70]/20 bg-[#D8FF70]/5 text-[#D8FF70]"
                            : "bg-white text-[#100F19] hover:bg-[#D8FF70]"
                        }`}
                      >
                        {joined ? (
                          <>
                            <CheckCircle2 size={17} />
                            Joined on this browser
                          </>
                        ) : (
                          <>
                            Join collaboration
                            <ArrowRight size={17} />
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <span className="font-black tracking-wide text-white/70">
              MINDMESH.
            </span>{" "}
            Preserving craft. Connecting futures.
          </span>

          <div className="flex flex-wrap gap-5">
            <Link href="/marketplace" className="hover:text-white">
              Marketplace
            </Link>
            <Link href="/studio" className="hover:text-white">
              Craft Studio
            </Link>
            <Link href="/chat" className="hover:text-white">
              Chat Hub
            </Link>
            <Link href="/orders" className="hover:text-white">
              My Orders
            </Link>
          </div>
        </footer>
      </div>

      {/* Page-specific animations */}
      <style jsx global>{`
        @keyframes collabFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes collabAmbient {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .collab-page > div.relative > section {
          animation: collabFadeUp 650ms cubic-bezier(.2,.7,.3,1) both;
        }

        .collab-page article {
          animation: collabFadeUp 550ms ease-out both;
          transition: transform 240ms ease, border-color 240ms ease,
            box-shadow 240ms ease, background-color 240ms ease;
        }

        .collab-page article:hover {
          box-shadow: 0 18px 42px rgba(0,0,0,.22);
        }

        .collab-page input,
        .collab-page textarea,
        .collab-page select {
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }

        .collab-page input:focus,
        .collab-page textarea:focus,
        .collab-page select:focus {
          outline: none;
          border-color: rgba(155,92,255,.9);
          box-shadow: 0 0 0 3px rgba(155,92,255,.14);
        }

        .collab-page button:not(:disabled) {
          transition: transform 180ms ease, box-shadow 180ms ease,
            background-color 180ms ease, border-color 180ms ease;
        }

        .collab-page button:not(:disabled):active {
          transform: scale(.98);
        }

        .collab-page .collab-orb {
          animation: collabAmbient 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .collab-page > div.relative > section,
          .collab-page article,
          .collab-page .collab-orb {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}