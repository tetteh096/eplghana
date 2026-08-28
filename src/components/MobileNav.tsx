'use client'

import Link from 'next/link'
import { useState } from 'react'

import { mainNav } from '@/config/navigation'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={open}
        aria-label="Toggle menu"
        className="rounded-lg border border-epl-border p-2 text-epl-primary"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          )}
        </svg>
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full z-50 border-b border-epl-border bg-white px-4 py-4 shadow-lg">
          <ul className="space-y-1">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-epl-dark hover:bg-epl-sky"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="epl-btn mt-2 w-full"
                href="/contact"
                onClick={() => setOpen(false)}
              >
                Get Involved
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
