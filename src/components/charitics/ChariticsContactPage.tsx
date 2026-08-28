'use client'

import { ChariticsContactForm } from '@/components/charitics/ChariticsContactForm'
import {
  contactPageContent,
  type ContactDetails,
} from '@/config/contactPageContent'
import type { ContactPageContent } from '@/utilities/getContactContent'

type ChariticsContactPageProps = {
  contact: ContactDetails
  content?: ContactPageContent
}

export function ChariticsContactPage({
  contact,
  content = contactPageContent,
}: ChariticsContactPageProps) {
  const { hero, hub, channels, visit, mapEmbedUrl, formsSection, forms } = content
  const phoneHref = contact.phone.replace(/\s/g, '')

  return (
    <div className="bg-white font-sans text-gray-900">
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-[#0f1630]">
        {hero.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
        ) : null}
        <div className="epl-detail-hero__overlay" />

        <div className="epl-detail-hero__content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-20 lg:py-24 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-[2px] bg-[#F4BD12]" />
                <span className="text-[#F4BD12] text-[11px] font-black tracking-[0.28em] uppercase">
                  {hero.eyebrow}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                {hero.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                {hero.lead}
              </p>
              <div className="flex flex-wrap gap-4">
                {hero.quickLinks.map((link, index) => (
                  <a
                    key={link.href}
                    className={
                      index === 0
                        ? 'inline-block bg-[#F4BD12] text-black font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white transition-colors cursor-pointer rounded-none shadow-lg'
                        : 'inline-block border border-white/30 text-white font-black text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-colors cursor-pointer rounded-none'
                    }
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/15 p-8 rounded-none shadow-xl">
              <div className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase mb-4">
                {hub.eyebrow}
              </div>
              <div className="space-y-5 text-white/90 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    <strong>{hub.responseLabel}:</strong> {hub.responseValue}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F4BD12]" />
                  <span>
                    <strong>{hub.hoursLabel}:</strong> {hub.hoursValue}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>
                    <strong>{hub.hqLabel}:</strong> {hub.hqValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50/60 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              className="group bg-[#0f1630] text-white p-8 flex flex-col justify-between hover:bg-[#4150A3] transition-all rounded-none shadow-md border-l-4 border-[#F4BD12]"
              href={`tel:${phoneHref}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase">
                    {channels.phone.eyebrow}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{channels.phone.title}</h3>
                <p className="text-[#F4BD12] font-mono text-base font-bold mb-4">{contact.phone}</p>
                <p className="text-white/70 text-xs leading-relaxed">{channels.phone.text}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-black text-[#F4BD12] uppercase tracking-wider group-hover:text-white">
                <span>{channels.phone.ctaLabel}</span>
              </div>
            </a>

            <a
              className="group bg-[#0f1630] text-white p-8 flex flex-col justify-between hover:bg-[#4150A3] transition-all rounded-none shadow-md border-l-4 border-[#F4BD12]"
              href={`mailto:${contact.email}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase">
                    {channels.email.eyebrow}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{channels.email.title}</h3>
                <p className="text-[#F4BD12] font-mono text-base font-bold mb-4 break-all">
                  {contact.email}
                </p>
                <p className="text-white/70 text-xs leading-relaxed">{channels.email.text}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-black text-[#F4BD12] uppercase tracking-wider group-hover:text-white">
                <span>{channels.email.ctaLabel}</span>
              </div>
            </a>

            <a
              className="group bg-[#0f1630] text-white p-8 flex flex-col justify-between hover:bg-[#4150A3] transition-all rounded-none shadow-md border-l-4 border-[#F4BD12]"
              href="#visit"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase">
                    {channels.visit.eyebrow}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{channels.visit.title}</h3>
                <p className="text-white/90 text-xs font-semibold mb-4 leading-snug">
                  {contact.address}
                </p>
                <p className="text-white/70 text-xs leading-relaxed">{channels.visit.text}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-black text-[#F4BD12] uppercase tracking-wider group-hover:text-white">
                <span>{channels.visit.ctaLabel}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" id="visit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-5 bg-[#4150A3] text-white p-8 sm:p-12 flex flex-col justify-between rounded-none shadow-lg">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-[2px] bg-[#F4BD12]" />
                  <span className="text-[#F4BD12] text-[10px] font-black tracking-[0.25em] uppercase">
                    {visit.eyebrow}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                  {visit.title}
                </h2>
                <p className="text-white/90 text-sm leading-relaxed mb-8">{visit.description}</p>

                <div className="bg-[#0f1630] p-6 border border-white/10 space-y-4 rounded-none">
                  <div>
                    <span className="text-[#F4BD12] text-[9px] font-black tracking-widest uppercase block mb-1">
                      {visit.addressLabel}
                    </span>
                    <strong className="text-white text-xs sm:text-sm font-bold block leading-relaxed">
                      {contact.address}
                    </strong>
                  </div>

                  <div className="w-full h-[1px] bg-white/10" />

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-white/50 text-[9px] uppercase tracking-wider block">
                        {visit.phoneLabel}
                      </span>
                      <a
                        className="text-[#F4BD12] font-mono font-bold hover:underline"
                        href={`tel:${phoneHref}`}
                      >
                        {contact.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-white/50 text-[9px] uppercase tracking-wider block">
                        {visit.emailLabel}
                      </span>
                      <a
                        className="text-[#F4BD12] font-mono font-bold hover:underline"
                        href={`mailto:${contact.email}`}
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/20 text-xs text-white/80">
                <strong>Visiting Note:</strong> {visit.note}
              </div>
            </div>

            <div className="lg:col-span-7 bg-gray-100 border-2 border-gray-200 rounded-none overflow-hidden min-h-[420px] shadow-sm">
              <iframe
                allowFullScreen
                className="w-full h-full min-h-[420px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
                title="EPL Ghana office location"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
              <span className="text-[#4150A3] text-[10px] font-black tracking-[0.25em] uppercase">
                {formsSection.eyebrow}
              </span>
              <div className="w-9 h-[2px] bg-[#F4BD12]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {formsSection.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {formsSection.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div
              className="border border-gray-200 p-8 sm:p-10 bg-white rounded-none shadow-md"
              id="general-enquiry"
            >
              <div className="mb-6 pb-6 border-b border-gray-100">
                <span className="text-[#4150A3] text-[10px] font-black tracking-widest uppercase block">
                  {forms.general.eyebrow}
                </span>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">
                  {forms.general.title}
                </h3>
              </div>

              <ChariticsContactForm
                description={forms.general.description}
                formId="general"
                sourcePage="Contact page — Internship & volunteering"
                sourcePath="/contact"
                submitLabel={forms.general.submitLabel}
                tone="light"
                variant="general"
              />
            </div>

            <div
              className="border border-[#0f1630] p-8 sm:p-10 bg-[#0f1630] text-white rounded-none shadow-xl"
              id="partnership"
            >
              <div className="mb-6 pb-6 border-b border-white/15">
                <span className="text-[#F4BD12] text-[10px] font-black tracking-widest uppercase block">
                  {forms.partnership.eyebrow}
                </span>
                <h3 className="text-2xl font-black text-white leading-tight">
                  {forms.partnership.title}
                </h3>
              </div>

              <ChariticsContactForm
                description={forms.partnership.description}
                formId="partnership"
                sourcePage="Contact page — Partnership"
                sourcePath="/contact"
                submitLabel={forms.partnership.submitLabel}
                variant="partnership"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
