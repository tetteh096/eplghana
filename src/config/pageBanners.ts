/**
 * Pages that show the blue top banner (ChariticsBreadcrumb). Each can be given
 * a background photo in the CMS (Admin → Page Banners); the blue overlay stays
 * on top so any photo still looks on-brand. The `value` must match the `title`
 * the page passes to <ChariticsPageMain>, since banners are matched by title.
 */
export const PAGE_BANNER_OPTIONS = [
  { label: 'About Us', value: 'About Us' },
  { label: 'What We Do', value: 'What We Do' },
  { label: 'Message from the Country Director', value: 'Message from the Country Director' },
  { label: 'Our Team', value: 'Our Team' },
  { label: 'Projects', value: 'Projects' },
  { label: 'Our Community', value: 'Our Community' },
  { label: 'Current Fellows', value: 'Current Fellows' },
  { label: 'EPLAN', value: 'EPLAN' },
  { label: 'Our Partners', value: 'Our Partners' },
  { label: 'Knowledge Products', value: 'Knowledge Products' },
  { label: 'Newsletter', value: 'Newsletter' },
  { label: 'Get Involved', value: 'Get Involved' },
  { label: 'Contact Us', value: 'Contact Us' },
  { label: 'Blog (listing)', value: 'Blog' },
  { label: 'News & Events (listing)', value: 'News & Events' },
] as const
