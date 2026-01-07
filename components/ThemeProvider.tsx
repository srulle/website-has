"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      themes={["light", "dark", "twitter", "twitter-dark", "modern", "modern-dark", "claude", "claude-dark", "graphite", "graphite-dark", "caffeine", "caffeine-dark", "ocean-breeze", "ocean-breeze-dark"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}