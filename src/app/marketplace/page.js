
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
  Plus,
  Check,
  ShoppingBag,
  Package,
  Users,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Kasuti Heritage Saree",
    artisan: "Lakshmi • Dharwad, Karnataka",
    category: "Textiles",
    price: 4200,
    quantity: 12,
    emoji: "🧵",
    color: "violet",
    story: "Traditional Kasuti embroidery, carefully stitched by hand.",
  },
  {
    id: 2,
    name: "Coastal Palm Basket",
    artisan: "Meera • Udupi, Karnataka",
    category: "Home Decor",
    price: 850,
    quantity: 24,
    emoji: "🧺",
    color: "orange",
    story: "Woven from natural palm leaves using coastal craft techniques.",
  },
  {
    id: 3,
    name: "Handcrafted Wooden Horse",
    artisan: "Ramesh • Channapatna, Karnataka",
    category: "Woodcraft",
    price: 1600,
    quantity: 8,
    emoji: "🐎",
    color: "lime",
    story: "A colourful wooden keepsake inspired by Karnataka's craft heritage.",
  },
  {
    id: 4,
    name: "Embroidered Wall Art",
    artisan: "Savitha • Ilkal, Karnataka",
    category: "Home Decor",
    price: 1250,
    quantity: 15,
    emoji: "🪡",
    color: "violet",
    story: "A contemporary wall piece inspired by traditional embroidery.",
  },
  {
    id: 5,
    name: "Handloom Cotton Stole",
    artisan: "Ananya • Bagalkot, Karnataka",
    category: "Textiles",
    price: 950,
    quantity: 30,
    emoji: "🧣",
    color: "orange",
    story: "A lightweight handloom stole made for everyday use.",
  },
  {
    id: 6,
    name: "Palm-Leaf Table Decor",
    artisan: "Geetha • Mangaluru, Karnataka",
    category: "Home Decor",
    price: 700,
    quantity: 18,
    emoji: "🌾",
    color: "lime",
    story: "Natural textures and local craftsmanship for your living space.",
  },
];

const categories = ["All", "Textiles", "Home Decor", "Woodcraft"];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [added, setAdded] = useState([]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        !term ||
        `${product.name} ${product.artisan} ${product.category} ${product.story}`
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  function addToOrders(product) {
    try {
      const key = "mindmesh-orders-v1";
      const current = JSON.parse(localStorage.getItem(key) || "[]");

      const existing = current.find(
        (item) => item.productId === product.id
      );

      let updated;

      if (existing) {
        updated = current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updated = [
          ...current,
          {
            productId: product.id,
            name: product.name,
            artisan: product.artisan,
            price: product.price,
            quantity: 1,
            status: "Requested",
            createdAt: new Date().toISOString(),
          },
        ];
      }

      localStorage.setItem(key, JSON.stringify(updated));
      setAdded((previous) => [...new Set([...previous, product.id])]);
    } catch {
      alert("Could not save your order. Please try again.");
    }
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100f19] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="market-orb market-orb-one" />
        <div className="market-orb market-orb-two" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:pt-16 lg:px-8 lg:pt-20">
        {/* Hero */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="market-enter">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8ff70]/20 bg-[#d8ff70]/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d8ff70]">
              <Sparkles size={15} />
              The living craft marketplace
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Discover craft.
              <br />
              <span className="bg-gradient-to-r from-[#9b5cff] via-[#c19aff] to-[#ff7a45] bg-clip-text text-transparent">
                Support its story.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
              Meet the makers behind Karnataka&apos;s craft traditions.
              Every piece has a story, a skill, and a person worth supporting.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 rounded-xl bg-[#d8ff70] px-5 py-3 font-bold text-[#100f19] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(216,255,112,0.18)]"
              >
                <Plus size={18} />
                Create a listing
              </Link>

              <Link
                href="/orders"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 font-semibold text-white transition duration-300 hover:border-[#9b5cff]/60 hover:bg-white/[0.08]"
              >
                <ShoppingBag size={18} />
                My orders
              </Link>
            </div>
          </div>

          <div className="market-enter rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-white/55">Explore the collection</span>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9b5cff]/15 text-[#c7a5ff]">
                <Package size={22} />
              </span>
            </div>

            <p className="text-4xl font-black sm:text-5xl">
              {filteredProducts.length.toString().padStart(2, "0")}
              <span className="ml-2 text-xl font-semibold text-white/50">
                pieces
              </span>
            </p>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Explore handcrafted goods, discover their makers, and support
              traditional skills.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-4">
                <p className="text-2xl font-black text-[#d8ff70]">03</p>
                <p className="mt-1 text-xs text-white/50">Craft categories</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-4">
                <p className="text-2xl font-black text-[#ff9b72]">
                  {favorites.length.toString().padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs text-white/50">Your favourites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={19}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search crafts, makers, or stories..."
                aria-label="Search crafts"
                className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-4 text-sm outline-none transition placeholder:text-white/30 focus:border-[#9b5cff]/70 focus:bg-white/[0.04]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal size={17} className="mr-1 text-white/40" />
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`rounded-full border px-4 py-2.5 text-sm transition duration-200 ${
                    category === item
                      ? "border-[#d8ff70] bg-[#d8ff70] font-bold text-[#100f19]"
                      : "border-white/10 text-white/65 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-white/50">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "craft" : "crafts"}
          </p>
          <p className="hidden items-center gap-2 text-xs text-white/35 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#d8ff70]" />
            Made with care in Karnataka
          </p>
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 px-6 py-20 text-center">
            <Search className="mx-auto mb-4 text-white/30" size={34} />
            <h2 className="text-xl font-bold">No crafts found</h2>
            <p className="mt-2 text-sm text-white/50">
              Try another search or choose a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-full bg-[#9b5cff] px-5 py-3 font-semibold transition hover:bg-[#ad7aff]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <article
                key={product.id}
                style={{ animationDelay: `${index * 90}ms` }}
                className="market-card group overflow-hidden rounded-3xl border border-white/10 bg-[#191725]/90 transition duration-300 hover:-translate-y-2 hover:border-[#9b5cff]/50 hover:shadow-[0_20px_60px_rgba(155,92,255,0.12)]"
              >
                <div
                  className={`relative flex h-56 items-center justify-center overflow-hidden ${
                    product.color === "violet"
                      ? "bg-gradient-to-br from-[#9b5cff]/30 via-[#302342] to-[#191725]"
                      : product.color === "orange"
                      ? "bg-gradient-to-br from-[#ff7a45]/25 via-[#34231f] to-[#191725]"
                      : "bg-gradient-to-br from-[#d8ff70]/15 via-[#292d23] to-[#191725]"
                  }`}
                >
                  <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:18px_18px]" />

                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10 transition duration-700 group-hover:scale-150" />
                  <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-white/10 transition duration-700 group-hover:scale-125" />

                  <span className="relative select-none text-7xl transition duration-500 group-hover:scale-125 group-hover:-rotate-6">
                    {product.emoji}
                  </span>

                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs backdrop-blur-md">
                    {product.category}
                  </span>

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={
                      favorites.includes(product.id)
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    aria-pressed={favorites.includes(product.id)}
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/25 backdrop-blur-md transition hover:scale-110 hover:bg-white/10"
                  >
                    <Heart
                      size={18}
                      className={
                        favorites.includes(product.id)
                          ? "fill-[#ff7a45] text-[#ff7a45]"
                          : "text-white"
                      }
                    />
                  </button>

                  <span className="absolute bottom-4 right-4 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md">
                    {product.quantity} available
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    {product.artisan}
                  </p>

                  <h2 className="mt-3 text-xl font-bold transition group-hover:text-[#d8ff70]">
                    {product.name}
                  </h2>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-white/55">
                    {product.story}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-5">
                    <div>
                      <p className="text-xs text-white/40">Price per piece</p>
                      <p className="mt-1 text-2xl font-black">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      onClick={() => addToOrders(product)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 ${
                        added.includes(product.id)
                          ? "bg-[#d8ff70] text-[#100f19]"
                          : "bg-[#9b5cff] text-white hover:bg-[#ad7aff]"
                      }`}
                    >
                      {added.includes(product.id) ? (
                        <Check size={17} />
                      ) : (
                        <Plus size={17} />
                      )}
                      {added.includes(product.id) ? "Added" : "Add to orders"}
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-white/35">
                    <span>Crafted with care</span>
                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d8ff70]"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Collaboration CTA */}
        <div className="market-enter mt-14 overflow-hidden rounded-3xl border border-[#9b5cff]/20 bg-gradient-to-r from-[#9b5cff]/10 via-white/[0.03] to-[#ff7a45]/10 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#9b5cff]/20 bg-[#9b5cff]/10 text-[#c7a5ff] sm:grid">
                <Users size={25} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8ff70]">
                  Built for more than one maker
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  Need a larger order?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
                  Bring artisans together to fulfil bigger requests
                  collaboratively and create more opportunities.
                </p>
              </div>
            </div>

            <Link
              href="/collaboration"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-semibold transition duration-300 hover:-translate-y-1 hover:border-[#d8ff70] hover:text-[#d8ff70]"
            >
              Explore collaboration
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <p>
            MIND<span className="font-bold text-[#c7a5ff]">MESH</span> ·
            Preserving craft, empowering makers.
          </p>
          <Link
            href="/"
            className="transition hover:text-[#d8ff70]"
          >
            Back to home ↑
          </Link>
        </footer>
      </section>

      <style jsx global>{`
        @keyframes marketFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marketFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(18px, -24px, 0);
          }
        }

        .market-enter {
          animation: marketFadeUp 0.7s ease both;
        }

        .market-card {
          animation: marketFadeUp 0.65s ease both;
        }

        .market-orb {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 9999px;
          filter: blur(100px);
          opacity: 0.12;
          animation: marketFloat 12s ease-in-out infinite;
        }

        .market-orb-one {
          top: 80px;
          left: -180px;
          background: #9b5cff;
        }

        .market-orb-two {
          top: 550px;
          right: -220px;
          background: #ff7a45;
          animation-delay: -5s;
        }

        @media (prefers-reduced-motion: reduce) {
          .market-enter,
          .market-card,
          .market-orb {
            animation: none !important;
          }

          .market-card,
          .market-card * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
