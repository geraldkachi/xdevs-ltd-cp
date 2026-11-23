// XDEVS Academy — courses, pricing and career paths.
// Prices are in Naira. Edit here and /academy updates automatically.

export type Course = {
  slug: string
  title: string
  price: number
  duration: string
  levels: string
  category: string
  summary: string
  curriculum: string[]
  careers: string[]
}

export const SCHEDULE = 'Classes run 3 times a week'

export const diplomas: Course[] = [
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    price: 90000,
    duration: '6 months',
    levels: '3 levels',
    category: 'Design',
    summary: 'Research, wireframe, prototype and hand off interfaces people love to use.',
    curriculum: ['Design thinking & user research', 'Wireframing & information architecture', 'Figma, components & design systems', 'Prototyping, usability testing & portfolio'],
    careers: ['Product Designer', 'UI Designer', 'UX Researcher'],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    price: 90000,
    duration: '6 months',
    levels: '3 levels',
    category: 'Marketing',
    summary: 'Grow brands online with content, SEO, paid ads and analytics.',
    curriculum: ['Brand, content & copywriting', 'SEO & social media strategy', 'Paid ads: Meta & Google', 'Analytics, email & campaign reporting'],
    careers: ['Digital Marketer', 'Social Media Manager', 'Growth Marketer'],
  },
  {
    slug: 'frontend-web-development',
    title: 'Frontend Web Development',
    price: 100000,
    duration: '6 months',
    levels: '3 levels',
    category: 'Engineering',
    summary: 'Build fast, accessible, responsive websites and web apps.',
    curriculum: ['HTML, CSS & responsive layouts', 'JavaScript fundamentals & the DOM', 'React, Next.js & TypeScript', 'APIs, Git, deployment & capstone project'],
    careers: ['Frontend Developer', 'React Developer', 'Web Developer'],
  },
  {
    slug: 'backend-development',
    title: 'Backend Development',
    price: 100000,
    duration: '6 months',
    levels: '3 levels',
    category: 'Engineering',
    summary: 'Design APIs, databases and the server logic behind real products.',
    curriculum: ['Programming fundamentals with Node.js', 'REST & GraphQL API design', 'SQL, PostgreSQL & data modelling', 'Auth, testing, Docker & deployment'],
    careers: ['Backend Developer', 'API Engineer', 'Full-Stack Developer'],
  },
  {
    slug: 'data-analysis',
    title: 'Data Analysis',
    price: 100000,
    duration: '9 months',
    levels: 'Full programme',
    category: 'Data',
    summary: 'Turn raw data into clear insight with Excel, SQL, Python and BI tools.',
    curriculum: ['Excel & spreadsheet modelling', 'SQL for analysis', 'Python, pandas & visualisation', 'Power BI dashboards & storytelling'],
    careers: ['Data Analyst', 'BI Analyst', 'Business Analyst'],
  },
]

export const PREORDER_PRICE = 5000

export const preorders = [
  { slug: 'python', title: 'Python', note: 'Programming fundamentals to automation' },
  { slug: 'javascript', title: 'JavaScript', note: 'Modern JS from zero to confident' },
  { slug: 'react', title: 'React', note: 'Components, hooks and real projects' },
  { slug: 'nodejs', title: 'NodeJS', note: 'Servers, APIs and databases' },
  { slug: 'web3', title: 'Web3', note: 'Blockchain, wallets and smart contracts' },
  { slug: 'aws', title: 'AWS', note: 'Cloud foundations to Cloud Practitioner' },
]

export const careerPaths = [
  { title: 'Product Design', path: ['UI/UX Design', 'Portfolio review', 'Junior Product Designer'] },
  { title: 'Web Engineering', path: ['Frontend', 'Backend', 'Full-Stack Developer'] },
  { title: 'Data', path: ['Data Analysis', 'Python', 'Data / BI Analyst'] },
  { title: 'Cloud & DevOps', path: ['Backend', 'AWS', 'DevOps Engineer'] },
  { title: 'Growth', path: ['Digital Marketing', 'Campaign projects', 'Growth Marketer'] },
]

export const naira = (n: number) => '₦' + n.toLocaleString('en-NG')
