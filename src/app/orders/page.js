
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  PackageCheck,
  Trash2,
  Clock3,
  Sparkles,
  Plus,
  Minus,
  Package,
} from "lucide-react";

const STORAGE_KEY = "mindmesh-orders-v1";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      setOrders([]);
    }

    setLoaded(true);
  }, []);

  function saveOrders(updated) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setOrders(updated);
    } catch {
      alert("Could not update your orders. Please try again.");
    }
  }

  function changeQuantity(productId, amount) {
    const updated = orders.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity: Math.max(1, (item.quantity || 1) + amount),
          }
        : item
    );

    saveOrders(updated);
  }

  function removeOrder(productId) {
    saveOrders(orders.filter((item) => item.productId !== productId));
  }

  const totalItems = orders.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const totalValue = orders.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100f19] text-white">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orders-orb orders-orb-one" />
        <div className="orders-orb orders-orb-two" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
        <Link
          href="/marketplace"
          className="orders-enter mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#d8ff70]"
        >
          <ArrowLeft size={16} />
          Back to marketplace
        </Link>

        {/* Page heading */}
        <div className="orders-enter mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8ff70]/20 bg-[#d8ff70]/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d8ff70]">
              <PackageCheck size={15} />
              Your craft journey
            </p>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              My{" "}
              <span className="bg-gradient-to-r from-[#9b5cff] to-[#ff7a45] bg-clip-text text-transparent">
                Orders.
              </span>
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-white/55">
              Keep track of the handmade pieces you want to bring home
              and the artisans behind them.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#9b5cff] px-5 py-3 font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#ad7aff] md:self-auto"
          >
            Discover more crafts
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Quick stats */}
        {loaded && orders.length > 0 && (
          <div className="orders-enter mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-lg">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[#9b5cff]/15 text-[#c5a1ff]">
                <ShoppingBag size={20} />
              </div>
              <p className="text-2xl font-black">{orders.length}</p>
              <p className="mt-1 text-sm text-white/45">Different crafts</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-lg">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[#ff7a45]/15 text-[#ffad8c]">
                <Package size={20} />
              </div>
              <p className="text-2xl font-black">{totalItems}</p>
              <p className="mt-1 text-sm text-white/45">Total pieces</p>
            </div>

            <div className="col-span-2 rounded-2xl border border-[#d8ff70]/15 bg-[#d8ff70]/[0.04] p-5 lg:col-span-1">
              <p className="text-sm text-white/45">Estimated total value</p>
              <p className="mt-3 text-3xl font-black text-[#d8ff70]">
                ₹{totalValue.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-white/35">
                Based on demo prices
              </p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {!loaded ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/50">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#9b5cff]" />
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          /* Empty state */
          <div className="orders-enter relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center sm:py-24">
            <div className="absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-[#9b5cff]/10 blur-[80px]" />

            <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-[#9b5cff]/20 bg-[#9b5cff]/10 text-[#c5a1ff]">
              <ShoppingBag size={34} />
            </div>

            <h2 className="relative mt-7 text-2xl font-bold sm:text-3xl">
              Your journey starts here.
            </h2>

            <p className="relative mx-auto mt-3 max-w-md leading-7 text-white/50">
              You haven&apos;t added any crafts yet. Explore the marketplace
              and choose a handmade piece to get started.
            </p>

            <Link
              href="/marketplace"
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d8ff70] px-5 py-3 font-bold text-[#100f19] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(216,255,112,0.15)]"
            >
              Explore marketplace
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
            {/* Order list */}
            <div className="space-y-4">
              {orders.map((item, index) => (
                <article
                  key={item.productId}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="orders-card rounded-3xl border border-white/10 bg-[#191725]/90 p-5 transition duration-300 hover:border-[#9b5cff]/40 sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#9b5cff]/25 via-[#302342] to-[#ff7a45]/10">
                      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:12px_12px]" />
                      <ShoppingBag
                        size={30}
                        className="relative text-[#d8ff70]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold transition hover:text-[#d8ff70]">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-white/45">
                        {item.artisan}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#ff7a45]/20 bg-[#ff7a45]/10 px-3 py-1 text-xs text-[#ffad8c]">
                        <Clock3 size={13} />
                        {item.status || "Requested"}
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xl font-black">
                        ₹
                        {(item.price * (item.quantity || 1)).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        ₹{item.price.toLocaleString("en-IN")} per piece
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3">
                      <span className="mr-1 text-xs text-white/40">
                        Quantity
                      </span>

                      <button
                        onClick={() => changeQuantity(item.productId, -1)}
                        disabled={(item.quantity || 1) <= 1}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 transition hover:border-[#9b5cff]/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-5 text-center font-bold">
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() => changeQuantity(item.productId, 1)}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 transition hover:border-[#9b5cff]/50 hover:bg-white/10"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeOrder(item.productId)}
                      className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/40 transition hover:bg-[#ff7a45]/10 hover:text-[#ff7a45]"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Order summary */}
            <aside className="orders-enter h-fit rounded-3xl border border-white/10 bg-[#191725]/95 p-6 backdrop-blur-xl lg:sticky lg:top-24">
              <p className="flex items-center gap-2 text-sm text-white/50">
                <Sparkles size={16} className="text-[#d8ff70]" />
                Order overview
              </p>

              <h2 className="mt-4 text-2xl font-black">
                Your selection
              </h2>

              <div className="mt-6 space-y-4 border-b border-white/10 pb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Different crafts</span>
                  <span className="font-semibold">{orders.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total pieces</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Delivery</span>
                  <span className="text-[#d8ff70]">Not calculated</span>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <span className="text-sm text-white/50">Estimated total</span>
                <span className="text-2xl font-black text-[#d8ff70]">
                  ₹{totalValue.toLocaleString("en-IN")}
                </span>
              </div>

              <p className="mt-4 text-xs leading-5 text-white/35">
                This is an estimate based on demo prices. No payment or real
                order has been placed.
              </p>

              <Link
                href="/marketplace"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9b5cff] px-4 py-3 font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#ad7aff]"
              >
                Continue exploring
                <ArrowRight size={17} />
              </Link>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#d8ff70]/10 bg-[#d8ff70]/[0.04] p-4">
                <PackageCheck
                  size={22}
                  className="shrink-0 text-[#d8ff70]"
                />
                <p className="text-xs leading-5 text-white/45">
                  Every selection helps bring attention to traditional
                  craftsmanship.
                </p>
              </div>
            </aside>
          </div>
        )}

        <footer className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <p>
            MIND<span className="font-bold text-[#c5a1ff]">MESH</span> ·
            Preserving craft, empowering makers.
          </p>
          <Link
            href="/marketplace"
            className="transition hover:text-[#d8ff70]"
          >
            Discover more crafts ↑
          </Link>
        </footer>
      </section>

      <style jsx global>{`
        @keyframes ordersFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ordersFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(16px, -22px, 0);
          }
        }

        .orders-enter {
          animation: ordersFadeUp 0.65s ease both;
        }

        .orders-card {
          animation: ordersFadeUp 0.6s ease both;
        }

        .orders-orb {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 9999px;
          filter: blur(100px);
          opacity: 0.12;
          animation: ordersFloat 12s ease-in-out infinite;
        }

        .orders-orb-one {
          top: 100px;
          left: -200px;
          background: #9b5cff;
        }

        .orders-orb-two {
          top: 480px;
          right: -220px;
          background: #ff7a45;
          animation-delay: -5s;
        }

        @media (prefers-reduced-motion: reduce) {
          .orders-enter,
          .orders-card,
          .orders-orb {
            animation: none !important;
          }

          .orders-card,
          .orders-card * {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
