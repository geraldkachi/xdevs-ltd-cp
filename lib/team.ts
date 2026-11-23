// Team members shown on the home page, /team and /team/[slug].
// Edit the bios, links and focus areas here — the pages update automatically.

export type Member = {
  slug: string
  name: string
  title: string          // short role shown under the name
  roles: string[]        // full list of roles shown on the profile
  direction: string      // coloured chip on the card (like u24's "Defense")
  image: string | null // null shows an initials placeholder until a photo is added
  imagePosition?: string // CSS object-position for the card crop
  intro: string
  bio: string[]
  focus: string[]
  links: { label: string; href: string }[]
}

export const team: Member[] = [
  {
    slug: 'adimora-augustine-onyekachi',
    name: 'Adimora Augustine Onyekachi',
    title: 'Founder & CEO',
    roles: ['Founder & CEO', 'Senior Software Engineer'],
    direction: 'Software Engineering',
    image: '/team/adimora-augustine-onyekachi.jpg',
    imagePosition: '50% 35%',
    intro:
      'Founder and Chief Executive Officer of XDEVS, and a Senior Software Engineer who still writes code every week.',
    bio: [
      'Augustine founded XDEVS to build software differently: engineering-first, honest with clients, and measured by the business results the work produces rather than by tickets closed.',
      'As CEO he sets the company’s direction and leads client partnerships. As a Senior Software Engineer he stays close to the work — shaping system architecture, reviewing code, and helping the team ship products that scale.',
      'He also leads the XDEVS Academy vision: training the next generation of African engineers through hands-on, mentor-led learning.',
    ],
    focus: ['Software architecture', 'Full-stack engineering', 'Technical leadership', 'Product strategy', 'Mentorship'],
    links: [
      { label: 'Email', href: 'mailto:hello@xdevs.io' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/xdevsltd' },
    ],
  },
  {
    slug: 'chimoma-ebere-cynthia',
    name: 'Chimoma Ebere Cynthia',
    title: 'Chief Operating Officer',
    roles: ['Chief Operating Officer', 'DevOps Engineer'],
    direction: 'Cloud & DevOps',
    image: '/team/chimoma-ebere-cynthia.jpg',
    imagePosition: '50% 20%',
    intro:
      'Chief Operating Officer of XDEVS and a DevOps Engineer who keeps both the company and its client platforms running smoothly.',
    bio: [
      'Chimoma runs day-to-day operations at XDEVS — delivery, people, and process — making sure every engagement has clear timelines, weekly updates and no surprises.',
      'As a DevOps Engineer she leads the cloud and infrastructure side of client work: CI/CD pipelines, infrastructure as code, monitoring, and the zero-downtime releases that let teams ship with confidence.',
      'She is passionate about opening doors into tech and mentors Academy students on cloud and DevOps career paths.',
    ],
    focus: ['Operations & delivery', 'CI/CD pipelines', 'AWS & cloud infrastructure', 'Infrastructure as code', 'Mentorship'],
    links: [
      { label: 'Email', href: 'mailto:hello@xdevs.io' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/xdevsltd' },
    ],
  },
  {
    slug: 'cynthia-caxton',
    name: 'Cynthia Caxton',
    title: 'Product Manager',
    roles: ['Product Manager'],
    direction: 'Product',
    // Add her photo to public/team/cynthia-caxton.jpg, then change this to '/team/cynthia-caxton.jpg'
    image: null,
    imagePosition: '50% 30%',
    intro: 'Product Manager at XDEVS, turning client goals into clear roadmaps and products people actually use.',
    bio: [
      'Cynthia leads product at XDEVS — working with clients to understand their users, shape the roadmap and decide what gets built first.',
      'She sits between business and engineering: writing clear requirements, running discovery and sprint reviews, and making sure every release moves a real metric.',
    ],
    focus: ['Product strategy', 'Discovery & user research', 'Roadmapping', 'Agile delivery', 'Stakeholder management'],
    links: [
      { label: 'Email', href: 'mailto:hello@xdevs.io' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/xdevsltd' },
    ],
  },
]

export const getMember = (slug: string) => team.find((m) => m.slug === slug)
