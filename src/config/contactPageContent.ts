import { EPL_MEDIA } from '@/config/eplMedia'

export const contactPageContent = {
  hero: {
    eyebrow: 'Contact Us',
    title: 'We’re here to connect',
    lead: 'Reach the EPL Ghana team for programme enquiries, media requests, partnership conversations, or general questions about our work strengthening public leadership across Ghana.',
    image: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
    quickLinks: [
      { label: 'General Enquiry', href: '#general-enquiry' },
      { label: 'Partnership', href: '#partnership' },
    ],
  },
  visit: {
    eyebrow: 'Visit us',
    title: 'East Legon, Accra',
    description:
      'We welcome partners, fellows, and visitors by appointment. Reach out to schedule a conversation with our team at our East Legon office.',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.789876543210!2d-0.1575!3d5.6350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zEast%20Legon%2C%20Accra!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh',
  formsSection: {
    eyebrow: 'Get in touch',
    title: 'Send us a message',
    intro: 'Choose the form that best fits your enquiry. Our team typically responds within two business days.',
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
