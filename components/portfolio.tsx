"use client"

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query)
    return defaultValue
  })

  const handleChange = () => setMatches(getMatches(query))

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

const nailPhotos = [
  "/portfolio/IMG_1109.jpg",
  "/portfolio/IMG_1279.jpg",
  "/portfolio/IMG_1505.jpg",
  "/portfolio/IMG_1506.jpg",
  "/portfolio/IMG_1512.jpg",
  "/portfolio/IMG_1513.jpg",
  "/portfolio/IMG_1514.jpg",
  "/portfolio/IMG_1515.jpg",
  "/portfolio/IMG_1516.jpg",
  "/portfolio/IMG_1517.jpg",
  "/portfolio/IMG_1518.jpg",
  "/portfolio/IMG_1519.jpg",
  "/portfolio/chatgpt-1.jpg",
  "/portfolio/chatgpt-2.jpg",
  "/portfolio/chatgpt-3.jpg",
  "/portfolio/chatgpt-4.jpg",
  "/portfolio/chatgpt-5.jpg",
  "/portfolio/chatgpt-6.jpg",
]

const BASE_SPEED = 0.04 // degrés par frame (~2.4°/s à 60fps)

const Carousel = memo(
  ({
    handleClick,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string) => void
    cards: string[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 2800 : 3400
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    const speedRef = useRef(BASE_SPEED)
    const isDraggingRef = useRef(false)
    const rafRef = useRef<number>(0)
    const isActiveRef = useRef(isCarouselActive)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
      isActiveRef.current = isCarouselActive
    }, [isCarouselActive])

    useEffect(() => {
      if (prefersReducedMotion) return
      const animate = () => {
        if (!isDraggingRef.current && isActiveRef.current) {
          rotation.set(rotation.get() + speedRef.current)
          // Décélération progressive vers la vitesse de base
          speedRef.current += (BASE_SPEED - speedRef.current) * 0.06
        }
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(rafRef.current)
    }, [rotation, prefersReducedMotion])

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: isScreenSizeSm ? "2000px" : "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDragStart={() => {
            isDraggingRef.current = true
          }}
          onDrag={(_, info) => {
            rotation.set(rotation.get() + info.delta.x * 0.3)
          }}
          onDragEnd={(_, info) => {
            isDraggingRef.current = false
            const impulse = info.velocity.x * 0.02
            speedRef.current = Math.max(-0.3, Math.min(0.3, impulse))
          }}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl)}
            >
              <img
                src={imgUrl}
                alt={`Réalisation ongulaire ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="pointer-events-none w-full rounded-xl object-cover aspect-square"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const cards = useMemo(() => nailPhotos, [])
  const col1 = useMemo(() => nailPhotos.filter((_, i) => i % 2 === 0), [])
  const col2 = useMemo(() => nailPhotos.filter((_, i) => i % 2 !== 0), [])

  const handleClick = useCallback((imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
  }, [])

  const handleClose = useCallback(() => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }, [])

  return (
    <div className="relative">
      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 md:p-16 cursor-zoom-out"
            transition={{ duration: 0.25 }}
          >
            {/* Bouton fermer */}
            <button
              onClick={handleClose}
              aria-label="Fermer l'aperçu"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <motion.img
              src={activeImg}
              alt="Réalisation ongulaire — L'Atelier d'Amande"
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              style={{ willChange: "transform", maxHeight: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop : carousel 3D */}
      <div className="relative h-[500px] w-full hidden md:block" style={{ overflowX: "clip" }}>
        <Carousel
          handleClick={handleClick}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>

      {/* Mobile : deux rangées défilantes horizontalement */}
      <div className="md:hidden flex flex-col gap-2 overflow-hidden">
        <style>{`
          @keyframes scrollLeft {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>

        {[col1, col2].map((col, colIndex) => (
          <div key={colIndex} className="overflow-hidden">
            <div
              className="flex gap-2"
              style={{
                animation: `${colIndex === 0 ? "scrollLeft" : "scrollRight"} 35s linear infinite`,
                willChange: "transform",
                width: "max-content",
              }}
            >
              {[...col, ...col].map((imgUrl, i) => (
                <div
                  key={i}
                  className="w-36 h-36 rounded-xl overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => handleClick(imgUrl)}
                >
                  <img
                    src={imgUrl}
                    alt="Réalisation"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Portfolio() {
  return (
    <section id="portfolio" className="pt-16 pb-8 overflow-x-clip" style={{ backgroundColor: "#FAF7F3" }}>
      <div className="text-center mb-12 px-6">
        <p
          className="text-xs tracking-[0.22em] uppercase mb-4 font-light"
          style={{ color: "rgba(176,128,96,0.7)" }}
        >
          Portfolio
        </p>
        <h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl mb-5"
          style={{ color: "#3A2A1E" }}
        >
          Mes Réalisations
        </h2>
        <p className="text-base md:text-lg font-light" style={{ color: "#6B5A4E" }}>
          Chaque paire de mains raconte une histoire.
        </p>
      </div>
      <ThreeDPhotoCarousel />
    </section>
  )
}
