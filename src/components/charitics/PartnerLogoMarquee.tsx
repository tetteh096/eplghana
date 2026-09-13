type PartnerLogoItem = {
  id: string
  name: string
  logo?: string
  href?: string
}

type PartnerLogoMarqueeProps = {
  items: PartnerLogoItem[]
  className?: string
}

export function PartnerLogoMarquee({ items, className }: PartnerLogoMarqueeProps) {
  const logos = items.filter((item) => Boolean(item.logo))
  if (logos.length === 0) return null

  // Duplicate enough times for a seamless loop even with few logos
  const repeats = logos.length < 6 ? 4 : 2
  const track = Array.from({ length: repeats }, () => logos).flat()

  return (
    <div className={`epl-logo-marquee${className ? ` ${className}` : ''}`}>
      <div className="epl-logo-marquee__track" aria-hidden={false}>
        {track.map((item, index) => {
          const key = `${item.id}-${index}`
          const image = (
            <img alt={item.name} className="epl-logo-marquee__img" decoding="async" loading="lazy" src={item.logo!} />
          )

          if (item.href) {
            return (
              <a
                aria-label={item.name}
                className="epl-logo-marquee__item"
                href={item.href}
                key={key}
                rel="noopener noreferrer"
                target="_blank"
                title={item.name}
              >
                {image}
              </a>
            )
          }

          return (
            <div className="epl-logo-marquee__item" key={key} title={item.name}>
              {image}
            </div>
          )
        })}
      </div>
    </div>
  )
}
