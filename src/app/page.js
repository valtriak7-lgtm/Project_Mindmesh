"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Fingerprint,
  Sparkles,
  Workflow,
  HeartHandshake,
  Zap,
  WandSparkles,
  Users,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import InteractiveField from "@/components/InteractiveField";

const features = [
  {
    number: "01",
    title: "Craft DNA",
    icon: Fingerprint,
    color: "violet",
    description:
      "Turn traditional craft knowledge into compelling product stories. Preserve the artisan's identity, technique, and cultural roots.",
    link: "/marketplace",
    linkText: "Explore the marketplace",
  },
  {
    number: "02",
    title: "Fair Value",
    icon: Sparkles,
    color: "orange",
    description:
      "Help artisans understand material, labour, and time costs so their work can be priced more transparently.",
    link: "/studio",
    linkText: "Estimate a fair price",
  },
  {
    number: "03",
    title: "Collective Power",
    icon: Workflow,
    color: "lime",
    description:
      "Connect makers for bulk orders, shared production, and collaboration without losing the individuality of their craft.",
    link: "/collaboration",
    linkText: "Explore collaboration",
  },
];

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  function handleMove(event) {
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty(
      "--card-x",
      `${(0.5 - y / rect.height) * 8}deg`
    );

    event.currentTarget.style.setProperty(
      "--card-y",
      `${(x / rect.width - 0.5) * 8}deg`
    );

    event.currentTarget.style.setProperty("--spot-x", `${x}px`);
    event.currentTarget.style.setProperty("--spot-y", `${y}px`);
  }

  function handleLeave(event) {
    event.currentTarget.style.setProperty("--card-x", "0deg");
    event.currentTarget.style.setProperty("--card-y", "0deg");
  }

  return (
    <article
      className="mesh-feature-card"
      style={{ animationDelay: `${index * 120}ms` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="feature-spotlight" />

      <div
        className={`feature-icon ${
          feature.color === "orange"
            ? "feature-orange"
            : feature.color === "lime"
              ? "feature-lime"
              : ""
        }`}
      >
        <Icon size={25} strokeWidth={1.7} />
      </div>

      <div className="mesh-eyebrow">
        {feature.number} / MINDMESH
      </div>

      <h3>{feature.title}</h3>

      <p>{feature.description}</p>

      <Link href={feature.link} className="feature-link">
        {feature.linkText}
        <ArrowUpRight size={17} />
      </Link>
    </article>
  );
}

export default function HomePage() {
  function handleHeroMove(event) {
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    event.currentTarget.style.setProperty(
      "--hero-rotate-y",
      `${(x - 0.5) * 10}deg`
    );

    event.currentTarget.style.setProperty(
      "--hero-rotate-x",
      `${(0.5 - y) * 8}deg`
    );
  }

  function resetHero(event) {
    event.currentTarget.style.setProperty("--hero-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--hero-rotate-y", "0deg");
  }

  return (
    <main className="mesh-background">
      <InteractiveField />

      <div className="mesh-cursor-glow" aria-hidden="true" />

      {/* Hero section */}
      <section className="mesh-container mesh-hero">
        <div className="mesh-hero-copy">
          <div className="mesh-eyebrow">
            <Zap size={14} />
            Technology meets tradition
          </div>

          <h1 className="mesh-hero-title">
            Ancient hands.
            <br />
            <span className="mesh-gradient-text">
              Infinite futures.
            </span>
          </h1>

          <p className="mesh-hero-description">
            A new way for traditional artisans to tell their stories, find
            customers, discover fair value, and build a future for
            handcrafted culture.
          </p>

          <div className="mesh-hero-actions">
            <Link
              href="/marketplace"
              className="mesh-button primary-button"
            >
              <ShoppingBag size={18} />
              Explore marketplace
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/studio"
              className="mesh-button secondary-button"
            >
              <WandSparkles size={17} />
              Open Craft Studio
            </Link>
          </div>

          <div className="mesh-hero-note">
            <span className="mesh-status-dot" />
            <span>
              Rooted in heritage. Built for what comes next.
            </span>
          </div>
        </div>

        {/* Interactive animation */}
        <div
          className="hero-interactive-scene"
          onPointerMove={handleHeroMove}
          onPointerLeave={resetHero}
          aria-label="Interactive MINDMESH visual"
        >
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-orbit hero-orbit-three" />

          <div className="hero-core">
            <div className="hero-core-inner">
              <Workflow size={53} strokeWidth={1.3} />
            </div>
          </div>

          <div className="floating-chip floating-chip-top">
            <div className="mesh-chip-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <strong>AI storytelling</strong>
              <span>Every craft has a story</span>
            </div>
          </div>

          <div className="floating-chip floating-chip-bottom">
            <div className="mesh-chip-icon">
              <HeartHandshake size={18} />
            </div>

            <div>
              <strong>People first</strong>
              <span>Empowering local makers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mesh-container mesh-section"
      >
        <div className="mesh-eyebrow">
          A better craft ecosystem
        </div>

        <h2 className="mesh-section-title">
          Handmade heritage.
          <br />
          <span className="mesh-gradient-text">
            Reimagined together.
          </span>
        </h2>

        <p className="mesh-muted" style={{ maxWidth: 620 }}>
          MINDMESH brings artisans and buyers closer with tools designed
          around people, transparent value, and the future of traditional
          craftsmanship.
        </p>

        <div className="mesh-feature-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Call to action and footer */}
      <section className="mesh-container mesh-section">
        <div className="mesh-cta">
          <div className="cta-halo" />

          <div className="mesh-eyebrow">
            The future is handmade
          </div>

          <h2>
            Keep the tradition.
            <br />
            <span className="mesh-gradient-text">
              Change the possibilities.
            </span>
          </h2>

          <p>
            Discover the people behind the craft and help traditional
            craftsmanship reach a new generation.
          </p>

          <div className="mesh-hero-actions">
            <Link
              href="/marketplace"
              className="mesh-button primary-button"
            >
              Find your next craft
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/collaboration"
              className="mesh-button secondary-button"
            >
              <Users size={17} />
              Join collaboration
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="mesh-hero-actions">
            <Link
              href="/chat"
              className="mesh-button secondary-button"
            >
              <MessageCircle size={17} />
              Connect with artisans
            </Link>
          </div>
        </div>

        <footer className="mesh-footer">
          <Link href="/" className="mesh-logo">
            <span className="mesh-logo-mark">
              <Workflow size={18} />
            </span>
            MINDMESH
          </Link>

          <span>Preserving craft. Connecting futures.</span>

          <span>
            Built with purpose © {new Date().getFullYear()}
          </span>
        </footer>
      </section>
    </main>
  );
}