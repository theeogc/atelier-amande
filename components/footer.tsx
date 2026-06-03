"use client"

import { Instagram, Facebook, Phone, ArrowUp, Heart } from "lucide-react"

function PlanityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M68.2358 30H32.2361V90H44.2361V77.9999H68.2358C81.4893 77.9999 92.236 67.2532 92.236 54.0002C92.236 40.7467 81.4893 30 68.2358 30ZM68.2358 65.9998H44.2361V42H68.2358C74.8628 42 80.2359 47.3732 80.2359 54.0002C80.2359 60.6267 74.8628 65.9998 68.2358 65.9998Z" />
    </svg>
  )
}

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#apropos" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  {
    href: "https://instagram.com/latelierdamande74",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/p/LAtelier-dAmande-61588058220042/",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://wa.me/33669036984",
    icon: Phone,
    label: "WhatsApp",
  },
  {
    href: "https://www.planity.com/latelier-damande-74250-marcellaz",
    icon: PlanityIcon,
    label: "Planity",
  },
]

function handleScrollTop() {
  window.scroll({ top: 0, behavior: "smooth" })
}

const iconLinkClass =
  "hover:-translate-y-1 border border-dotted border-[#B08060]/40 rounded-xl p-2.5 transition-all duration-200 text-[#B08060] hover:border-[#B08060] hover:bg-[#B08060]/10"

export function Footer() {
  return (
    <footer className="bg-[#1a0f0a] text-[#F5EFE8] border-t border-[#B08060]/20">

      {/* Logo + nav links */}
      <div className="mx-auto max-w-4xl px-6 pt-12 pb-8 flex flex-col items-center gap-8">
        <img
          src="/logo-monogramme.png"
          alt="L'Atelier d'Amande"
          className="w-12 h-12 object-contain"
        />
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-[#8A7A6E] hover:text-[#F5EFE8] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="border-b border-dotted border-[#B08060]/20" />
      </div>

      {/* Social icons + scroll-to-top */}
      <div className="mx-auto max-w-4xl px-6 py-6 flex flex-wrap items-center justify-center gap-3">
        {socialLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={iconLinkClass}
            >
              <Icon className="w-5 h-5" />
            </a>
          )
        })}

        <div className="border border-dotted border-[#B08060]/40 rounded-full flex items-center px-3 py-1.5 ml-2">
          <button
            type="button"
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 text-xs text-[#8A7A6E] hover:text-[#F5EFE8] transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Haut de page
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-4xl px-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B5A4E]">
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span>©</span>
          <span>2026</span>
          <span className="text-[#F5EFE8]/70 font-medium">L'Atelier d'Amande</span>
          <span>· Tous droits réservés · Fait avec</span>
          <Heart className="w-3 h-3 text-red-500 inline fill-red-500" />
          <span>par Théo</span>
        </div>
        <a
          href="/mentions-legales"
          className="text-[#6B5A4E] hover:text-[#B08060] transition-colors underline underline-offset-2 whitespace-nowrap"
        >
          Mentions légales
        </a>
      </div>

    </footer>
  )
}
