"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

export function NotFoundContent() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: "#1a0f0a" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(176,128,96,0.08) 0%, transparent 100%)",
        }}
      />

      {/* Corner frame accents */}
      {(
        [
          "top-6 left-6 border-t border-l",
          "top-6 right-6 border-t border-r",
          "bottom-6 left-6 border-b border-l",
          "bottom-6 right-6 border-b border-r",
        ] as const
      ).map((classes, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 ${classes}`}
          style={{ borderColor: "rgba(176,128,96,0.22)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 + i * 0.08, duration: 0.6 }}
        />
      ))}

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="mb-10"
      >
        <Image
          src="/logo-monogramme.png"
          alt="L'Atelier d'Amande"
          width={52}
          height={52}
          className="object-contain"
          style={{ opacity: 0.65 }}
        />
      </motion.div>

      {/* 404 */}
      <div className="relative mb-4 select-none" aria-hidden>
        {/* Glow behind */}
        <motion.span
          className="absolute inset-0 font-serif pointer-events-none"
          style={{
            fontSize: "clamp(7rem, 20vw, 18rem)",
            lineHeight: 1,
            color: "#B08060",
            filter: "blur(48px)",
            letterSpacing: "-0.04em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          404
        </motion.span>
        {/* Outlined text */}
        <motion.span
          className="relative font-serif block"
          style={{
            fontSize: "clamp(7rem, 20vw, 18rem)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(176,128,96,0.3)",
            letterSpacing: "-0.04em",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
        >
          404
        </motion.span>
      </div>

      {/* Title & message */}
      <motion.div
        className="text-center max-w-sm mb-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
      >
        <h1
          className="font-serif text-2xl sm:text-3xl text-white mb-4"
          style={{ letterSpacing: "-0.01em" }}
        >
          Cette page s'est éclipsée…
        </h1>
        <p
          className="text-sm sm:text-base leading-relaxed font-light"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          L'adresse que vous cherchez n'existe plus, ou n'a jamais existé.
          Retournez à l'accueil pour retrouver votre chemin.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease }}
      >
        <motion.a
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: "#B08060" }}
          whileHover={{ backgroundColor: "#C4956A", scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </motion.a>
        <motion.a
          href="https://www.planity.com/latelier-damande-74250-marcellaz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium"
          style={{
            color: "rgba(255,255,255,0.52)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          whileHover={{
            color: "rgba(255,255,255,0.85)",
            borderColor: "rgba(255,255,255,0.2)",
            scale: 1.02,
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          Prendre rendez-vous
        </motion.a>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-8"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.1, ease }}
        style={{
          width: "120px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(176,128,96,0.45), transparent)",
        }}
      />
    </section>
  )
}
