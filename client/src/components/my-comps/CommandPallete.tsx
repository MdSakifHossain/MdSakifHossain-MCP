// @ts-nocheck
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  IconCookie,
  IconDeviceTv,
  IconHome,
  IconNote,
  IconPointer,
} from "@tabler/icons-react"
import React from "react"
import { useNavigate } from "react-router"

export function CommandPallete() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => {
                navigate("/")
                setOpen((prev) => !prev)
              }}
            >
              <IconHome />
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/llm-tracker")
                setOpen((prev) => !prev)
              }}
            >
              <IconCookie />
              <span>LLM Tracker</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/llm-tracker/notes")
                setOpen((prev) => !prev)
              }}
            >
              <IconNote />
              <span>Notes (LLM Tracker)</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/watchlist")
                setOpen((prev) => !prev)
              }}
            >
              <IconDeviceTv />
              <span>Watchlist</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                console.log("add something")
                setOpen((prev) => !prev)
              }}
            >
              <IconPointer />
              <span>Toggle Ghost Cursor</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
