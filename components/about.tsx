"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { FlipButton } from "@/components/ui/flip-button"

const atelierPhotos = [
  { src: "/atelier-1.png", alt: "L'Atelier d'Amande — ambiance" },
  { src: "/atelier-2.png", alt: "L'Atelier d'Amande — espace de travail" },
  { src: "/atelier-3.jpg", alt: "L'Atelier d'Amande — détail" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef(null)
  const decorativeRef = useRef(null)
  const textInView = useInView(textRef, { once: true, margin: "-50px" })
  const decorativeInView = useInView(decorativeRef, { once: true, margin: "-50px" })
  
  const [atelierOpen, setAtelierOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const decorativeY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  const paragraphs = [
    "Avant de sublimer des mains, je façonnais des dossiers juridiques. Assistante juridique pendant plusieurs années, j'y ai cultivé la précision, la rigueur et le sens du détail — des qualités qui sont aujourd'hui au cœur de chaque pose que je réalise.",
    "Puis un jour, j'ai choisi d'écouter ce qui me faisait vraiment vibrer : la beauté, le soin, la créativité. J'ai tout quitté pour me former et être diplômée par Kittycia, une référence dans le milieu de la prothésie ongulaire.",
    "À L'Atelier d'Amande, à Marcellaz, chaque rendez-vous est une parenthèse douce et personnalisée. Un moment rien que pour toi : te poser, souffler, te faire chouchouter… et repartir avec des mains qui te ressemblent.",
    "Passionnée et curieuse, je me forme en continu pour t'offrir des techniques actuelles, des finitions impeccables et une expérience premium où chaque détail compte."
  ]

  return (
    <section
      id="apropos"
      ref={sectionRef}
      className="py-24 bg-[#F5F0EB] overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text content - 60% */}
          <div className="lg:col-span-3" ref={textRef}>
            {/* Vignette flottante — mobile uniquement */}
            <div
              className="float-right ml-5 mb-3 lg:hidden"
              style={{ width: "38%", maxWidth: "160px" }}
            >
              <div
                className="aspect-square overflow-hidden"
                style={{ borderRadius: "1rem 2.5rem 1rem 2.5rem" }}
              >
                <img
                  src="/about-photo.png"
                  alt="Amanda"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 25%" }}
                />
              </div>
            </div>

            <p className="text-[#B08060] text-xs tracking-[0.22em] uppercase mb-3 font-light">
              À Propos
            </p>
            <SectionHeading>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2A1E] mb-4">
                Rencontrez Amanda
              </h2>
            </SectionHeading>

            <motion.p
              className="text-[#B08060] text-xl mb-8 italic"
              style={{ fontFamily: "var(--font-cormorant)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {"Un nouveau chapitre, né d'une vraie passion."}
            </motion.p>

            <div className="space-y-6 text-[#3A2A1E] leading-relaxed font-light">
              {paragraphs.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    delay: 0.4 + index * 0.15, 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Bouton + galerie atelier */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <FlipButton
                text1="Fermer l'atelier"
                text2="Découvrez mon atelier"
                isFlipped={atelierOpen}
                onToggle={() => setAtelierOpen((v) => !v)}
              />

              <AnimatePresence>
                {atelierOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-3 pt-5">
                      {atelierPhotos.map((photo, index) => (
                        <motion.div
                          key={photo.src}
                          className="flex-1 overflow-hidden"
                          style={{ borderRadius: "0.75rem", aspectRatio: "1/1" }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Photo — 40% — desktop uniquement */}
          <motion.div
            ref={decorativeRef}
            className="hidden lg:block lg:col-span-2 relative"
            style={{ y: decorativeY }}
          >
            {/* Corner accent — top left */}
            <motion.div
              className="absolute -top-4 -left-4 w-10 h-10 border-t border-l border-[#B08060]/50 z-10 pointer-events-none"
              animate={{ opacity: decorativeInView ? 1 : 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            />
            {/* Corner accent — bottom right */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-10 h-10 border-b border-r border-[#B08060]/50 z-10 pointer-events-none"
              animate={{ opacity: decorativeInView ? 1 : 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            />

            {/* Photo — outer div holds the rounded shape, inner div animates the polygon sweep */}
            <div
              className="aspect-[4/3] lg:aspect-[3/4] max-h-72 lg:max-h-none overflow-hidden"
              style={{ borderRadius: "1.5rem 4rem 1.5rem 4rem" }}
            >
              <motion.div
                className="relative w-full h-full"
                initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }}
                animate={decorativeInView
                  ? { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
                  : { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }}
                transition={{ duration: 1.2, ease: "circOut", delay: 0.15 }}
              >
                <motion.img
                  src="/about-photo.png"
                  alt="Amanda — L'Atelier d'Amande"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 25%" }}
                  initial={{ scale: 1.08 }}
                  animate={decorativeInView ? { scale: 1 } : { scale: 1.08 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Subtle warm vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(44,26,14,0.18) 0%, transparent 45%)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
