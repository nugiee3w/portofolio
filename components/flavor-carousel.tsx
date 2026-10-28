"use client"

import type React from "react"

import { motion, AnimatePresence, useSpring, type Variants } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { ChevronLeft, ChevronRight, X, ExternalLink, CheckCircle2, Users, Briefcase } from "lucide-react"

interface ProjectDetail {
  fullName: string
  category: string
  role: string
  period?: string
  teamContext: string
  overview: string
  features: string[]
  techStack: string[]
  githubUrl?: string
}

interface Flavor {
  id: number
  name: string
  tagline: string
  description: string
  image: string
  bgColor: string
  accentColor: string
  stack: string[]
  githubUrl?: string
  details: ProjectDetail
}

const flavors: Flavor[] = [
  {
    id: 1,
    name: "Kayuh Bersama",
    tagline: "PHP · Laravel · n8n · Gemini AI",
    description: "Sistem Informasi Pelaporan Kinerja Kota Banjarmasin untuk pengelolaan perencanaan dan pelaporan terstruktur dengan analisis dokumen PDF berbasis AI.",
    image: "/images/project-kayuh-bersama.svg",
    bgColor: "from-[#AFFF00]/20 via-[#AFFF00]/5 to-transparent",
    accentColor: "#AFFF00",
    stack: ["PHP", "Laravel", "MySQL", "Bootstrap", "n8n", "Google Gemini"],
    details: {
      fullName: "Sistem Informasi Pelaporan Kinerja Kota Banjarmasin",
      category: "Tugas Akhir — Proyek Kelompok",
      role: "Pengembang Web & Integrasi Sistem",
      teamContext: "Dikembangkan secara kolaboratif dalam tim tugas akhir untuk Pemerintah Kota Banjarmasin.",
      overview: "Aplikasi web yang dirancang untuk membantu pengelolaan perencanaan dan pelaporan kinerja Pemerintah Kota Banjarmasin secara terstruktur. Sistem ini mengintegrasikan otomasi workflow n8n dan Google Gemini AI untuk menganalisis dokumen laporan PDF secara cerdas dan otomatis.",
      features: [
        "Pengelolaan Pohon Kinerja Kota dan integrasi cascading sasaran strategis.",
        "Pengelolaan RPJMD, Renstra, dan Indikator Kinerja Utama (IKU).",
        "Unggah dan analisis dokumen PDF secara otomatis menggunakan n8n dan Google Gemini AI.",
        "Pengelolaan hak akses pengguna berdasarkan peran (Role-Based Access Control).",
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Bootstrap", "n8n", "Google Gemini AI"],
    },
  },
  {
    id: 2,
    name: "SIREDI",
    tagline: "Next.js · TypeScript · Supabase",
    description: "Sistem Reservasi Dinas Pendidikan dan Informasi untuk mendukung reservasi layanan online dan akses informasi pendidikan bagi masyarakat.",
    image: "/images/project-siredi.svg",
    bgColor: "from-[#AFFF00]/20 via-[#AFFF00]/5 to-transparent",
    accentColor: "#AFFF00",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL"],
    details: {
      fullName: "Sistem Reservasi Dinas Pendidikan dan Informasi",
      category: "Proyek Magang — Dinas Pendidikan Kota Banjarmasin",
      role: "Fullstack Web Developer Intern",
      teamContext: "Dikembangkan bersama tim mahasiswa magang selama kegiatan magang di Dinas Pendidikan Kota Banjarmasin.",
      overview: "Aplikasi web modern yang dikembangkan selama kegiatan magang untuk mendukung proses reservasi layanan secara online bagi warga masyarakat serta mempermudah akses informasi publik seputar direktori sekolah dan agenda kegiatan pendidikan.",
      features: [
        "Reservasi layanan dinas secara online dengan pemilihan tanggal dan slot waktu interaktif.",
        "Pelacakan dan pengelolaan status reservasi secara real-time.",
        "Direktori sekolah lengkap se-Kota Banjarmasin beserta jenjang dan akreditasi.",
        "Pusat informasi berita dan agenda resmi dinas pendidikan.",
        "Dashboard admin terpadu untuk verifikasi berkas dan pengelolaan data pemohon.",
      ],
      techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL"],
    },
  },
  {
    id: 3,
    name: "SIMPADU",
    tagline: "Frontend Development · Sistem Informasi Akademik",
    description: "Sistem informasi akademik terpadu yang mencakup pengelolaan data mahasiswa, KRS, KHS, kelas, mata kuliah, dan presensi perkuliahan.",
    image: "/images/project-simpadu.svg",
    bgColor: "from-[#AFFF00]/20 via-[#AFFF00]/5 to-transparent",
    accentColor: "#AFFF00",
    stack: ["Frontend", "UI Design", "Akademik", "PBL Kelompok"],
    githubUrl: "https://github.com/MRizkyaxioo/simpadu-kel3",
    details: {
      fullName: "SIMPADU (Sistem Informasi Terpadu)",
      category: "Project Based Learning (PBL) — Proyek Kelompok",
      role: "Frontend Developer",
      period: "April 2025 – Juli 2025",
      teamContext: "Proyek kelompok Project Based Learning (PBL). Berfokus pada pengembangan antarmuka pengguna (frontend), sedangkan pengembangan database dan backend dikerjakan oleh anggota tim lainnya.",
      overview: "Sistem informasi akademik terpadu yang dirancang untuk mendukung operasional perkuliahan kampus secara efisien, meliputi pengelolaan rencana studi (KRS), hasil studi (KHS), penjadwalan kelas, mata kuliah, dan presensi mahasiswa.",
      features: [
        "Pengelolaan Kartu Rencana Studi (KRS) dan pemilihan mata kuliah.",
        "Kartu Hasil Studi (KHS) dan pemantauan indeks prestasi mahasiswa.",
        "Sistem presensi perkuliahan mahasiswa dan rekapitulasi kehadiran.",
        "Pengelolaan data master mahasiswa, kelas, dan kurikulum mata kuliah.",
      ],
      techStack: ["Frontend Development", "HTML/CSS/JS", "Responsive UI", "REST API Integration"],
      githubUrl: "https://github.com/MRizkyaxioo/simpadu-kel3",
    },
  },
  {
    id: 4,
    name: "PustakaGo",
    tagline: "UI/UX Design · Figma · Prototyping",
    description: "Konsep antarmuka aplikasi peminjaman dan pengelolaan buku dengan alur pengguna yang intuitif, dirancang menggunakan Figma.",
    image: "/images/project-pustakago.svg",
    bgColor: "from-[#AFFF00]/20 via-[#AFFF00]/5 to-transparent",
    accentColor: "#AFFF00",
    stack: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    details: {
      fullName: "Aplikasi Peminjaman dan Pengelolaan Buku",
      category: "Tugas Kuliah — Proyek Kelompok",
      role: "UI/UX Designer",
      period: "November – Desember 2024",
      teamContext: "Proyek kelompok tugas kuliah. Berfokus pada perancangan antarmuka pengguna (UI/UX) menggunakan Figma, tanpa mengembangkan backend, autentikasi, atau database sistem.",
      overview: "PustakaGo merupakan konsep aplikasi peminjaman dan pengelolaan buku perpustakaan. Dalam proyek kelompok ini, fokus kontribusi adalah merancang tata letak antarmuka pengguna yang bersih, wireframe, user flow peminjaman buku, dan prototype interaktif di Figma.",
      features: [
        "Perancangan alur peminjaman dan pengembalian buku yang intuitif.",
        "Desain katalog buku digital lengkap dengan kategori dan status ketersediaan.",
        "Wireframing dan eksplorasi tata letak antarmuka mobile & web.",
        "Pembuatan komponen UI dan prototipe interaktif di Figma.",
      ],
      techStack: ["Figma", "UI/UX Design", "User Flow", "Design System"],
    },
  },
]

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -15 : 15,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  }),
}

export function FlavorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])
  const [selectedProject, setSelectedProject] = useState<Flavor | null>(null)
  const currentFlavor = flavors[currentIndex]

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(x * 5)
    rotateX.set(-y * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + flavors.length) % flavors.length
    setCurrentIndex(newIndex)
    setPage([page + newDirection, newDirection])
  }

  const nextFlavor = () => paginate(1)
  const prevFlavor = () => paginate(-1)
  const lenis = useLenis()

  // Kunci scroll halaman utama dan hentikan Lenis saat modal detail proyek terbuka
  useEffect(() => {
    if (selectedProject) {
      lenis?.stop()
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        lenis?.start()
        document.body.style.overflow = originalOverflow
      }
    } else {
      lenis?.start()
    }
  }, [selectedProject, lenis])

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === "Escape") {
          setSelectedProject(null)
        }
        return
      }
      if (e.key === "ArrowLeft") {
        prevFlavor()
      } else if (e.key === "ArrowRight") {
        nextFlavor()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, page, selectedProject])

  return (
    <section id="flavours" className="relative py-16 bg-white overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentFlavor.bgColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        key={currentFlavor.id}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="font-mono text-[#121212]/60 text-xs tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            KARYA PILIHAN
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-[#121212] tracking-tighter mt-2 overflow-hidden">
            <span className="inline-block">PROYEK&nbsp;</span>
            <span className="inline-block" style={{ color: currentFlavor.accentColor }}>
              SAYA
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={prevFlavor}
              aria-label="Proyek sebelumnya"
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentFlavor.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full max-w-3xl"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#121212]/10 shadow-xl"
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <motion.div
                      className="relative aspect-[3/4] flex items-center justify-center rounded-2xl overflow-hidden bg-[#121212]/5 border border-[#121212]/10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={currentFlavor.image}
                        alt={`Mockup sistem ${currentFlavor.name}`}
                        fill
                        className="object-contain p-2"
                      />
                    </motion.div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#121212]/5 text-[#121212]/70">
                            {currentFlavor.details.category.split("—")[0].trim()}
                          </span>
                        </div>
                        <motion.h3
                          className="text-3xl md:text-4xl font-black text-[#121212] tracking-tighter mt-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                        >
                          {currentFlavor.name}
                        </motion.h3>
                        <p className="text-xs text-[#121212]/50 mt-0.5 font-medium">
                          {currentFlavor.details.fullName}
                        </p>
                      </div>

                      <motion.p
                        className="text-sm text-[#121212]/70 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentFlavor.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-1.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentFlavor.stack.map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 bg-[#121212]/5 rounded-full text-xs font-mono text-[#121212]/70"
                          >
                            {badge}
                          </span>
                        ))}
                      </motion.div>

                      <div className="flex flex-wrap items-center gap-3">
                        <motion.button
                          onClick={() => setSelectedProject(currentFlavor)}
                          className="px-6 py-3 rounded-full font-bold text-sm tracking-wide w-full sm:w-auto relative overflow-hidden transition-all shadow-sm hover:shadow-md cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          style={{ backgroundColor: currentFlavor.accentColor, color: "#121212" }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <motion.span
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                          <span className="relative z-10 font-bold">Lihat Detail</span>
                        </motion.button>

                        {currentFlavor.githubUrl && (
                          <motion.a
                            href={currentFlavor.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm tracking-wide border-2 border-[#121212] bg-white text-[#121212] hover:bg-[#121212] hover:text-white transition-colors cursor-pointer w-full sm:w-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <span>GitHub</span>
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={nextFlavor}
              aria-label="Proyek berikutnya"
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex md:hidden justify-center gap-4 mt-6">
            <motion.button
              onClick={prevFlavor}
              aria-label="Proyek sebelumnya"
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={nextFlavor}
              aria-label="Proyek berikutnya"
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {flavors.map((flavor, index) => (
              <motion.button
                key={flavor.id}
                aria-label={`Pilih proyek ${flavor.name}`}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1
                  setCurrentIndex(index)
                  setPage([index, newDirection])
                }}
                className="h-2 rounded-full transition-all cursor-pointer"
                style={{
                  backgroundColor: index === currentIndex ? flavor.accentColor : "#12121220",
                }}
                animate={{
                  width: index === currentIndex ? 28 : 10,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Detail Proyek */}
      <AnimatePresence>
        {selectedProject && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#121212]/80 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl bg-[#18181b] border border-white/15 rounded-3xl p-6 md:p-8 text-white shadow-2xl z-10 max-h-[85vh] overflow-y-auto overscroll-contain no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup detail proyek"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Info */}
              <div className="space-y-2 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider"
                       style={{ backgroundColor: `${selectedProject.accentColor}20`, color: selectedProject.accentColor }}>
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{selectedProject.details.category}</span>
                  </div>
                  {selectedProject.details.period && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-white/70">
                      {selectedProject.details.period}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  {selectedProject.name}
                </h3>
                <p className="text-sm font-medium text-white/70">
                  {selectedProject.details.fullName}
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-xs font-mono text-white/50">Peran:</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-[#AFFF00]">
                    {selectedProject.details.role}
                  </span>
                </div>
              </div>

              {/* Team Context Note */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Users className="w-4 h-4 text-[#AFFF00] shrink-0 mt-0.5" />
                <p className="text-xs text-white/75 font-mono leading-relaxed">
                  {selectedProject.details.teamContext}
                </p>
              </div>

              {/* Overview */}
              <div className="mt-6 space-y-2">
                <h4 className="text-xs font-mono tracking-widest text-[#AFFF00] uppercase font-bold">
                  Ringkasan Proyek
                </h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  {selectedProject.details.overview}
                </p>
              </div>

              {/* Main Features */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-[#AFFF00] uppercase font-bold">
                  Fitur Utama
                </h4>
                <div className="space-y-2">
                  {selectedProject.details.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#AFFF00] shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-white/85 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 space-y-2">
                <h4 className="text-xs font-mono tracking-widest text-white/60 uppercase font-bold">
                  Teknologi yang Digunakan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.details.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Modal */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold border border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#121212] transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <span>Buka Repository GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div />
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full font-mono text-xs font-bold bg-white text-[#121212] hover:bg-[#AFFF00] transition-colors cursor-pointer"
                >
                  Tutup Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

