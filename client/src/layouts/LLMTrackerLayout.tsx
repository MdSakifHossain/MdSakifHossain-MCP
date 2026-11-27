// @ts-nocheck
import { CommandPallete } from "@/components/my-comps/CommandPallete"
import GhostCursor from "@/components/my-comps/GhostCursor"
import { Outlet } from "react-router"

export default function LLMTrackerLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <GhostCursor />
      <CommandPallete />
      {/* <LLMTrackerHeader /> */}
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
