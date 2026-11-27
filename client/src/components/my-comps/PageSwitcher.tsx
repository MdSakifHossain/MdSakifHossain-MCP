// @ts-nocheck
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router"

export default function PageSwitcher({ routes = [], ...props }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const currentIndex = routes.indexOf(pathname)
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % routes.length
  const prevIndex =
    currentIndex === -1
      ? routes.length - 1
      : (currentIndex - 1 + routes.length) % routes.length

  const nextRoute = routes[nextIndex]
  const prevRoute = routes[prevIndex]

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if modifier keys are pressed (ctrl, cmd/windows, shift, alt)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return

      const key = e.key.toLowerCase()
      if (key === "j") {
        e.preventDefault()
        navigate(nextRoute)
      }
      if (key === "k") {
        e.preventDefault()
        navigate(prevRoute)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextRoute, prevRoute, navigate])

  return (
    <Link {...props} to={nextRoute} className="inline select-none">
      <img
        src="/vite.svg"
        alt="logo"
        className="floating inline size-16 select-none"
      />
    </Link>
  )
}
