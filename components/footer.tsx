"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export function Footer() {
  const [sender, setSender] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!sender && !message) {
      window.open("mailto:m.anugrahazmi@gmail.com", "_blank")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6531bed9-527b-4ab0-a9f5-d09a1e093840",
          subject: "Pesan Baru dari Portofolio Web",
          from_name: sender || "Pengunjung Portofolio",
          email: sender.includes("@") ? sender : undefined,
          name: sender,
          message: `Pengirim / Kontak: ${sender}\n\nPesan:\n${message || "Halo, saya tertarik berkolaborasi dengan Anda."}`,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setSubmitStatus("success")
        setSender("")
        setMessage("")
      } else {
        // Jika API key belum dipasang / gagal, fallback buka mailto langsung secara mulus
        const subject = encodeURIComponent("Halo, saya ingin berkolaborasi")
        const body = encodeURIComponent(`Halo Anugrah,\n\nNama/Kontak: ${sender}\n\nPesan:\n${message}\n`)
        window.open(`mailto:m.anugrahazmi@gmail.com?subject=${subject}&body=${body}`, "_blank")
        setSubmitStatus("success")
      }
    } catch {
      // Fallback jika offline atau terhalang adblocker
      const subject = encodeURIComponent("Halo, saya ingin berkolaborasi")
      const body = encodeURIComponent(`Halo Anugrah,\n\nNama/Kontak: ${sender}\n\nPesan:\n${message}\n`)
      window.open(`mailto:m.anugrahazmi@gmail.com?subject=${subject}&body=${body}`, "_blank")
      setSubmitStatus("success")
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerLinks = [
    {
      title: "",
      links: ["GitHub", "LinkedIn"],
    },
    {
      title: "",
      links: ["Instagram", "Email"],
    },
  ]

  return (
    <footer ref={footerRef} id="careers" className="relative bg-[#121212] pt-16 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              HUBUNGI SAYA
            </motion.span>
            <motion.span
              className="block text-[#AFFF00]"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              BERKOLABORASI
            </motion.span>
          </h2>
          <p className="text-white/60 font-mono text-xs max-w-md mx-auto mt-4">
            Punya ide proyek, tawaran kerjasama, atau sekadar ingin menyapa? Kirim pesan langsung di bawah ini.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Nama atau Email Anda..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-all duration-300"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#AFFF00] text-[#121212] px-6 py-3 rounded-xl font-bold text-sm tracking-wide whitespace-nowrap relative overflow-hidden flex items-center justify-center disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10">
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </span>
              </motion.button>
            </div>

            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Tulis pesan atau topik yang ingin didiskusikan..."
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-all duration-300 resize-none"
              />
            </div>

            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#AFFF00] font-mono text-xs text-center"
              >
                ✓ Pesan siap dikirim / terkirim! Terima kasih telah menghubungi.
              </motion.p>
            )}
          </form>

          <p className="text-white/40 font-mono text-xs mt-3 text-center">
            Atau hubungi langsung melalui{" "}
            <a
              href="mailto:m.anugrahazmi@gmail.com"
              className="text-[#AFFF00] hover:underline"
            >
              m.anugrahazmi@gmail.com
            </a>
          </p>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/60 font-mono text-xs max-w-xl mx-auto leading-relaxed">

          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center text-right gap-x-8 gap-y-2 py-8 border-t border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {footerLinks.map((section, sectionIndex) => (
            <motion.div key={`${section.title}-${sectionIndex}`} variants={itemVariants}>
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
                {section.links.map((item) => (
                  <li key={item}>
                    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                      <Link
                        href={
                          item === "Email"
                            ? "mailto:m.anugrahazmi@gmail.com"
                            : item === "GitHub"
                            ? "https://github.com/nugiee3w"
                            : item === "LinkedIn"
                            ? "https://linkedin.com/in/m-anugrah"
                            : item === "Instagram"
                            ? "https://www.instagram.com/nugi.ja"
                            : "#"
                        }
                        target={item !== "Email" ? "_blank" : undefined}
                        rel={item !== "Email" ? "noopener noreferrer" : undefined}
                        className="text-white/60 hover:text-[#AFFF00] font-mono text-xs transition-colors inline-block"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-xl font-black">
              <span className="text-white">Anugrah&nbsp;</span>
              <span className="text-[#AFFF00]">Azmi</span>
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-white/40 font-mono text-xs text-center md:text-right">
            <p>© 2026 Anugrah Azmi</p>
            <span className="hidden md:inline text-white/20">•</span>
            <p className="text-[11px] text-white/30">
              Template inspired by{" "}
              <a
                href="https://v0-gigi-energy-drink-landing-page.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#AFFF00] underline underline-offset-2 transition-colors"
              >
                Gigi Landing Page
              </a>{" "}
              by{" "}
              <a
                href="https://v0.app/@rajoninternet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AFFF00]/80 hover:text-[#AFFF00] underline underline-offset-2 transition-colors"
              >
                @rajoninternet
              </a>{" "}
              on Vercel
            </p>
          </div>

        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[30rem] font-black text-white/[0.02] pointer-events-none select-none leading-none"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        AZMI
      </motion.div>
    </footer>
  )
}
