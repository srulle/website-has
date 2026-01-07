"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SunIcon, MoonIcon, PaletteIcon, CheckIcon } from "lucide-react"

// Theme configuration for easy extension
const themeConfig = {
  styles: {
    default: {
      light: "light",
      dark: "dark"
    },
    twitter: {
      light: "twitter",
      dark: "twitter-dark"
    },
    modern: {
      light: "modern",
      dark: "modern-dark"
    }
  } as const,
  modes: ["light", "dark"] as const
} as const

type ThemeStyle = keyof typeof themeConfig.styles
type ThemeMode = typeof themeConfig.modes[number]

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [currentStyle, setCurrentStyle] = React.useState<ThemeStyle>("default")
  const [currentMode, setCurrentMode] = React.useState<ThemeMode>("light")

  // Sync state based on current theme
  React.useEffect(() => {
    Object.entries(themeConfig.styles).forEach(([style, modes]) => {
      if (modes.light === theme) {
        setCurrentStyle(style as ThemeStyle)
        setCurrentMode("light")
      } else if (modes.dark === theme) {
        setCurrentStyle(style as ThemeStyle)
        setCurrentMode("dark")
      }
    })
  }, [theme])

  const applyTheme = (style: ThemeStyle, mode: ThemeMode) => {
    const themeKey = themeConfig.styles[style][mode]
    setTheme(themeKey)
  }

  const handleModeChange = (mode: ThemeMode) => {
    setCurrentMode(mode)
    applyTheme(currentStyle, mode)
  }

  const handleStyleChange = (style: ThemeStyle) => {
    setCurrentStyle(style)
    applyTheme(style, currentMode)
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Theme Mode Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme mode</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mode</DropdownMenuLabel>
          {themeConfig.modes.map((mode) => (
            <DropdownMenuItem key={mode} onClick={() => handleModeChange(mode)}>
              {mode === "light" ? (
                <SunIcon className="mr-2 h-4 w-4" />
              ) : (
                <MoonIcon className="mr-2 h-4 w-4" />
              )}
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
              {currentMode === mode && <CheckIcon className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Style Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <PaletteIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle theme style</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Style</DropdownMenuLabel>
          {Object.keys(themeConfig.styles).map((style) => (
            <DropdownMenuItem key={style} onClick={() => handleStyleChange(style as ThemeStyle)}>
              {style.charAt(0).toUpperCase() + style.slice(1)}
              {currentStyle === style && <CheckIcon className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}