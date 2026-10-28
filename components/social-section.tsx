"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { ImageIcon } from "lucide-react"

const collegeMoments = [
  { id: 1, image: "" },
  { id: 2, image: "" },
  { id: 3, image: "" },
  { id: 4, image: "" },
  { id: 5, image: "" },
  { id: 6, image: "" },
  { id: 7, image: "" },
  { id: 8, image: "" },
  { id: 9, image: "" },
  { id: 10, image: "" },
]

export function SocialSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)

  // Drag to scroll dengan mouse (desktop) & touch swipe (mobile)
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    setIsDragging(true)
    setStartX(e.pageX - el.offsetLeft)
    setScrollLeftState(el.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const el = containerRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX) * 1.5
    el.scrollLeft = scrollLeftState - walk
  }

  return (
    <section id="creators" className="relative py-16 bg-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center"
        >
          <motion.span
            className="font-mono text-[#AFFF00] text-xs tracking-widest inline-block"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            DOKUMENTASI & KENANGAN
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mt-2">
            <span className="inline-block">COLLEGE&nbsp;</span>
            <span className="text-[#AFFF00] inline-block">MOMENT</span>
          </h2>
        </motion.div>
      </div>

      {/* Geser Horizontal Foto */}
      <div className="relative w-full">
        {/* Gradient fade tepi kiri & kanan */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#121212] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#121212] to-transparent z-10" />

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-4 overflow-x-auto no-scrollbar px-6 md:px-12 py-2 select-none ${
            isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {collegeMoments.map((item) => (
            <motion.div
              key={item.id}
              className="relative w-40 h-40 md:w-48 md:h-48 aspect-square rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#AFFF00]/50 transition-all duration-300 flex items-center justify-center overflow-hidden flex-shrink-0 group"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
            >
              {/* Glow halus saat hover */}
              <div className="absolute inset-0 bg-[#AFFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Placeholder Foto Bersih (Siap diisi <img> / <Image>) */}
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#AFFF00] group-hover:border-[#AFFF00]/30 transition-all duration-300">
                <ImageIcon className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
