import NavigationMenuDemo from "@/components/NavigationMenuDemo"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"

export function Header() {
  return (
    <header className="border-b border-gray-200 relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <span className="text-lg font-bold">Logo</span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenuDemo />

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>
    </header>
  )
}