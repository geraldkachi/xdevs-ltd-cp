// Site-wide settings. Swap the demo video for your own when it's ready.

export const VIDEO = {
  // DEMO clip (free Mixkit stock footage). Replace with your own "what we do" video:
  // an .mp4 URL (e.g. uploaded to Vercel Blob / Cloudinary) or a file in /public/video/.
  src: 'https://assets.mixkit.co/videos/41642/41642-720.mp4',
  // Optional: a YouTube/Vimeo embed URL to play in the popup instead of the mp4
  // e.g. 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1'
  embed: '' as string,
  title: 'What we do at XDEVS',
}

// Social links (from the current site). Add more here and they appear in the footer.
export const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/xdevs.ltd' },
  { name: 'X', href: 'https://twitter.com/xdevsio' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/xdevsltd' },
  { name: 'GitHub', href: 'https://github.com/xdevs' },
] as const
