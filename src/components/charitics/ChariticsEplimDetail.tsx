'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { EplimProjectContent } from '@/utilities/getEplimProjectContent'

type ChariticsEplimDetailProps = {
  content: EplimProjectContent
  visualClass?: string
}

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}

function stepNum(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function ChariticsEplimDetail({
  content,
  visualClass = 'epl-project-card-visual--eplim',
}: ChariticsEplimDetailProps) {
  const {
    hero,
    aboutEyebrow,
    aboutTitle,
    aboutImage,
    capacityBuilding,
    whyItMatters,
    impact,
  } = content
  const reduceMotion = useReducedMotion()
  const primaryHero = hero.images[0]
  const overviewParagraphs = hero.description.split('\n\n').filter(Boolean)

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#0f1630]">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="absolute inset-0 bg-cover bg-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${primaryHero})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="epl-detail-hero__overlay" />

        <motion.div
          animate="show"
          className="epl-detail-hero__content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-20 lg:py-28 w-full"
          initial={reduceMotion ? false : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className="max-w-3xl">
            <motion.div className="flex items-center gap-3 mb-6" variants={fadeUp}>
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#F4BD12] text-[11px] font-black tracking-[0.28em] uppercase">
                {hero.eyebrow}
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6"
              variants={fadeUp}
            >
              {hero.title}
            </motion.h1>
            <motion.p
              className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
              variants={fadeUp}
            >
              {hero.lead}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                className="inline-block bg-[#F4BD12] text-black font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer shadow-lg rounded-none"
                href={hero.ctaHref}
              >
                {hero.ctaLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <MotionReveal as="section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full border border-gray-200 shadow-lg rounded-none overflow-hidden">
                <ProjectDetailImage
                  alt="EPLIM Maritime Vessel"
                  className="w-full h-full object-cover rounded-none"
                  fallbackClass={`epl-project-card-visual ${visualClass}`}
                  src={aboutImage}
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[11px] font-black tracking-[0.28em] uppercase">
                  {aboutEyebrow}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
                {aboutTitle}
              </h2>
              {overviewParagraphs.map((paragraph, idx) => (
                <p
                  className={`text-sm md:text-base leading-relaxed ${idx === 0 ? 'text-gray-600 mb-4' : 'text-gray-500'}`}
                  key={idx}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 overflow-hidden border border-gray-200 shadow-md rounded-none">
            <div className="lg:col-span-6 bg-[#4150A3] text-white p-8 sm:p-12 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[11px] font-black tracking-[0.28em] uppercase">
                  {capacityBuilding.eyebrow}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                {capacityBuilding.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {capacityBuilding.description}
              </p>
            </div>

            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px]">
              <ProjectDetailImage
                alt="Capacity Building Maritime"
                className="w-full h-full object-cover rounded-none"
                fallbackClass={`epl-project-card-visual ${visualClass}`}
                src={capacityBuilding.image}
              />
            </div>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-[2px] bg-[#F4BD12]" />
            <span className="text-[#F4BD12] text-[11px] font-black tracking-[0.28em] uppercase">
              {whyItMatters.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 leading-tight">
            {whyItMatters.title}
          </h2>

          <MotionReveal className="grid md:grid-cols-3 gap-8" stagger>
            {whyItMatters.items.map((item, i) => (
              <MotionItem key={`${item.title}-${i}`}>
                <div className="bg-gray-50/80 border border-gray-200/80 p-8 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all rounded-none shadow-sm">
                  <div>
                    <div className="text-3xl font-black text-[#4150A3] mb-4">{stepNum(i)}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="bg-[#0f1630] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full border border-white/10 shadow-xl rounded-none overflow-hidden">
                <ProjectDetailImage
                  alt="Ocean Maritime Impact"
                  className="w-full h-full object-cover rounded-none"
                  fallbackClass={`epl-project-card-visual ${visualClass}`}
                  src={impact.image}
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[11px] font-black tracking-[0.28em] uppercase">
                  {impact.eyebrow}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                {impact.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
                {impact.description}
              </p>
              <div>
                <Link
                  className="inline-block bg-[#F4BD12] text-black font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer rounded-none shadow-md"
                  href={impact.ctaHref}
                >
                  {impact.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
