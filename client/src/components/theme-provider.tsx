// @ts-nocheck
import * as React from "react"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

const ThemeProviderContext = React.createContext(undefined)

function getSystemTheme() {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }

  return "light"
}

export function ThemeProvider({ children, ...props }) {
  const [theme, setThemeState] = React.useState(() => getSystemTheme())

  const applyTheme = React.useCallback((nextTheme) => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(nextTheme)
  }, [])

  React.useEffect(() => {
    applyTheme(theme)

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      setThemeState(getSystemTheme())
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, applyTheme])

  const value = React.useMemo(
    () => ({
      theme,
    }),
    [theme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
