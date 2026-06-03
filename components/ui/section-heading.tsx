"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function SectionHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={
          isInView
            ? { clipPath: "inset(0 0 0% 0)" }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
