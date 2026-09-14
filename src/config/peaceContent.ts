import { EPL_MEDIA } from '@/config/eplMedia'

/** Defaults for the live P.E.A.C.E. detail page (Hero + About + model highlight). */
export const peaceContent = {
  hero: {
    eyebrow: 'Civic Security & Peacebuilding',
    title: 'P.E.A.C.E. Fellowship Project',
    lead:
      '**Professionals Engaged Against Conflict & Endangerment** — equipping security services and local government leaders in Northern Ghana for lasting peace.',
    images: [
      `${EPL_MEDIA}/2025/10/20240830135443__MG_7840-1024x683.jpg`,
      `${EPL_MEDIA}/2025/10/Meeting-with-Deputy-Regional-Commander-2-1024x768.jpeg`,
    ],
    ctaLabel: 'Partner on P.E.A.C.E',
    ctaHref: '/partner-with-us',
  },
  aboutEyebrow: 'Supported by the U.S. Embassy in Ghana',
  aboutTitle: 'Strengthening Civilian-Security Relations in At-Risk Communities',
  aboutParagraphs: [
    'The P.E.A.C.E Fellows Project is a 12-month initiative that engages and trains **100 public sector and security professionals** via online symposiums in early warning, conflict de-escalation, and situational leadership.',
    'From the broader cohort, **25 high-performing entry-level professionals** (at least 50% women) working in the Ministry of Defense, Ministry of Interior, Ministry of Local Government, and border agencies are selected for practical in-person human security training.',
  ],
  modelHighlight: {
    eyebrow: 'Model Highlights',
    title: 'Each-One-To-Reach-Five',
    body: 'To scale reach across municipalities in Northern Ghana, P.E.A.C.E Fellows adopt a cascading peer-training technique where each trained professional mentors five additional local community leaders.',
    agenciesLabel: 'Key Target Agencies:',
    agencies: [
      'Ministry of Interior & Local Defense',
      'Border Security & Immigration Agencies',
      'Municipal Assembly Peace Committees',
    ],
  },
}
