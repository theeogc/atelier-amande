"use client"

import React from "react"
import { Star } from "lucide-react"

type Review = {
  name: string
  source: "Google" | "Planity"
  rating: number
  text: string
}

const row1: Review[] = [
  {
    name: "Clara Dupont",
    source: "Google",
    rating: 5,
    text: "Je recommande vivement Amanda pour son professionnalisme et son accueil : Un pur instant de plaisir, de bien-être et des ongles magnifiques !!! (Qualité des produits)",
  },
  {
    name: "Delphine Moscou",
    source: "Google",
    rating: 5,
    text: "Un lieu tout cocooning où Amanda nous reçoit pour un moment de détente. Très professionnelle, à l'écoute et de bons conseils, en plus de passer un bon moment vous ressortirez avec de jolis ongles. Je recommande à 100%",
  },
  {
    name: "Sab MB",
    source: "Google",
    rating: 5,
    text: "Franchement, Amanda est au top ! Elle est super gentille, très accueillante et met tout de suite à l'aise. Son travail est impeccable, mes ongles sont toujours parfaits et tiennent super bien. C'est un vrai plaisir d'y aller, je recommande les yeux fermés !",
  },
  {
    name: "Gaëlle Goncalves",
    source: "Google",
    rating: 5,
    text: "Très bel accueil. J'ai passé un agréable moment. Pose de semi-permanent aux pieds au top. Je reviendrai régulièrement. Je recommande vivement Amanda.",
  },
  {
    name: "Barbara",
    source: "Planity",
    rating: 5,
    text: "Quel plaisir d'avoir pu bénéficier des soins d'Amanda ! Au top, merci !",
  },
  {
    name: "Coralie",
    source: "Planity",
    rating: 5,
    text: "Super ! Merci beaucoup",
  },
]

const row2: Review[] = [
  {
    name: "Laura",
    source: "Planity",
    rating: 5,
    text: "Tout était top, je recommande vivement ! Merci encore 😊",
  },
  {
    name: "Elena Maeva",
    source: "Google",
    rating: 5,
    text: "Première visite pour une pose de semi-permanent, et vraiment une très bonne expérience. Amanda est très agréable, je me suis sentie très à l'aise et le résultat ne m'a pas déçue. Je recommande ses services les yeux fermés.",
  },
  {
    name: "Paula Francisco Cantón",
    source: "Google",
    rating: 5,
    text: "J'y suis allée plusieurs fois pour des extensions et je repars à chaque fois ravie. Amanda est douce, à l'écoute, et le résultat est vraiment propre et naturel. J'ai même gardé mes ongles bien plus longtemps que prévu entre deux rendez-vous.",
  },
  {
    name: "Isabelle Johnston",
    source: "Google",
    rating: 5,
    text: "Deux visites déjà à l'Atelier d'Amande, et je suis ravie. Amanda est très minutieuse, à l'écoute, ouverte et vraiment sympathique. La pose gel est impeccable et le nail art est parfaitement exécuté selon ma demande.",
  },
  {
    name: "Josiane",
    source: "Planity",
    rating: 5,
    text: "Accueil, prestation, ambiance, tout était parfait. Je reviendrais",
  },
]

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function PlanityIcon() {
  return (
    <span className="text-[10px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.52)" }}>
      P
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="mx-2 p-4 md:p-6 rounded-xl md:rounded-2xl w-[60vw] md:w-[36rem] shrink-0 flex flex-col gap-2 md:gap-3"
      style={{
        backgroundColor: "#2C1A0E",
        border: "1px solid rgba(176, 128, 96, 0.28)",
      }}
    >
      {/* Stars + source */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-[#C4956A] text-[#C4956A]" />
          ))}
        </div>
        <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.52)" }}>
          {review.source === "Google" ? <GoogleIcon /> : <PlanityIcon />}
          <span className="text-[9px] md:text-[10px] tracking-wide">{review.source}</span>
        </div>
      </div>

      {/* Quote */}
      <p
        className="text-xs md:text-sm leading-relaxed font-light flex-1 line-clamp-4 md:line-clamp-none"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        "{review.text}"
      </p>

      {/* Name */}
      <p className="text-xs md:text-sm font-medium" style={{ color: "#B08060" }}>
        {review.name}
      </p>
    </div>
  )
}

function MarqueeRow({
  data,
  reverse = false,
  speed = 40,
}: {
  data: Review[]
  reverse?: boolean
  speed?: number
}) {
  const doubled = React.useMemo(() => [...data, ...data], [data])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #1a0f0a 0%, transparent 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        className="flex"
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          width: "max-content",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #1a0f0a 0%, transparent 100%)",
        }}
      />
    </div>
  )
}

export function Testimonials() {
  return (
    <section
      id="avis"
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "#1a0f0a" }}
    >
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-16 px-6">
        <p
          className="text-xs tracking-[0.28em] uppercase mb-5 font-light"
          style={{ color: "rgba(176,128,96,0.6)" }}
        >
          Témoignages
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Ce qu'elles disent
        </h2>
        <p
          className="text-xl italic"
          style={{ color: "#C4956A", fontFamily: "var(--font-cormorant)" }}
        >
          5,0 / 5 · Google & Planity
        </p>
      </div>

      {/* Two marquee rows */}
      <div className="flex flex-col gap-5">
        <MarqueeRow data={row1} reverse={false} speed={65} />
        <MarqueeRow data={row2} reverse={true} speed={55} />
      </div>
    </section>
  )
}
