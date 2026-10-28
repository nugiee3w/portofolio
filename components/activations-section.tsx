"use client"

import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  ZoomIn,
  X,
} from "lucide-react"

interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  images: string[]
  badge: string
  category: string
  description: string
  skills: string[]
}

const certifications: Certification[] = [
  {
    id: 1,
    title: "Sertifikat Kompetensi Teknisi Komputer Muda",
    issuer: "BNSP — LSP Politeknik Negeri Banjarmasin",
    date: "26 Juni 2026",
    images: [
      "/certs/sertifikat-kompetensi-teknisi-komputer-muda-bnsp-2026-1.jpg",
      "/certs/sertifikat-kompetensi-teknisi-komputer-muda-bnsp-2026-2.jpg",
    ],
    badge: "IT SUPPORT",
    category: "Sertifikasi Kompetensi",
    description:
      "Kompeten dalam identifikasi perangkat keras dan spesifikasi komputer, perbaikan CPU, konfigurasi BIOS, serta instalasi sistem operasi.",
    skills: ["Computer Hardware", "Troubleshooting", "CPU Repair", "BIOS Configuration", "OS Installation", "IT Support"],
  },
  {
    id: 2,
    title: "Arutala Junior Fullstack Microservices Developer",
    issuer: "ArutalaLab",
    date: "13 September 2025",
    images: [
      "/certs/Arutala-cert1.jpg",
      "/certs/Arutala-cert2.jpg",
      "/certs/Arutala-cert3.jpg",
    ],
    badge: "SOFTWARE DEVELOPMENT",
    category: "Sertifikasi Profesional",
    description:
      "Meraih skor kompetensi 93/100. Mengembangkan aplikasi full-stack menggunakan Laravel, REST API, autentikasi, integrasi database, Docker, dan Docker Compose.",
    skills: ["Laravel", "PHP", "Full-Stack Dev", "REST API", "Microservices", "Docker", "MySQL"],
  },
  {
    id: 3,
    title: "Frontend Programmer — Project Based Learning (PBL)",
    issuer: "Politeknik Negeri Banjarmasin — Teknik Informatika",
    date: "April–Juli 2025",
    images: [
      "/certs/S-PBL-1.jpg",
      "/certs/S-PBL-2.jpg",
    ],
    badge: "PENGHARGAAN AKADEMIK",
    category: "Penghargaan Akademik",
    description:
      "Mengikuti pembelajaran berbasis proyek yang mencakup pemrograman web, administrasi database, dan pemrograman perangkat bergerak.",
    skills: ["Frontend Development", "Web Programming", "Database Administration", "Mobile Development", "Software Development"],
  },
  {
    id: 4,
    title: "Uji Kompetensi Multimedia Desain Grafis",
    issuer: "MAN 2 Kota Banjarmasin & ZenCo Media",
    date: "5 Mei 2023",
    images: [
      "/certs/S-ZencoMedia-DesainGrafis-1.jpg",
      "/certs/S-ZencoMedia-DesainGrafis-2.jpg",
    ],
    badge: "MULTIMEDIA DESIGN",
    category: "Sertifikasi Kompetensi",
    description:
      "Meraih predikat Sangat Kompeten dalam uji kompetensi multimedia desain grafis.",
    skills: ["Graphic Design", "Multimedia Design", "Visual Design", "Image Editing", "Digital Imaging"],
  },
]

// ── Lightbox Modal ────────────────────────────────────────────────────────────
function Lightbox({
  cert,
  initialPage,
  onClose,
}: {
  cert: Certification
  initialPage: number
  onClose: () => void
}) {
  const [page, setPage] = useState(initialPage)
  const total = cert.images.length

  const goPrev = () => setPage((p) => (p - 1 + total) % total)
  const goNext = () => setPage((p) => (p + 1) % total)

  // Keyboard: Esc tutup, arrow navigasi halaman
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [page])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Modal box */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#AFFF00] hover:text-[#121212] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#1a1a20] shadow-2xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={cert.images[page]}
                alt={`${cert.title} — halaman ${page + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 95vw, 768px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev/Next arrows — hanya jika lebih dari 1 halaman */}
          {total > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Halaman sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-[#AFFF00] hover:text-[#121212] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                aria-label="Halaman berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-[#AFFF00] hover:text-[#121212] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Footer info + dots */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
          <p className="font-mono text-xs text-white/50 text-center sm:text-left">
            {cert.title}
          </p>
          {total > 1 && (
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Halaman ${i + 1}`}
                  className="rounded-full transition-all"
                  style={{
                    width: i === page ? 16 : 5,
                    height: 5,
                    backgroundColor: i === page ? "#AFFF00" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          )}
          <span className="font-mono text-[11px] text-white/30">
            {page + 1} / {total}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Mini Card Slider ──────────────────────────────────────────────────────────
function CertCardSlider({
  cert,
  isActive,
  onOpenLightbox,
}: {
  cert: Certification
  isActive: boolean
  onOpenLightbox: (page: number) => void
}) {
  const [page, setPage] = useState(0)
  const total = cert.images.length

  useEffect(() => {
    if (!isActive) setPage(0)
  }, [isActive])

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPage((p) => (p + 1) % total)
  }
  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPage((p) => (p - 1 + total) % total)
  }

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Image */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={cert.images[page]}
            alt={`${cert.title} — halaman ${page + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 210px, (max-width: 768px) 270px, 320px"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dim overlay untuk kartu non-aktif */}
      {!isActive && (
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      )}

      {/* Zoom overlay saat hover — hanya kartu aktif */}
      {isActive && (
        <button
          onClick={(e) => { e.stopPropagation(); onOpenLightbox(page) }}
          aria-label="Lihat sertifikat penuh"
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-200 z-10"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white text-[11px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
            <ZoomIn className="w-3.5 h-3.5" />
            Lihat Sertifikat
          </span>
        </button>
      )}

      {/* Flip controls — hanya kartu aktif dengan >1 halaman */}
      {total > 1 && isActive && (
        <>
          <button
            onClick={goPrev}
            aria-label="Halaman sebelumnya"
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-[#AFFF00] hover:text-[#121212] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Halaman berikutnya"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-[#AFFF00] hover:text-[#121212] transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setPage(i) }}
                aria-label={`Halaman ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width: i === page ? 14 : 5,
                  height: 5,
                  backgroundColor: i === page ? "#AFFF00" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Badge jumlah halaman untuk kartu non-aktif */}
      {total > 1 && !isActive && (
        <div className="absolute bottom-2 right-2 z-20 px-1.5 py-0.5 rounded bg-black/55 text-[10px] font-mono text-white/60">
          {total}p
        </div>
      )}
    </div>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────
export function ActivationsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState<{ certId: number; page: number } | null>(null)
  const [cardSpacing, setCardSpacing] = useState(190) // default SSR-safe (desktop)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const currentCert = certifications[activeIndex]
  const lightboxCert = lightbox ? certifications.find((c) => c.id === lightbox.certId) ?? null : null

  const nextCert = () => setActiveIndex((prev) => (prev + 1) % certifications.length)
  const prevCert = () => setActiveIndex((prev) => (prev - 1 + certifications.length) % certifications.length)

  // Update card spacing setelah mount (client-only) & saat resize
  useEffect(() => {
    const updateSpacing = () => setCardSpacing(window.innerWidth < 640 ? 110 : 190)
    updateSpacing()
    window.addEventListener("resize", updateSpacing)
    return () => window.removeEventListener("resize", updateSpacing)
  }, [])

  // Arrow keys untuk carousel (bukan saat lightbox terbuka)
  useEffect(() => {
    if (lightbox) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevCert()
      else if (e.key === "ArrowRight") nextCert()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightbox])

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && lightboxCert && (
          <Lightbox
            cert={lightboxCert}
            initialPage={lightbox.page}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      <section id="sertifikasi" ref={containerRef} className="relative overflow-hidden bg-[#121212] py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-10 text-center"
          >
            <span className="inline-block font-mono text-xs tracking-widest text-white/60 uppercase font-bold">
              PENCAPAIAN SAYA
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tighter text-white md:text-5xl">
              <span className="text-[#AFFF00]">SERTIFIKASI</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl font-mono text-sm text-white/60">
              Validasi keahlian, kompetensi terverifikasi, dan pembelajaran berkelanjutan saya.
            </p>
          </motion.div>

          {/* 3D Swipe Card Gallery */}
          <div className="relative flex flex-col items-center">

            {/* Cards Stage */}
            <div className="relative flex h-[190px] sm:h-[220px] md:h-[240px] w-full max-w-4xl items-center justify-center overflow-visible">
              {certifications.map((cert, index) => {
                const count = certifications.length
                let offset = (index - activeIndex) % count
                if (offset > count / 2) offset -= count
                if (offset < -count / 2) offset += count

                const isActive = offset === 0
                const isVisible = Math.abs(offset) <= 2

                if (!isVisible) return null

                return (
                  // Wrapper div — menampung perspective & transformStyle agar tidak di-SSR oleh Framer Motion
                  <div
                    key={cert.id}
                    style={{
                      position: "absolute",
                      perspective: "1200px",
                      transformStyle: "preserve-3d",
                      zIndex: 30 - Math.abs(offset) * 10,
                    }}
                  >
                    <motion.div
                      onClick={() => setActiveIndex(index)}
                      className="cursor-pointer select-none"
                      initial={false}
                      animate={{
                        x: offset * cardSpacing,
                        scale: isActive ? 1 : Math.max(0.75, 1 - Math.abs(offset) * 0.15),
                        opacity: isActive ? 1 : Math.max(0.5, 1 - Math.abs(offset) * 0.3),
                        rotateY: offset * -10,
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 26 }}
                    >
                      <div
                        className={`relative w-[210px] sm:w-[270px] md:w-[320px] aspect-[16/10] overflow-hidden rounded-xl shadow-2xl ${
                          isActive ? "ring-1 ring-[#AFFF00]/40" : ""
                        }`}
                      >
                        <CertCardSlider
                          cert={cert}
                          isActive={isActive}
                          onOpenLightbox={(page) => setLightbox({ certId: cert.id, page })}
                        />
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>

            {/* Arrows & Dots */}
            <div className="mt-6 flex items-center justify-center gap-5">
              <button
                onClick={prevCert}
                aria-label="Sertifikat sebelumnya"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-[#AFFF00] hover:text-[#121212] hover:border-[#AFFF00] cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-1.5">
                {certifications.map((cert, idx) => (
                  <button
                    key={cert.id}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Pilih sertifikat ${cert.title}`}
                    className="h-1.5 rounded-full transition-all cursor-pointer"
                    style={{
                      backgroundColor: idx === activeIndex ? "#AFFF00" : "rgba(255,255,255,0.2)",
                      width: idx === activeIndex ? 20 : 6,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextCert}
                aria-label="Sertifikat berikutnya"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-[#AFFF00] hover:text-[#121212] hover:border-[#AFFF00] cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Dynamic Caption */}
            <div className="mt-8 w-full max-w-2xl px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCert.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {/* Category badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#AFFF00]/10 text-[#AFFF00] border border-[#AFFF00]/20">
                    {currentCert.category}
                  </span>

                  {/* Title & Metadata */}
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
                      {currentCert.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-white/55">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                        <span>{currentCert.issuer}</span>
                      </div>
                      <span className="text-white/20">•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-white/40 shrink-0" />
                        <span>{currentCert.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-white/70">
                    {currentCert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-white/35 mr-1">Keahlian:</span>
                    {currentCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 text-white/75 border border-white/10"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#AFFF00]/60" />
                        {skill}
                      </span>
                    ))}
                  </div>


                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
