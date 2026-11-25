// @ts-nocheck
import { CommandPallete } from "@/components/my-comps/CommandPallete"
import GhostCursor from "@/components/my-comps/GhostCursor"
import { Outlet } from "react-router"

const Root = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <GhostCursor />
      <CommandPallete />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default Root
