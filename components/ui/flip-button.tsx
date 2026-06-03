"use client"

import { motion } from "framer-motion"

export function FlipButton({
  text1,
  text2,
  isFlipped,
  onToggle,
}: {
  text1: string
  text2: string
  isFlipped: boolean
  onToggle: () => void
}) {
  const flipVariants = {
    closed: {
      rotateX: 0,
      backgroundColor: "#B08060",
      color: "#ffffff",
    },
    open: {
      rotateX: 180,
      backgroundColor: "#F5F0EB",
      color: "#3A2A1E",
    },
  }

  return (
    <motion.button
      className="cursor-pointer px-7 py-3 text-sm font-medium tracking-wide"
      style={{ borderRadius: 999, perspective: 600 }}
      onClick={onToggle}
      animate={isFlipped ? "open" : "closed"}
      variants={flipVariants}
      transition={{ duration: 0.6, type: "spring" }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ display: "inline-block" }}
      >
        {isFlipped ? text1 : text2}
      </motion.div>
    </motion.button>
  )
}
