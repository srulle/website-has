"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { DialogTitle } from "@/components/ui/dialog"
import { SunIcon, MoonIcon, PaletteIcon } from "lucide-react"
import { useMediaQuery } from "@/lib/hooks/use-media-query"

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
    },
    claude: {
      light: "claude",
      dark: "claude-dark"
    },
    graphite: {
      light: "graphite",
      dark: "graphite-dark"
    },
    caffeine: {
      light: "caffeine",
      dark: "caffeine-dark"
    },
    "ocean-breeze": {
      light: "ocean-breeze",
      dark: "ocean-breeze-dark"
    }
  } as const,
  modes: ["light", "dark"] as const
} as const

type ThemeStyle = keyof typeof themeConfig.styles
type ThemeMode = typeof themeConfig.modes[number]

type StyleOption = {
  value: string
  label: string
}

const styleOptions: StyleOption[] = Object.keys(themeConfig.styles).map(style => ({
  value: style,
  label: style.charAt(0).toUpperCase() + style.slice(1)
}))

const themePreviews: Record<string, Record<string, string[]>> = {
  default: {
    light: ['oklch(0.205 0 0)', 'oklch(0.97 0 0)', 'oklch(0.97 0 0)', 'oklch(0.97 0 0)'],
    dark: ['oklch(0.87 0.00 0)', 'oklch(0.269 0 0)', 'oklch(0.371 0 0)', 'oklch(0.269 0 0)']
  },
  twitter: {
    light: ['oklch(0.6723 0.1606 244.9955)', 'oklch(0.1884 0.0128 248.5103)', 'oklch(0.9392 0.0166 250.8453)', 'oklch(0.9222 0.0013 286.3737)'],
    dark: ['oklch(0.6692 0.1607 245.0110)', 'oklch(0.9622 0.0035 219.5331)', 'oklch(0.1928 0.0331 242.5459)', 'oklch(0.2090 0 0)']
  },
  modern: {
    light: ['oklch(0.6231 0.1880 259.8145)', 'oklch(0.9670 0.0029 264.5419)', 'oklch(0.9514 0.0250 236.8242)', 'oklch(0.9846 0.0017 247.8389)'],
    dark: ['oklch(0.6231 0.1880 259.8145)', 'oklch(0.2686 0 0)', 'oklch(0.3791 0.1378 265.5222)', 'oklch(0.2393 0 0)']
  },
  claude: {
    light: ['oklch(0.6171 0.1375 39.0427)', 'oklch(0.9245 0.0138 92.9892)', 'oklch(0.9245 0.0138 92.9892)', 'oklch(0.9341 0.0153 90.2390)'],
    dark: ['oklch(0.6724 0.1308 38.7559)', 'oklch(0.9818 0.0054 95.0986)', 'oklch(0.2130 0.0078 95.4245)', 'oklch(0.2213 0.0038 106.7070)']
  },
  graphite: {
    light: ['oklch(0.4891 0 0)', 'oklch(0.9067 0 0)', 'oklch(0.8078 0 0)', 'oklch(0.8853 0 0)'],
    dark: ['oklch(0.7058 0 0)', 'oklch(0.3092 0 0)', 'oklch(0.3715 0 0)', 'oklch(0.2850 0 0)']
  },
  caffeine: {
    light: ['oklch(0.4341 0.0392 41.9938)', 'oklch(0.9200 0.0651 74.3695)', 'oklch(0.9310 0 0)', 'oklch(0.9521 0 0)'],
    dark: ['oklch(0.9247 0.0524 66.1732)', 'oklch(0.3163 0.0190 63.6992)', 'oklch(0.2850 0 0)', 'oklch(0.2520 0 0)']
  },
  'ocean-breeze': {
    light: ['oklch(0.7227 0.1920 149.5793)', 'oklch(0.9514 0.0250 236.8242)', 'oklch(0.9505 0.0507 163.0508)', 'oklch(0.9670 0.0029 264.5419)'],
    dark: ['oklch(0.7729 0.1535 163.2231)', 'oklch(0.3351 0.0331 260.9120)', 'oklch(0.3729 0.0306 259.7328)', 'oklch(0.2463 0.0275 259.9628)']
  }
}

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [currentStyle, setCurrentStyle] = React.useState<ThemeStyle>("default")
  const [currentMode, setCurrentMode] = React.useState<ThemeMode>("light")
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

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

  const toggleMode = () => {
    const newMode = currentMode === "light" ? "dark" : "light"
    handleModeChange(newMode)
  }

  const handleStyleChange = (style: ThemeStyle) => {
    setCurrentStyle(style)
    applyTheme(style, currentMode)
  }

  // Keyboard shortcut for toggling mode
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "d") {
        toggleMode()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentMode, currentStyle])

  return (
    <div className="flex items-center space-x-2">
      {/* Theme Mode Toggle */}
      <Button variant="ghost" size="icon" onClick={toggleMode}>
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme mode</span>
      </Button>

      {/* Theme Style Toggle */}
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <PaletteIcon className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle theme style</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <StyleList setOpen={setOpen} handleStyleChange={handleStyleChange} currentMode={currentMode} />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <PaletteIcon className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle theme style</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DialogTitle className="sr-only">Theme Style Selection</DialogTitle>
            <div className="mt-4 border-t">
              <StyleList setOpen={setOpen} handleStyleChange={handleStyleChange} currentMode={currentMode} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}

function StyleList({
  setOpen,
  handleStyleChange,
  currentMode,
}: {
  setOpen: (open: boolean) => void
  handleStyleChange: (style: ThemeStyle) => void
  currentMode: ThemeMode
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter style..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {styleOptions.map((style) => (
            <CommandItem
              key={style.value}
              value={style.value}
              onSelect={(value) => {
                handleStyleChange(value as ThemeStyle)
                setOpen(false)
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {themePreviews[style.value][currentMode].map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-sm border border-border/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="whitespace-nowrap">{style.label}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}