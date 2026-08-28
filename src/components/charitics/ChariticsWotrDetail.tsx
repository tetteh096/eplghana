'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { WotrProjectContent } from '@/utilities/getWotrProjectContent'

type ChariticsWotrDetailProps = {
  content: WotrProjectContent
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

export function ChariticsWotrDetail({
  content,
  visualClass = 'epl-project-card-visual--women-on-the-rise',
}: ChariticsWotrDetailProps) {
  const {
    hero,
    aboutEyebrow,
    aboutTitle,
    aboutImage,
    whyItMatters,
    impact,
    keySuccess,
    gallery,
    relatedArticles,
    partnerCta,
  } = content
  const reduceMotion = useReducedMotion()
  const primaryHero = hero.images[0]

  return (
    <div className="bg-white min-h-screen">
      <section className="relative min-h-[58vh] flex items-center overflow-hidden bg-[#0f1630]">
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
          className="epl-detail-hero__content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 w-full"
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
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
              variants={fadeUp}
            >
              {hero.title}
            </motion.h1>
            <motion.p
              className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
              variants={fadeUp}
            >
              {hero.lead}
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 items-center" variants={fadeUp}>
              <Link
                className="inline-block bg-[#F4BD12] text-black font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer shadow-lg rounded-none"
                href={hero.ctaHref}
              >
                {hero.ctaLabel}
              </Link>
              <Link
                className="inline-block border border-white/30 text-white font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-colors cursor-pointer rounded-none"
                href={hero.secondaryCtaHref}
              >
                {hero.secondaryCtaLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <MotionReveal as="section" className="bg-[#0f1630] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MotionReveal
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center"
            stagger
          >
            {impact.stats.map((s, i) => (
              <MotionItem className="p-3 border-r last:border-r-0 border-white/5" key={i}>
                <div className="text-2xl sm:text-3xl font-black text-[#F4BD12] mb-1">{s.value}</div>
                <div className="text-white/70 text-[10px] font-bold tracking-wider uppercase leading-tight">
                  {s.label}
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                  {aboutEyebrow}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                {aboutTitle}
              </h2>
              {hero.description.split('\n\n').map((paragraph, idx) => (
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4" key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <div className="aspect-[4/3] bg-gray-100 bg-cover bg-center shadow-md border border-gray-200 overflow-hidden rounded-none">
                <ProjectDetailImage
                  alt="Women On The Rise programme"
                  className="w-full h-full object-cover rounded-none"
                  fallbackClass={`epl-project-card-visual epl-wotr-about-fallback ${visualClass}`}
                  src={aboutImage}
                />
              </div>
            </div>
          </div>

          <MotionReveal className="grid md:grid-cols-3 gap-6" stagger>
            {whyItMatters.items.map((pillar, i) => (
              <MotionItem key={`${pillar.title}-${i}`}>
                <div className="bg-gray-50 border border-gray-200 p-8 h-full flex flex-col justify-between hover:border-[#4150A3] transition-all rounded-none shadow-sm">
                  <div>
                    <div className="text-[#F4BD12] font-black text-xs tracking-widest uppercase mb-2">
                      Pillar 0{i + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-3">
                      {pillar.title.replace(/^Pillar 0\d:\s*/i, '')}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-[2px] bg-[#F4BD12]" />
            <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
              {keySuccess.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">
            {keySuccess.title}
          </h2>

          <MotionReveal className="space-y-16" stagger>
            {keySuccess.stories.map((story, storyIndex) => (
              <MotionItem key={story.title}>
                <div className="bg-white border border-gray-200 p-8 md:p-12 shadow-sm rounded-none">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className={`lg:col-span-7 ${storyIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{story.title}</h3>
                      <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                        {story.paragraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                    <div className={`lg:col-span-5 ${storyIndex % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="relative aspect-[4/3] rounded-none overflow-hidden border border-gray-200 shadow-md">
                        <ProjectDetailImage
                          alt={story.title}
                          className="w-full h-full object-cover rounded-none"
                          fallbackClass={`epl-project-card-visual epl-wotr-story-fallback ${visualClass}`}
                          src={story.images[0]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="epl-wotr-gallery py-16 md:py-24 bg-white border-t border-gray-200"
      >
        <div className="ul-container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-[2px] bg-[#F4BD12]" />
            <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
              {gallery.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">{gallery.title}</h2>

          <MotionReveal className="epl-wotr-gallery-grid" stagger>
            {gallery.items.map((item, index) => (
              <MotionItem
                className={`epl-wotr-gallery-item epl-wotr-gallery-item--${item.layout}`}
                key={`${item.layout}-${index}`}
              >
                <ProjectDetailImage
                  alt=""
                  className="epl-wotr-gallery-img"
                  fallbackClass={`epl-project-card-visual epl-wotr-gallery-fallback ${visualClass}`}
                  src={item.src}
                />
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-[2px] bg-[#F4BD12]" />
            <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
              {relatedArticles.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
            {relatedArticles.title}
          </h2>

          <MotionReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger>
            {relatedArticles.items.map((article) => (
              <MotionItem key={article.title}>
                <Link
                  className="group bg-white border border-gray-200 overflow-hidden hover:border-[#4150A3] transition-all flex flex-col justify-between shadow-sm rounded-none h-full"
                  href={article.href}
                >
                  {article.image ? (
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100 rounded-none">
                      <ProjectDetailImage
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-none"
                        fallbackClass={`epl-project-card-visual epl-wotr-article-fallback ${visualClass}`}
                        src={article.image}
                      />
                    </div>
                  ) : null}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#4150A3] transition-colors line-clamp-3 mb-4">
                      {article.title}
                    </h3>
                    <span className="text-[#4150A3] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                      Read More &rarr;
                    </span>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="bg-[#0f1630] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#4150A3]/30 p-8 md:p-12 border border-white/10 rounded-none flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{partnerCta.title}</h2>
              <p className="text-white/80 text-sm md:text-base max-w-xl">{partnerCta.description}</p>
            </div>
            <Link
              className="inline-block bg-white text-[#4150A3] font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-[#F4BD12] hover:text-black transition-colors cursor-pointer rounded-none shrink-0"
              href={partnerCta.ctaHref}
            >
              {partnerCta.ctaLabel}
            </Link>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
