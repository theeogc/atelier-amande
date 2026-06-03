"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Sparkles, Heart, Palette, Clock, Gift, CreditCard } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const services = [
  {
    title: "Ongles en Gel",
    icon: Sparkles,
    items: [
      { name: "1ère pose S/M", price: "65 €" },
      { name: "1ère pose L/XL", price: "70 €" },
      { name: "Remplissage S/M", price: "52 €" },
      { name: "Remplissage L/XL", price: "55 €" },
      { name: "Gainage ongle naturel", price: "50 €" },
      { name: "Dépose gel / gainage", price: "25 €" },
    ],
  },
  {
    title: "Semi-Permanent",
    icon: Heart,
    items: [
      { name: "VSP Mains (couleur unie)", price: "35 €" },
      { name: "Remplissage VSP Mains", price: "35 €" },
      { name: "VSP Pieds (couleur unie)", price: "38 €" },
      { name: "Remplissage VSP Pieds", price: "38 €" },
      { name: "Dépose semi-permanent", price: "15 €" },
    ],
  },
  {
    title: "Soins & Forfaits",
    icon: Gift,
    items: [
      { name: "Forfait Gel + French/Babyboomer", price: "55 €" },
      { name: "Forfait Mains (Gel) + VSP Pieds", price: "80 €" },
      { name: "Forfait VSP Mains + Pieds", price: "70 €" },
    ],
  },
  {
    title: "Nail Art & Finitions",
    icon: Palette,
    items: [
      { name: "French / Babyboomer", price: "+5 €" },
      { name: "Décoration Cat Eye", price: "+5 €" },
      { name: "Nail Art / Paillettes (par ongle)", price: "+1 €" },
      { name: "Demande spéciale", price: "Sur devis" },
    ],
  },
]

const infoBannerItems = [
  { icon: Clock, text: "Annulation 24h à l'avance requise" },
  { icon: Sparkles, text: "Dépose offerte pour toute nouvelle pose complète" },
  { icon: CreditCard, text: "Tarifs hors promotion" },
]

function ServiceCard({
  service,
  index,
}: {
  service: typeof services[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const IconComponent = service.icon

  return (
    <motion.div
      ref={ref}
      className="group relative bg-[#F5F0EB] rounded-2xl p-6 sm:p-8 overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(176, 128, 96, 0.15)" }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-[#B08060]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#B08060]/10 flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-[#B08060]" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#3A2A1E]">{service.title}</h3>
        </div>
        <ul className="space-y-3">
          {service.items.map((item, i) => (
            <motion.li
              key={item.name}
              className="flex justify-between items-center py-2 border-b border-[#E8E2DC] last:border-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.15 + i * 0.05 + 0.3 }}
            >
              <span className="text-[#3A2A1E] font-light">{item.name}</span>
              <span className="text-[#B08060] font-medium tabular-nums">{item.price}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function AccordionItem({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: typeof services[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const IconComponent = service.icon

  return (
    <motion.div
      ref={ref}
      className="border-b border-[#E8E2DC] last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#B08060]/10 flex items-center justify-center shrink-0">
            <IconComponent className="w-4 h-4 text-[#B08060]" />
          </div>
          <span className="font-serif text-lg text-[#3A2A1E]">{service.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-6 h-6 rounded-full border border-[#B08060]/40 flex items-center justify-center shrink-0"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="#B08060" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-4 space-y-0">
              {service.items.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center py-2.5 border-b border-[#E8E2DC]/60 last:border-0 px-1"
                >
                  <span className="text-[#3A2A1E] font-light text-sm">{item.name}</span>
                  <span className="text-[#B08060] font-medium tabular-nums text-sm shrink-0 ml-4">{item.price}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Services() {
  const bannerRef = useRef(null)
  const bannerInView = useInView(bannerRef, { once: true, margin: "-50px" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="services"
      className="relative bg-[#FAF7F3] pt-16 pb-24 scroll-mt-24"
    >
      <div className="container mx-auto px-6">

        {/* Section intro */}
        <div className="text-center mb-12">
          <p className="text-[#B08060] text-xs tracking-[0.22em] uppercase mb-4 font-light">
            Tarifs &amp; Services
          </p>
          <SectionHeading>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2A1E] mb-4">
              Nos Prestations
            </h2>
          </SectionHeading>
          <p className="text-[#6B5A4E] font-light max-w-md mx-auto mt-4 text-sm sm:text-base">
            Des finitions impeccables, des produits premium, dans un espace entièrement dédié à ton confort.
          </p>
        </div>

        {/* Mobile : accordion */}
        <div className="lg:hidden bg-[#F5F0EB] rounded-2xl px-5 mb-12">
          {services.map((service, index) => (
            <AccordionItem
              key={service.title}
              service={service}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Desktop : grille */}
        <div className="hidden lg:grid grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Info banner */}
        <motion.div
          ref={bannerRef}
          className="bg-[#F5F0EB] border border-[#B08060]/30 rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={
            bannerInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.95 }
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoBannerItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    bannerInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#B08060]/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-[#B08060]" />
                  </div>
                  <span className="text-[#3A2A1E] text-sm font-light">{item.text}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
