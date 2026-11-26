import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "@/components/ui/tooltip"

import { RouterProvider } from "react-router/dom"
import { ModelsProvider } from "./contexts/ModelsContext"
import "./index.css"
import { router } from "./routes"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ModelsProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ModelsProvider>
    </ThemeProvider>
  </StrictMode>
)
