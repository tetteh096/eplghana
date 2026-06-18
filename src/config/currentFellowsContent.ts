export type CurrentFellow = {
  id: string
  name: string
  institution: string
  photo: string
  bio?: string
  highlightTitle?: string
  featuredOnPage?: boolean
  email?: string
  phone?: string
  linkedin?: string
  twitter?: string
}

export const currentFellowsPageContent = {
  hero: {
    eyebrow: 'EPL Fellows',
    title: 'Current Public Service Fellows',
    lead:
      'The Public Service Fellowship brings together exceptional young Ghanaians who are redefining leadership in public service. Our current fellows are serving in key government institutions, driving innovation, integrity, and impact across the nation.',
    image: 'https://eplghana.org/wp-content/uploads/2025/10/CSOE-45-scaled.jpg',
    secondaryImage: 'https://eplghana.org/wp-content/uploads/2025/10/CSOE-48-1024x683.jpg',
  },
  highlights: [
    {
      name: 'Rashida Sibawei',
      institution: 'Ministry of Energy',
      title: 'Youth in Energy Summit',
      body:
        'Heralded as a dynamic force in sustainable development, Miss Rashida Sibawei has been selected as a featured speaker at the highly anticipated Youth in Energy Summit. Her session will delve into the core of next-generation energy transition, offering not just insights, but actionable blueprints for policy and implementation.',
      photo: 'https://eplghana.org/wp-content/uploads/2025/10/CSP12-683x1024.jpeg',
    },
    {
      name: 'Linda Dassah',
      institution: 'NCCE',
      title: 'Youth Sounding Board Ghana',
      body:
        'Linda Dassah is a founding member of the Youth Sounding Board (YSB) Ghana, where she plays a crucial role in shaping EU-Ghana and Netherlands policy dialogues. Working closely with the European Union in Ghana and the Embassy of the Kingdom of the Netherlands, Linda leverages her position to actively amplify youth voices and drive the agenda for more inclusive, sustainable development across the nation.',
      photo: 'https://eplghana.org/wp-content/uploads/2025/10/CSP20-683x1024.jpeg',
    },
  ],
  cohort: {
    label: 'Cohort VII Fellows',
    count: 42,
  },
  cta: {
    title: 'Create Your Journey',
    body: 'Learn more about the Public Service Fellowship and join the next cohort of leaders transforming governance.',
    ctaLabel: 'Learn More',
    ctaHref: '/projects/public-service-fellowship',
    image: 'https://eplghana.org/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-27-at-10.19.41-AM-e1761750334208.jpeg',
  },
  fellows: [
  {
    id: "cohort-vii-1",
    name: "Napare Mohammed",
    institution: "GES, STEM Office",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP129-scaled.jpeg"
  },
  {
    id: "cohort-vii-2",
    name: "Priscilla Elorm",
    institution: "Ministry of Health",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP96-1-scaled.jpeg"
  },
  {
    id: "cohort-vii-3",
    name: "Elsie Naa Adjeley",
    institution: "Ministry of Finance",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP4-683x1024.jpeg"
  },
  {
    id: "cohort-vii-4",
    name: "Rashida Sibawei",
    institution: "Ministry of Energy",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP12-683x1024.jpeg"
  },
  {
    id: "cohort-vii-5",
    name: "Abigail Asiedu",
    institution: "GES, STEM Office",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP8-683x1024.jpeg"
  },
  {
    id: "cohort-vii-6",
    name: "Truelove K. Boateng",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP16-683x1024.jpeg"
  },
  {
    id: "cohort-vii-7",
    name: "Mawulolo Anane",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP25-1-683x1024.jpeg"
  },
  {
    id: "cohort-vii-8",
    name: "Ruth Bortsie",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP28-683x1024.jpeg"
  },
  {
    id: "cohort-vii-9",
    name: "Andy Kwaku Mensah",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP32-683x1024.jpeg"
  },
  {
    id: "cohort-vii-10",
    name: "Henrietta Gyamfuah",
    institution: "Ministry of Health",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP37-683x1024.jpeg"
  },
  {
    id: "cohort-vii-11",
    name: "Rafia Idi",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP44-683x1024.jpeg"
  },
  {
    id: "cohort-vii-12",
    name: "Thyra Darley Fordjor",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP48-1-683x1024.jpeg"
  },
  {
    id: "cohort-vii-13",
    name: "Maris Amo",
    institution: "NDPC",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP52-scaled.jpeg"
  },
  {
    id: "cohort-vii-14",
    name: "Ubeidat Alhassan",
    institution: "ACEPA",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP57-scaled.jpeg"
  },
  {
    id: "cohort-vii-15",
    name: "Elita Y. Amoroh",
    institution: "GCX",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP61-1-683x1024.jpeg"
  },
  {
    id: "cohort-vii-16",
    name: "Anita Elorm",
    institution: "Office of the Head of Civil Service",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP64-1-683x1024.jpeg"
  },
  {
    id: "cohort-vii-17",
    name: "Abigail A. Asante",
    institution: "Millennium Development Authority",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP73-683x1024.jpeg"
  },
  {
    id: "cohort-vii-18",
    name: "Sandra Opokuah",
    institution: "GES, STEM Office",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP77-683x1024.jpeg"
  },
  {
    id: "cohort-vii-19",
    name: "Paul K. A. Anaman",
    institution: "Lands Commission",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP84-1-683x1024.jpeg"
  },
  {
    id: "cohort-vii-20",
    name: "Macjordan A. Odai",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP80-683x1024.jpeg"
  },
  {
    id: "cohort-vii-21",
    name: "Rebecca Abugri",
    institution: "Pantang General Hospital",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP88-683x1024.jpeg"
  },
  {
    id: "cohort-vii-22",
    name: "Nimatu A. Rahaman",
    institution: "CHRAJ",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP93-683x1024.jpeg"
  },
  {
    id: "cohort-vii-23",
    name: "Rita Dagba",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP100-683x1024.jpeg"
  },
  {
    id: "cohort-vii-24",
    name: "Michelle Y. De Veer",
    institution: "NITA",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP104-683x1024.jpeg"
  },
  {
    id: "cohort-vii-25",
    name: "Mohammed Abukari",
    institution: "Pantang General Hospital",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP108-scaled.jpeg"
  },
  {
    id: "cohort-vii-26",
    name: "Richard Tii Zangine",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP112-scaled.jpeg"
  },
  {
    id: "cohort-vii-27",
    name: "Miriam Agumo",
    institution: "Office of the Head of Civil Service",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP116-683x1024.jpeg"
  },
  {
    id: "cohort-vii-28",
    name: "Lukman Iddrisu",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP120-683x1024.jpeg"
  },
  {
    id: "cohort-vii-29",
    name: "Yusifu Mohammed",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP124-683x1024.jpeg"
  },
  {
    id: "cohort-vii-30",
    name: "Leticia V. Noonoo",
    institution: "NDPC",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP134-683x1024.jpeg"
  },
  {
    id: "cohort-vii-31",
    name: "Abigail K. Nartey",
    institution: "Ministry of Finance",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP138-683x1024.jpeg"
  },
  {
    id: "cohort-vii-32",
    name: "Anna Kpo",
    institution: "CHRAJ",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP142-683x1024.jpeg"
  },
  {
    id: "cohort-vii-33",
    name: "Joyce Ankomah",
    institution: "GES, STEM Unit",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP149-683x1024.jpeg"
  },
  {
    id: "cohort-vii-34",
    name: "Gideon Osei Kofi",
    institution: "GES, STEM Unit",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP152-683x1024.jpeg"
  },
  {
    id: "cohort-vii-35",
    name: "Vanessa Nkrumah",
    institution: "CHRAJ",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP157-683x1024.jpeg"
  },
  {
    id: "cohort-vii-36",
    name: "Sandra Attipoe",
    institution: "GCX",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP160-683x1024.jpeg"
  },
  {
    id: "cohort-vii-37",
    name: "Cecilia Amuzu",
    institution: "Lands Commission",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP166-scaled.jpeg"
  },
  {
    id: "cohort-vii-38",
    name: "Mary Fremah Adu",
    institution: "Ministry of Energy",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP172-scaled.jpeg"
  },
  {
    id: "cohort-vii-39",
    name: "Josephine Babamonwe",
    institution: "CHRAJ",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP176-683x1024.jpeg"
  },
  {
    id: "cohort-vii-40",
    name: "Henry T. M. Tetteh",
    institution: "GCX",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP168-683x1024.jpeg"
  },
  {
    id: "cohort-vii-41",
    name: "Elsie Owusu-Mensah",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP41-1-683x1024.jpeg"
  },
  {
    id: "cohort-vii-42",
    name: "Linda Dassah",
    institution: "NCCE",
    photo: "https://eplghana.org/wp-content/uploads/2025/10/CSP20-683x1024.jpeg"
  }
] as CurrentFellow[],
}
