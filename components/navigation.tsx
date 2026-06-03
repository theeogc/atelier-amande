"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#apropos", label: "À propos" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
]

const EXPAND_SCROLL_THRESHOLD = 60

export function Navigation() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [xOffset, setXOffset] = useState(0)

  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)
  const scrollPositionOnCollapse = useRef(0)

  useEffect(() => {
    const update = () => setXOffset(window.innerWidth / 2 - 48)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current

    if (isExpanded && latest > previous && latest > 150) {
      setIsExpanded(false)
      setIsMobileMenuOpen(false)
      scrollPositionOnCollapse.current = latest
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setIsExpanded(true)
    }

    lastScrollY.current = latest
  })

  return (
    <>
      {/* Pill nav */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.header
          className={`pointer-events-auto bg-[#2C1F1A] rounded-[50px] shadow-[0_8px_32px_rgba(0,0,0,0.28)] border border-white/5 overflow-hidden relative transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExpanded ? "w-[90%] max-w-5xl" : "w-12"
          }`}
          initial={{ y: -80, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            x: isExpanded ? 0 : xOffset,
          }}
          style={{ cursor: isExpanded ? "default" : "pointer" }}
          transition={{
            y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.8 },
            x: { type: "spring", damping: 22, stiffness: 280 },
          }}
          onClick={() => { if (!isExpanded) setIsExpanded(true) }}
        >
          <nav className="px-4 sm:px-5 py-2.5">
            {/* Main content */}
            <motion.div
              className="flex items-center justify-between gap-4"
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: isExpanded ? 0.25 : 0.12, delay: isExpanded ? 0.15 : 0 }}
            >
              {/* Logo */}
              <motion.a
                href="#accueil"
                className="flex items-center gap-2 shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/logo-monogramme.png"
                  alt="Logo L'Atelier d'Amande"
                  height={42}
                  width={42}
                  className="object-contain"
                  priority
                />
                <Image
                  src="/logo-texte.png"
                  alt="L'Atelier d'Amande"
                  height={26}
                  width={140}
                  className="block object-contain"
                  priority
                />
              </motion.a>

              {/* Links — desktop */}
              <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="relative text-white/75 text-sm tracking-wide font-light overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.5 }}
                    whileHover="hover"
                  >
                    <motion.span
                      variants={{ hover: { y: -20, opacity: 0 } }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {link.label}
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 text-[#B08060]"
                      initial={{ y: 20, opacity: 0 }}
                      variants={{ hover: { y: 0, opacity: 1 } }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                  </motion.a>
                ))}
              </div>

              {/* CTA + mobile toggle */}
              <div className="flex items-center gap-3 shrink-0">
                <motion.a
                  href="https://www.planity.com/latelier-damande-74250-marcellaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:block bg-[#B08060] text-white px-5 py-2 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(176,128,96,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Réserver ma séance
                </motion.a>

                <motion.button
                  onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(!isMobileMenuOpen) }}
                  className="lg:hidden p-2 text-white/80"
                  aria-label="Toggle menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={22} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={22} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            {/* Collapsed icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.7 : 1 }}
                transition={{ duration: isExpanded ? 0.12 : 0.2, delay: isExpanded ? 0 : 0.2 }}
              >
                <Menu className="h-5 w-5 text-[#B08060]" />
              </motion.div>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && isExpanded && (
          <motion.div
            className="fixed top-[86px] left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-[#2C1F1A] rounded-[24px] px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.28)] border border-white/5">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/75 text-base tracking-wide py-3 border-b border-white/10 last:border-0 font-light"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                    whileHover={{ x: 8, color: "#B08060" }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="https://www.planity.com/latelier-damande-74250-marcellaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B08060] text-white px-6 py-3 rounded-full text-center font-medium mt-3 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Réserver ma séance
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
