import { EPL_MEDIA } from '@/config/eplMedia'

export const contactPageContent = {
  hero: {
    eyebrow: 'Contact Us',
    title: "We're here to connect",
    lead: 'Reach the EPL Ghana team for programme enquiries, media requests, partnership conversations, or general questions about our work strengthening public leadership across Ghana.',
    image: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
    quickLinks: [
      { label: 'General Enquiry', href: '#general-enquiry' },
      { label: 'Partnership Conversation', href: '#partnership' },
    ],
  },
  hub: {
    eyebrow: 'Communication Hub',
    responseLabel: 'Response Time',
    responseValue: 'Within 2 business days',
    hoursLabel: 'Office Hours',
    hoursValue: 'Mon – Fri, 8am – 5pm GMT',
    hqLabel: 'Accra HQ',
    hqValue: 'East Legon, Greater Accra',
  },
  channels: {
    phone: {
      eyebrow: 'Direct Phone',
      title: 'Speak to Our Team',
      text: 'Call our Accra office for urgent inquiries or immediate assistance.',
      ctaLabel: 'Call Now',
    },
    email: {
      eyebrow: 'Email Inbox',
      title: 'Write to Us',
      text: 'Send official correspondence, media requests, or general inquiries.',
      ctaLabel: 'Send Email',
    },
    visit: {
      eyebrow: 'Visit Our Office',
      title: 'Accra Headquarters',
      text: 'Visits by appointment for partners, fellows, and stakeholders.',
      ctaLabel: 'View Map',
    },
  },
  visit: {
    eyebrow: 'Visit us',
    title: 'East Legon, Accra',
    description:
      'We welcome partners, fellows, and visitors by appointment. Reach out to schedule a conversation with our team at our East Legon office.',
    addressLabel: 'Office Address',
    phoneLabel: 'Direct Line',
    emailLabel: 'Official Email',
    note: 'Parking is available on premises. Please schedule your appointment in advance.',
  },
  mapEmbedUrl:
    'https://www.google.com/maps?q=Emerging+Public+Leaders+of+Ghana%2C+No.1+Justice+Sarkodee+Addo+Avenue%2C+East+Legon%2C+Accra%2C+Ghana&hl=en&z=16&output=embed',
  formsSection: {
    eyebrow: 'Get in touch',
    title: 'Send us a message',
    intro:
      'Choose the form that best fits your enquiry. Our team typically responds within two business days.',
  },
  forms: {
    general: {
      eyebrow: 'General enquiry',
      title: 'Questions & programme info',
      description:
        'Questions about our programmes, events, media, or visiting our office. Send us a message and our team will respond.',
      submitLabel: 'Send Message',
    },
    partnership: {
      eyebrow: 'Partnership',
      title: 'Collaborate with EPL Ghana',
      description:
        'Government institutions, development partners, private sector organisations, and civil society. Tell us how you would like to partner or support our mission.',
      submitLabel: 'Submit Partnership Enquiry',
      subjectOptions: [
        { value: 'partnership', label: 'Partnership' },
        { value: 'support', label: 'Support us' },
        { value: 'fellowship', label: 'The Fellowship' },
        { value: 'internship', label: 'Internship or Volunteer' },
      ],
    },
  },
}

export type ContactDetails = {
  phone: string
  email: string
  address: string
}
