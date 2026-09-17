export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  email?: string
  phone?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  group: 'board' | 'team'
}

function teamPortrait(name: string) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0a3d6b&textColor=ffffff&fontSize=38`
}

export const teamPageIntro = {
  eyebrow: 'Our People',
  title: 'Meet the leaders behind EPL Ghana',
  description:
    'Our board provides strategic governance and stewardship. Our team brings the fellowship, partnerships, and programmes to life every day across Ghana’s public service.',
}

export const teamMembers: TeamMember[] = [
  {
    id: 'board-chair',
    group: 'board',
    name: 'Dr. Ama Serwaa',
    role: 'Board Chair',
    bio: 'Dr. Serwaa brings decades of public sector reform experience and guides EPL Ghana’s governance, accountability, and long-term strategy.',
    photo: teamPortrait('Ama Serwaa'),
    email: 'board.chair@eplghana.org',
    linkedin: '#',
  },
  {
    id: 'board-vice',
    group: 'board',
    name: 'Kwesi Mensah',
    role: 'Vice Chair',
    bio: 'Kwesi supports board oversight on partnerships and institutional growth, connecting EPL’s mission with Ghana’s development priorities.',
    photo: teamPortrait('Kwesi Mensah'),
    email: 'board.vice@eplghana.org',
    linkedin: '#',
  },
  {
    id: 'board-secretary',
    group: 'board',
    name: 'Efua Boateng',
    role: 'Board Secretary',
    bio: 'Efua ensures strong governance practices, compliance, and transparent reporting across the organisation’s programmes and operations.',
    photo: teamPortrait('Efua Boateng'),
    email: 'board.secretary@eplghana.org',
  },
  {
    id: 'board-member',
    group: 'board',
    name: 'Nana Yaw Adjei',
    role: 'Board Member',
    bio: 'Nana contributes expertise in civic leadership and youth development, strengthening EPL’s fellowship design and alumni engagement.',
    photo: teamPortrait('Nana Yaw Adjei'),
    linkedin: '#',
  },
  {
    id: 'exec-director',
    group: 'team',
    name: 'Abena Osei',
    role: 'Country Director',
    bio: 'Abena leads EPL Ghana’s vision, fellowship strategy, and national partnerships, building ethical leaders who strengthen public institutions from within.',
    photo: teamPortrait('Abena Osei'),
    email: 'director@eplghana.org',
    phone: '+233 24 606 4766',
    linkedin: '#',
  },
  {
    id: 'programmes-lead',
    group: 'team',
    name: 'Michael Tetteh',
    role: 'Director of Programmes',
    bio: 'Michael oversees fellowship delivery, host-institution partnerships, and the capacity-building curriculum that prepares fellows for public service impact.',
    photo: teamPortrait('Michael Tetteh'),
    email: 'programmes@eplghana.org',
    linkedin: '#',
  },
  {
    id: 'partnerships-lead',
    group: 'team',
    name: 'Linda Akoto',
    role: 'Partnerships & Development',
    bio: 'Linda cultivates relationships with government agencies, donors, and allies to scale EPL’s reach and sustain fellowship placements nationwide.',
    photo: teamPortrait('Linda Akoto'),
    email: 'partnerships@eplghana.org',
    linkedin: '#',
  },
  {
    id: 'fellows-coord',
    group: 'team',
    name: 'Daniel Kwarteng',
    role: 'Fellowship Coordinator',
    bio: 'Daniel supports fellows throughout their journey, from recruitment and onboarding to mentorship, check-ins, and career advancement.',
    photo: teamPortrait('Daniel Kwarteng'),
    email: 'fellows@eplghana.org',
  },
  {
    id: 'comms-lead',
    group: 'team',
    name: 'Rita Asante',
    role: 'Communications Lead',
    bio: 'Rita shares EPL’s stories, research, and fellow voices, amplifying the impact of ethical leadership across Ghana’s public sector.',
    photo: teamPortrait('Rita Asante'),
    email: 'communications@eplghana.org',
    linkedin: '#',
  },
  {
    id: 'ops-lead',
    group: 'team',
    name: 'Samuel Owusu',
    role: 'Operations Manager',
    bio: 'Samuel keeps programmes running smoothly, finance, logistics, and the systems that help the team deliver consistently for fellows and partners.',
    photo: teamPortrait('Samuel Owusu'),
    email: 'operations@eplghana.org',
  },
]

export const boardMembers = teamMembers.filter((m) => m.group === 'board')
export const staffMembers = teamMembers.filter((m) => m.group === 'team')
