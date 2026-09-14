"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const certifications = [
  {
    title: "React Native Developer",
    issuer: "Dicoding / Coursera",
    date: "Desember 2025",
    image: "/placeholder.jpg",
  },
  {
    title: "PHP with Laravel",
    issuer: "Dicoding / Laravel",
    date: "November 2025",
    image: "/placeholder.jpg",
  },
  {
    title: "Microsoft Office Specialist",
    issuer: "Microsoft / Coursera",
    date: "Oktober 2025",
    image: "/placeholder.jpg",
  },
  {
    title: "Graphic Design Fundamentals",
    issuer: "Canva / Coursera",
    date: "September 2025",
    image: "/placeholder.jpg",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

export function ActivationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative overflow-hidden bg-[#121212] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-10 text-center"
        >
          <motion.span
            className="inline-block font-mono text-xs tracking-widest text-white/60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            PENCAPAIAN SAYA
          </motion.span>
          <h2 className="mt-2 overflow-hidden text-3xl font-black tracking-tighter text-white md:text-5xl">
            <span className="inline-block text-[#AFFF00]">
              SERTIFIKASI
            </span>
          </h2>
          <motion.p
            className="mx-auto mt-2 max-w-xl font-mono text-sm text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Validasi keahlian dan pembelajaran berkelanjutan saya.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {certifications.map((certification) => (
            <motion.article
              key={certification.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-[#1a1a1a] transition-colors duration-300 hover:border-[#AFFF00]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-white/10">
                <Image
                  src={certification.image}
                  alt={`Placeholder sertifikat ${certification.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#121212]/35">
                  <span className="border border-[#AFFF00]/60 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#AFFF00]">
                    SERTIFIKAT
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-lg font-black tracking-tight text-white">{certification.title}</h3>
                <p className="font-mono text-sm text-white/60">{certification.issuer}</p>
                <p className="font-mono text-xs tracking-wide text-[#AFFF00]">{certification.date}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
