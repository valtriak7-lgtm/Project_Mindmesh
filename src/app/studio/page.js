
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  PackagePlus,
  IndianRupee,
  BookOpen,
  CheckCircle2,
  MapPin,
  Clock3,
} from "lucide-react";

const LISTINGS_KEY = "mindmesh-listings-v1";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#9b5cff]/70 focus:bg-white/[0.04]";

export default function CraftStudioPage() {
  const [form, setForm] = useState({
    name: "",
    artisan: "",
    location: "",
    category: "Textiles",
    materials: "0",
    hours: "1",
    hourlyRate: "100",
    otherCosts: "0",
    margin: "20",
    technique: "",
    quantity: "1",
  });

  const [story, setStory] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setSaved(false);
    setError("");
  }

  const materials = Math.max(0, Number(form.materials) || 0);
  const hours = Math.max(0, Number(form.hours) || 0);
  const hourlyRate = Math.max(0, Number(form.hourlyRate) || 0);
  const otherCosts = Math.max(0, Number(form.otherCosts) || 0);
  const margin = Math.min(100, Math.max(0, Number(form.margin) || 0));

  const labourCost = hours * hourlyRate;
  const baseCost = materials + labourCost + otherCosts;
  const suggestedPrice = Math.ceil((baseCost * (1 + margin / 100)) / 10) * 10;

  function generateStory() {
    if (!form.name.trim() || !form.artisan.trim()) {
      setError("Enter the product name and artisan name first.");
      return;
    }

    const technique = form.technique.trim()
      ? ` The piece is made using ${form.technique.trim()}.`
      : "";

    setStory(
      `${form.name.trim()} is a handcrafted ${form.category.toLowerCase()} piece created by ${form.artisan.trim()}${
        form.location.trim() ? ` in ${form.location.trim()}` : ""
      }.${technique} Each piece reflects the maker's skill, time, and dedication to preserving local craftsmanship.`
    );

    setError("");
    setSaved(false);
  }

  function saveListing(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.artisan.trim()) {
      setError("Product name and artisan name are required.");
      return;
    }

    if (baseCost <= 0) {
      setError("Enter material, labour, or other costs before saving.");
      return;
    }

    const listing = {
      id: `listing-${Date.now()}`,
      name: form.name.trim(),
      artisan: form.artisan.trim(),
      location: form.location.trim(),
      category: form.category,
      quantity: Math.max(1, Number(form.quantity) || 1),
      materials,
      labourCost,
      otherCosts,
      baseCost,
      suggestedPrice,
      story: story.trim(),
      technique: form.technique.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem(LISTINGS_KEY) || "[]"
      );

      if (!Array.isArray(existing)) {
        throw new Error("Invalid listings data");
      }

      localStorage.setItem(
        LISTINGS_KEY,
        JSON.stringify([listing, ...existing])
      );

      setSaved(true);
      setError("");
    } catch {
      setError("Could not save the listing in your browser.");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100f19] px-4 py-8 text-white sm:px-8 sm:py-10">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="studio-orb studio-orb-one" />
        <div className="studio-orb studio-orb-two" />
        <div className="absolute inset-0 opacity-[0.1] [background-image:radial-gradient(rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/"
          className="studio-enter inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#d8ff70]"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>

        {/* Hero */}
        <div className="studio-enter mb-10 mt-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d8ff70]/20 bg-[#d8ff70]/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d8ff70]">
            <Sparkles size={16} />
            MINDMESH artisan tools
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Craft{" "}
            <span className="bg-gradient-to-r from-[#9b5cff] to-[#ff7a45] bg-clip-text text-transparent">
              Studio.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            Create a product listing, tell its cultural story, and estimate
            a fair price that accounts for the materials and labour behind it.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/50">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
              <PackagePlus size={14} className="text-[#c6a4ff]" />
              Product listings
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
              <IndianRupee size={14} className="text-[#ffad8c]" />
              Fair price estimator
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
              <BookOpen size={14} className="text-[#d8ff70]" />
              Craft storytelling
            </span>
          </div>
        </div>

        <form onSubmit={saveListing}>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            {/* Product details */}
            <section className="studio-enter rounded-3xl border border-white/10 bg-[#191725]/90 p-5 backdrop-blur-xl sm:p-7">
              <div className="mb-7 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#9b5cff]/15 text-[#c6a4ff]">
                  <PackagePlus size={23} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Product details</h2>
                  <p className="mt-1 text-sm text-white/40">
                    Tell buyers what you&apos;re making.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <Field label="Product name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Kasuti embroidered stole"
                    className={inputClass}
                  />
                </Field>

                <Field label="Artisan name">
                  <input
                    required
                    value={form.artisan}
                    onChange={(e) => update("artisan", e.target.value)}
                    placeholder="Your name or craft collective"
                    className={inputClass}
                  />
                </Field>

                <Field label="Location">
                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />
                    <input
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="e.g. Dharwad, Karnataka"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </Field>

                <Field label="Craft category">
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className={inputClass}
                  >
                    <option>Textiles</option>
                    <option>Home Decor</option>
                    <option>Woodcraft</option>
                    <option>Beedu Craft</option>
                    <option>Coastal Craft</option>
                    <option>Other Handicrafts</option>
                  </select>
                </Field>

                <Field label="Craft technique and heritage">
                  <textarea
                    value={form.technique}
                    onChange={(e) => update("technique", e.target.value)}
                    placeholder="Describe the technique, materials, or tradition behind your craft..."
                    rows={4}
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <Field label="Available quantity">
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>

            <div className="space-y-6">
              {/* Price estimator */}
              <section className="studio-enter rounded-3xl border border-white/10 bg-[#191725]/90 p-5 backdrop-blur-xl sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ff7a45]/10 text-[#ffad8c]">
                    <IndianRupee size={23} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      Fair price estimator
                    </h2>
                    <p className="mt-1 text-sm text-white/40">
                      Estimate your cost per piece.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Field label="Materials cost (₹)">
                    <input
                      type="number"
                      min="0"
                      value={form.materials}
                      onChange={(e) => update("materials", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Labour hours">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={form.hours}
                        onChange={(e) => update("hours", e.target.value)}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Rate/hour (₹)">
                      <input
                        type="number"
                        min="0"
                        value={form.hourlyRate}
                        onChange={(e) =>
                          update("hourlyRate", e.target.value)
                        }
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Other costs (₹)">
                    <input
                      type="number"
                      min="0"
                      value={form.otherCosts}
                      onChange={(e) => update("otherCosts", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label={`Additional margin: ${margin}%`}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={margin}
                      onChange={(e) => update("margin", e.target.value)}
                      className="w-full cursor-pointer accent-[#9b5cff]"
                    />
                    <div className="flex justify-between text-xs text-white/35">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </Field>
                </div>

                <div className="mt-6 rounded-2xl border border-[#d8ff70]/15 bg-gradient-to-br from-[#d8ff70]/[0.07] to-transparent p-5">
                  <p className="text-sm text-white/50">
                    Estimated selling price per piece
                  </p>
                  <p className="mt-2 text-4xl font-black text-[#d8ff70]">
                    ₹{suggestedPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="mt-2 text-xs text-white/40">
                    Includes your selected {margin}% margin
                  </p>

                  <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm">
                    <CostRow label="Materials" value={materials} />
                    <CostRow label="Labour" value={labourCost} />
                    <CostRow label="Other costs" value={otherCosts} />
                    <CostRow label="Base production cost" value={baseCost} />
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/35">
                  This is a cost-plus estimate, not a verified market price.
                  Account for packaging, platform fees, and local market
                  conditions where applicable.
                </p>
              </section>

              {/* Story generator */}
              <section className="studio-enter rounded-3xl border border-white/10 bg-[#191725]/90 p-5 backdrop-blur-xl sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#9b5cff]/15 text-[#c6a4ff]">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Craft story</h2>
                    <p className="mt-1 text-sm text-white/40">
                      Give your craft a voice.
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/45">
                  Create a first draft from the details you entered. This
                  version uses a local template, not a connected AI service.
                </p>

                <button
                  type="button"
                  onClick={generateStory}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#9b5cff]/30 bg-[#9b5cff]/10 px-4 py-3 font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-[#9b5cff]/20"
                >
                  <Sparkles size={17} />
                  Generate story draft
                </button>

                {story && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-white/75">
                      {story}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(story).catch(() => {});
                      }}
                      className="mt-3 text-xs font-semibold text-[#d8ff70] hover:underline"
                    >
                      Copy story
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Validation and save feedback */}
          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {saved && (
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#d8ff70]/20 bg-[#d8ff70]/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm text-[#d8ff70]">
                <CheckCircle2 size={19} />
                Listing saved in this browser&apos;s local storage.
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#d8ff70]"
              >
                View marketplace <ArrowRight size={16} />
              </Link>
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#d8ff70] px-6 py-4 font-bold text-[#100f19] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(216,255,112,0.15)]"
            >
              Save product listing
              <ArrowRight size={18} />
            </button>

            <Link
              href="/marketplace"
              className="flex items-center justify-center rounded-xl border border-white/15 px-6 py-4 font-semibold text-white/70 transition hover:border-[#9b5cff]/50 hover:text-white"
            >
              View marketplace
            </Link>
          </div>
        </form>

        <footer className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <p>
            MIND<span className="font-bold text-[#c6a4ff]">MESH</span> ·
            Preserving craft, empowering makers.
          </p>
          <Link href="/" className="transition hover:text-[#d8ff70]">
            Back to home ↑
          </Link>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes studioFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes studioFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(18px, -22px, 0);
          }
        }

        .studio-enter {
          animation: studioFadeUp 0.65s ease both;
        }

        .studio-orb {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 9999px;
          filter: blur(100px);
          opacity: 0.12;
          animation: studioFloat 12s ease-in-out infinite;
        }

        .studio-orb-one {
          top: 80px;
          left: -200px;
          background: #9b5cff;
        }

        .studio-orb-two {
          top: 600px;
          right: -220px;
          background: #ff7a45;
          animation-delay: -5s;
        }

        @media (prefers-reduced-motion: reduce) {
          .studio-enter,
          .studio-orb {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/65">{label}</span>
      {children}
    </label>
  );
}

function CostRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-white/45">{label}</span>
      <span>₹{value.toLocaleString("en-IN")}</span>
    </div>
  );
}
