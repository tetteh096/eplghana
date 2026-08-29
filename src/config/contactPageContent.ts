import { EPL_MEDIA } from '@/config/eplMedia'

export const contactPageContent = {
  hero: {
    eyebrow: 'Get In Touch',
    title: 'Contact Us',
    lead:
      'Have questions regarding our Fellowship, institutional partnerships, alumni network, or donations? We would love to hear from you.',
    image: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
  },
  hq: {
    eyebrow: 'Reach Out Directly',
    title: 'EPL Ghana Headquarters',
    locationLabel: 'Office Location',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone / WhatsApp',
    hoursLabel: 'Working Hours:',
    hoursValue: 'Monday – Friday: 8:30 AM – 5:00 PM GMT',
  },
  form: {
    title: 'Send Us a Message',
    intro: 'Fill out the form below and our team will get back to you promptly.',
    submitLabel: 'Submit Inquiry',
    successTitle: 'Thank You for Contacting Us',
    successText:
      'Your message has been successfully received. A member of the EPL Ghana team will respond to your email within 24 to 48 hours.',
    privacyLabel: 'View Our Privacy Note',
    privacyHref: '#',
  },
  map: {
    title: 'Find Us in East Legon',
    embedUrl:
      'https://www.google.com/maps?q=Emerging+Public+Leaders+of+Ghana%2C+No.1+Justice+Sarkodee+Addo+Avenue%2C+East+Legon%2C+Accra%2C+Ghana&hl=en&z=16&output=embed',
    note: 'Parking is available on premises. Please schedule your appointment in advance.',
  },
}

export type ContactDetails = {
  phone: string
  email: string
  address: string
}
