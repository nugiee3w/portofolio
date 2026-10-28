"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Award, Briefcase, CheckCircle2 } from "lucide-react"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const stats = [
    {
      icon: GraduationCap,
      label: "Pendidikan",
      value: "D3 Teknik Informatika",
      detail: "Politeknik Negeri Banjarmasin",
      accent: "#AFFF00",
    },
    {
      icon: Award,
      label: "IPK",
      value: "3,75 / 4,00",
      accent: "#84cc16",
    },
    {
      icon: Briefcase,
      label: "Pengalaman Magang",
      value: "Dinas Pendidikan",
      detail: "Agustus - November 2025",
      accent: "#00D4FF",
    },
  ]

  const highlights = [
    "Pengembangan Web PHP, Laravel & MySQL",
    "Keterampilan Desain Grafis (Canva & Figma)",
    "Komunikasi & Koordinasi Organisasi Mahasiswa",
  ]

  return (
    <section id="about-me" className="relative py-20 bg-[#121212] overflow-hidden text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#AFFF00]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#84cc16]/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-14"
        >
          <span className="font-mono text-[#AFFF00] text-xs tracking-widest inline-block uppercase">
            BIOGRAFI SINGKAT
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mt-2">
            <span>TENTANG&nbsp;</span>
            <span className="text-[#AFFF00]">SAYA</span>
          </h2>
          <div className="h-[2px] w-12 bg-[#AFFF00] mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* 2-Column Desktop, 1-Column Mobile Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Kolom Kiri: Narasi Utama & Highlight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="lg:col-span-7 flex flex-col justify-between bg-white/[0.03] p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-sm"
          >
            <div className="space-y-6">
              <p className="text-white/85 text-base md:text-lg leading-relaxed">
                Saya merupakan lulusan D3 Teknik Informatika Politeknik Negeri Banjarmasin dengan IPK 3,75/4,00. Saya memiliki pengalaman mengembangkan aplikasi web menggunakan PHP, Laravel, dan MySQL melalui proyek perkuliahan dan tugas akhir, serta pengalaman magang di Dinas Pendidikan Kota Banjarmasin. Selain pengembangan web, saya memiliki keterampilan desain grafis serta pengalaman koordinasi dan komunikasi melalui organisasi mahasiswa. Saya tertarik mengembangkan solusi digital yang fungsional dan bermanfaat sebagai Web Developer.
              </p>

              <div className="pt-2 border-t border-white/10">
                <h4 className="font-mono text-xs text-white/50 tracking-wider uppercase mb-3">
                  Sorotan Utama
                </h4>
                <div className="grid sm:grid-cols-1 gap-2.5">
                  {highlights.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 text-sm text-white/80 font-mono"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#AFFF00] shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>

          {/* Kolom Kanan: 3 Kartu Informasi Singkat */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.12,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 hover:border-[#AFFF00]/50 transition-all duration-300 flex-1 flex flex-col justify-center"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                      style={{ backgroundColor: `${stat.accent}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.accent }} />
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                        {stat.label}
                      </span>
                      <h3 className="text-xl font-black text-white tracking-tight group-hover:text-[#AFFF00] transition-colors">
                        {stat.value}
                      </h3>
                      {stat.detail && (
                        <p className="font-mono text-xs text-white/60">
                          {stat.detail}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-6 right-6 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: stat.accent }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
