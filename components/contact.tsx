"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Instagram, Facebook, ExternalLink, Mail } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import "leaflet/dist/leaflet.css"

const SALON = {
  lat: 46.1502,
  lng: 6.3563,
}

const schedule = [
  { day: "Lundi",     hours: "9:00 - 19:00" },
  { day: "Mardi",     hours: "9:00 - 11:30 / 13:30 - 19:00" },
  { day: "Mercredi",  hours: "9:00 - 19:00" },
  { day: "Jeudi",     hours: "9:00 - 15:30 / 17:00 - 19:00" },
  { day: "Vendredi",  hours: "9:00 - 15:00" },
  { day: "Samedi",    hours: "9:00 - 13:00" },
  { day: "Dimanche",  hours: "Fermé" },
]

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<import("leaflet").Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: true,
        attributionControl: true,
      }).setView([SALON.lat, SALON.lng], 14)

      instanceRef.current = map

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap · CartoDB",
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: "topright" }).addTo(map)

      const customIcon = L.divIcon({
        className: "",
        html: `<div style="position:relative;width:40px;height:40px">
          <div style="position:absolute;inset:0;border-radius:50%;background:rgba(176,128,96,0.35);animation:pulse 2.4s ease infinite"></div>
          <div style="position:absolute;inset:0;border-radius:50%;background:rgba(176,128,96,0.35);animation:pulse 2.4s ease 1.2s infinite"></div>
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:22px;height:22px;border-radius:50%;background:#B08060;border:3px solid white;box-shadow:0 4px 12px rgba(176,128,96,0.5)"></div>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      L.marker([SALON.lat, SALON.lng], { icon: customIcon }).addTo(map)

      map.on("focus", () => map.scrollWheelZoom.enable())
      map.on("blur",  () => map.scrollWheelZoom.disable())

      // Recalcule la taille après l'animation Framer Motion
      setTimeout(() => map.invalidateSize(), 400)
    })

    return () => {
      instanceRef.current?.remove()
      instanceRef.current = null
      if (mapRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (mapRef.current as any)._leaflet_id
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ background: "#f0e9dd" }}
    />
  )
}

export function Contact() {
  const scheduleRef = useRef(null)
  const contactRef  = useRef(null)
  const scheduleInView = useInView(scheduleRef, { once: true, margin: "-50px" })
  const contactInView  = useInView(contactRef,  { once: true, margin: "-50px" })

  const q  = encodeURIComponent("L'Atelier d'Amande, 217 Route de la Vieille Verne, 74250 Marcellaz")
  const ll = `${SALON.lat},${SALON.lng}`

  return (
    <section id="contact" className="py-24 bg-[#FAF7F3]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left — Horaires */}
          <div ref={scheduleRef}>
            <p className="text-[#B08060] text-xs tracking-[0.22em] uppercase mb-3 font-light">
              Horaires
            </p>
            <SectionHeading>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2A1E] mb-8">
                {"Horaires d'Ouverture"}
              </h2>
            </SectionHeading>

            <motion.div
              className="bg-[#F5F0EB] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={scheduleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {schedule.map((item, index) => (
                <motion.div
                  key={item.day}
                  className={`flex justify-between items-center px-6 py-4 ${
                    index % 2 === 0 ? "bg-[#F5F0EB]" : "bg-[#E8E2DC]"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={scheduleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                  whileHover={{ x: 5, backgroundColor: "rgba(176, 128, 96, 0.1)" }}
                >
                  <span className={`font-medium ${item.day === "Dimanche" ? "text-[#8A7A6E]" : "text-[#3A2A1E]"}`}>
                    {item.day}
                  </span>
                  <span className={`font-light text-sm ${item.day === "Dimanche" ? "text-[#8A7A6E]" : "text-[#6B5A4E]"}`}>
                    {item.hours}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Me Retrouver */}
          <div ref={contactRef}>
            <p className="text-[#B08060] text-xs tracking-[0.22em] uppercase mb-3 font-light">
              Accès
            </p>
            <SectionHeading>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2A1E] mb-8">
                Me Retrouver
              </h2>
            </SectionHeading>

            {/* Map */}
            <motion.div
              className="relative rounded-2xl overflow-hidden mb-6"
              style={{
                height: "280px",
                boxShadow: "0 12px 40px rgba(67,47,33,0.10)",
                border: "1px solid rgba(176,128,96,0.15)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <LeafletMap />

              {/* Floating address card — max-w prevents overlap with zoom controls */}
              <motion.div
                className="absolute bottom-3 left-3 z-[500] bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 max-w-[calc(100%-80px)]"
                style={{ boxShadow: "0 8px 24px rgba(67,47,33,0.12)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-serif text-[#3A2A1E] text-sm leading-tight mb-1">
                  {"L'Atelier d'Amande"}
                </p>
                <p className="text-[#6B5A4E] text-xs font-light">217 Route de la Vieille Verne</p>
                <p className="text-[#6B5A4E] text-xs font-light">74250 Marcellaz, Haute-Savoie</p>
              </motion.div>

              {/* Inner border overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-[400]"
                style={{ boxShadow: "inset 0 0 0 1px rgba(176,128,96,0.18)" }}
              />
            </motion.div>

            {/* Navigation buttons */}
            <motion.div
              className="grid grid-cols-3 gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                {
                  href: `https://www.google.com/maps/search/?api=1&query=${q}`,
                  label: "Google Maps",
                },
                {
                  href: `https://maps.apple.com/?q=${q}&ll=${ll}`,
                  label: "Plans Apple",
                },
                {
                  href: `https://waze.com/ul?ll=${ll}&navigate=yes`,
                  label: "Waze",
                },
              ].map((btn) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-center text-xs font-medium text-[#6B5A4E] py-2.5 px-2 rounded-xl border border-[#B08060]/20 bg-white hover:bg-[#B08060] hover:text-white hover:border-[#B08060] transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {btn.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Contact links */}
            <div className="space-y-4 mb-6">
              {[
                {
                  href: "https://wa.me/33669036984",
                  icon: Phone,
                  label: "WhatsApp",
                  value: "06 69 03 69 84",
                  delay: 0.45,
                },
                {
                  href: "https://instagram.com/latelierdamande74",
                  icon: Instagram,
                  label: "Instagram",
                  value: "@latelierdamande74",
                  delay: 0.5,
                },
                {
                  href: "https://www.facebook.com/p/LAtelier-dAmande-61588058220042/",
                  icon: Facebook,
                  label: "Facebook",
                  value: "L'Atelier d'Amande",
                  delay: 0.55,
                },
                {
                  href: "mailto:latelierdamande74@gmail.com",
                  icon: Mail,
                  label: "Email",
                  value: "latelierdamande74@gmail.com",
                  delay: 0.6,
                },
              ].map(({ href, icon: Icon, label, value, delay }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-11 h-11 rounded-full bg-[#B08060]/10 flex items-center justify-center shrink-0 group-hover:bg-[#B08060]/20 transition-colors">
                    <Icon className="w-4 h-4 text-[#B08060]" />
                  </div>
                  <div>
                    <p className="text-[#3A2A1E] font-medium text-sm">{label}</p>
                    <p className="text-[#6B5A4E] font-light text-sm group-hover:text-[#B08060] transition-colors">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Planity CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <motion.a
                href="https://www.planity.com/latelier-damande-74250-marcellaz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#B08060] text-white px-8 py-4 rounded-full font-medium"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(176,128,96,0.3)", y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Réserver sur Planity</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
              <p className="text-center text-[#8A7A6E] text-sm mt-3 font-light">
                Réservation en ligne 24h/24, 7j/7
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%   { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 16px rgba(176,128,96,0.1) !important;
          border-radius: 12px !important;
          overflow: hidden;
          margin: 12px !important;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #3A2A1E !important;
          border: none !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 16px !important;
          font-weight: 300 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #B08060 !important;
          color: white !important;
        }
        .leaflet-control-zoom-in {
          border-bottom: 1px solid rgba(176,128,96,0.12) !important;
        }
        .leaflet-control-attribution {
          font-size: 9px !important;
          border-radius: 6px 0 0 0 !important;
        }
      `}</style>
    </section>
  )
}
