// @ts-nocheck
import { CommandPallete } from "@/components/my-comps/CommandPallete"
import GhostCursor from "@/components/my-comps/GhostCursor"
import PageSwitcher from "@/components/my-comps/PageSwitcher"
import { Outlet } from "react-router"

export default function LLMTrackerLayout() {
  const appBase = "/llm-tracker"

  return (
    <div className="flex min-h-svh flex-col">
      <GhostCursor />
      <CommandPallete />
      <PageSwitcher routes={[appBase, `${appBase}/add`, `${appBase}/notes`]} />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
