"use client"

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const WORDS = ["soin.", "expertise.", "précision.", "passion.", "élégance."]

// ── Glow border CSS — viewport coords via :root --mx/--my (GlowCard technique)
const GLOW_CSS = `
  [data-btn]::before,
  [data-btn]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: -1px;
    border: 1px solid transparent;
    border-radius: 9999px;
    background-attachment: fixed;
    background-size: calc(100% + 2px) calc(100% + 2px);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }
  [data-btn]::before {
    background-image: radial-gradient(
      160px 160px at calc(var(--mx, -999) * 1px) calc(var(--my, -999) * 1px),
      rgba(196, 149, 106, 0.6),
      transparent 100%
    );
    filter: brightness(1.8);
  }
  [data-btn]::after {
    background-image: radial-gradient(
      80px 80px at calc(var(--mx, -999) * 1px) calc(var(--my, -999) * 1px),
      rgba(255, 255, 255, 0.18),
      transparent 100%
    );
  }
`

// ── GlowButton — ButtonColorful gradient fill + GlowCard border spotlight ────
function GlowButton({
  href,
  children,
  variant = "primary",
  target,
  rel,
}: {
  href: string
  children: React.ReactNode
  variant?: "primary" | "outline"
  target?: string
  rel?: string
}) {
  const isPrimary = variant === "primary"

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      data-btn=""
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
      className="relative inline-flex items-center justify-center gap-2 px-8 py-[14px] rounded-full text-sm font-medium tracking-wide"
      style={{
        backgroundColor: isPrimary ? "#1a0f0a" : "transparent",
        color: isPrimary ? "white" : "rgba(255,255,255,0.70)",
        ...(isPrimary ? {} : { border: "1px solid rgba(255,255,255,0.08)" }),
      }}
    >
      {/* Gradient glow contained inside the button (overflow:hidden on wrapper) */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: isPrimary
              ? "linear-gradient(135deg, #3D1A08 0%, #B08060 50%, #D4A882 100%)"
              : "linear-gradient(135deg, #2A1008 0%, #8B6042 50%, #B08060 100%)",
            filter: "blur(6px)",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
          variants={{
            rest: { opacity: isPrimary ? 0.28 : 0.0 },
            hover: { opacity: isPrimary ? 0.6 : 0.2 },
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      {children}
    </motion.a>
  )
}

function AnimatedWord({
  word,
  delay,
  className = "",
  style,
}: {
  word: string
  delay: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.18em] mb-[-0.18em]">
      <motion.span
        className={`inline-block ${className}`}
        style={style}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    </span>
  )
}

const AVATARS = [
  { bg: "#7A5444" },
  { bg: "#5C3D30" },
  { bg: "#8B6252" },
]

function AvatarSilhouette({ bg }: { bg: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full overflow-hidden flex items-end justify-center"
      style={{ backgroundColor: bg, boxShadow: "0 0 0 2px #1a0f0a" }}
    >
      <svg viewBox="0 0 36 38" fill="none" className="w-[72%]">
        <circle cx="18" cy="11" r="7.5" fill="rgba(255,255,255,0.28)" />
        <ellipse cx="18" cy="36" rx="13" ry="9" fill="rgba(255,255,255,0.18)" />
      </svg>
    </div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => {
      setWordIndex((i) => (i + 1) % WORDS.length)
    }, 3000)
    return () => clearTimeout(id)
  }, [wordIndex])

  useEffect(() => {
    let frame: number | null = null
    let lastX = 0
    let lastY = 0

    const apply = () => {
      frame = null
      document.documentElement.style.setProperty("--mx", lastX.toFixed(2))
      document.documentElement.style.setProperty("--my", lastY.toFixed(2))
    }

    const sync = (e: PointerEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (frame === null) {
        frame = requestAnimationFrame(apply)
      }
    }

    document.addEventListener("pointermove", sync)
    return () => {
      document.removeEventListener("pointermove", sync)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      id="accueil"
      ref={heroRef}
      className="min-h-screen flex relative overflow-hidden"
      style={{ backgroundColor: "#1a0f0a" }}
    >
      <style dangerouslySetInnerHTML={{ __html: GLOW_CSS }} />

      {/* ── Left content column ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 xl:px-20 2xl:px-28 pt-28 pb-16 w-full md:max-w-[54%] lg:max-w-[50%]">

        {/* Main heading */}
        <h1 className="mb-9" style={{ lineHeight: 1.04 }}>
          <div
            className="font-serif text-white"
            style={{ fontSize: "clamp(2.6rem, 5.2vw, 5.2rem)" }}
          >
            <AnimatedWord word="L'art" delay={0.4} />
            {" "}
            <AnimatedWord word="des" delay={0.52} />
            {" "}
            <AnimatedWord word="ongles," delay={0.64} />
          </div>

          <div
            className="font-serif"
            style={{ fontSize: "clamp(2.6rem, 5.2vw, 5.2rem)" }}
          >
            <AnimatedWord word="avec" delay={0.80} className="text-white" />
            {" "}
            {/* Cycling words */}
            <span className="relative inline-block overflow-hidden align-bottom pb-[0.3em] mb-[-0.3em]">
              {/* Invisible spacer — sets width to the longest word */}
              <span
                className="invisible italic"
                style={{ color: "#C4956A", fontFamily: "var(--font-cormorant)" }}
                aria-hidden
              >
                précision.
              </span>
              <AnimatePresence mode="sync">
                <motion.span
                  key={wordIndex}
                  className="absolute inset-0 italic flex items-end pb-[0.22em]"
                  style={{ color: "#C4956A", fontFamily: "var(--font-cormorant)" }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ type: "spring", stiffness: 55, damping: 20 }}
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base leading-relaxed mb-10 max-w-md font-light"
          style={{ color: "rgba(255,255,255,0.62)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Des prestations sur-mesure dans un espace privé et raffiné,
          où chaque détail est pensé pour votre bien-être et votre beauté.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <GlowButton
            href="https://www.planity.com/latelier-damande-74250-marcellaz"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Réserver en ligne
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
            >
              →
            </motion.span>
          </GlowButton>

          <GlowButton href="#services" variant="outline">
            Découvrir mes services
          </GlowButton>
        </motion.div>

        {/* Google social proof */}
        <motion.div
          className="flex items-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.75 }}
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2.5">
            {AVATARS.map(({ bg }, i) => (
              <AvatarSilhouette key={i} bg={bg} />
            ))}
          </div>

          {/* Stars + label — cliquable → section avis */}
          <a
            href="#avis"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C4956A] text-[#C4956A]" />
              ))}
            </div>
            <div className="text-sm leading-none">
              <span className="font-semibold text-white">5,0</span>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>/5</span>
              <span className="ml-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                Avis Google
              </span>
            </div>
          </a>
        </motion.div>
      </div>

      {/* ── Mobile full-bleed background image (hidden md+) ── */}
      <div className="md:hidden absolute inset-0 overflow-hidden">
        <motion.img
          src="/portfolio/IMG_1510.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.2 }}
        />
        {/* Dark overlay — keeps text readable */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26,15,10,0.74)" }}
        />
        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 w-full h-36 pointer-events-none"
          style={{ background: "linear-gradient(to top, #1a0f0a 0%, transparent 100%)" }}
        />
      </div>

      {/* ── Right side — nail photo (desktop) ── */}
      <motion.div
        className="hidden md:block absolute right-0 top-0 w-[52%] h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
      >
        {/* Left fade gradient */}
        <div
          className="absolute left-0 top-0 w-56 h-full z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #1a0f0a 0%, rgba(26,15,10,0.7) 40%, transparent 100%)",
          }}
        />
        {/* Bottom fade gradient */}
        <div
          className="absolute bottom-0 left-0 w-full h-40 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #1a0f0a 0%, transparent 100%)",
          }}
        />

        <motion.img
          src="/portfolio/IMG_1510.jpg"
          alt="Ongles en gel — L'Atelier d'Amande"
          className="w-full h-full object-cover object-center"
          style={{ y: imageY, scale: imageScale }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-8 md:left-14 xl:left-20 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.8 }}
      >
        <motion.div
          className="w-5 h-9 rounded-full flex justify-center pt-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.12)", willChange: "transform" }}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <motion.div
            className="w-0.5 h-2 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.22)", willChange: "transform, opacity" }}
            animate={{ y: [0, 6, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
