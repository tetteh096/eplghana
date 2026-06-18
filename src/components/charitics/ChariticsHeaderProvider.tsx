'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react'

type HeaderContextValue = {
  sidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  mobileOpenDropdown: string | null
  toggleMobileDropdown: (key: string) => void
}

const HeaderContext = createContext<HeaderContextValue | null>(null)

export function useChariticsHeader() {
  const ctx = useContext(HeaderContext)
  if (!ctx) {
    throw new Error('useChariticsHeader must be used within ChariticsHeaderProvider')
  }
  return ctx
}

export function ChariticsHeaderProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
    setMobileOpenDropdown(null)
  }, [])
  const toggleMobileDropdown = useCallback((key: string) => {
    setMobileOpenDropdown((prev) => (prev === key ? null : key))
  }, [])

  useLayoutEffect(() => {
    document.body.dataset.eplReactNav = 'true'
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <HeaderContext.Provider
      value={{
        sidebarOpen,
        openSidebar,
        closeSidebar,
        mobileOpenDropdown,
        toggleMobileDropdown,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
