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
import { config } from "@/constants"
import {
  IconBrandGithub,
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
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // ---- config: each item is just { label, icon, run } ----
  const sections = [
    {
      heading: "Navigation",
      items: [
        { label: "Home", icon: IconHome, run: () => navigate("/") },
        {
          label: "LLM Tracker",
          icon: IconCookie,
          run: () => navigate("/llm-tracker"),
        },
        {
          label: "Notes (LLM Tracker)",
          icon: IconNote,
          run: () => navigate("/llm-tracker/notes"),
        },
        {
          label: "Watchlist",
          icon: IconDeviceTv,
          run: () => navigate("/watchlist"),
        },
      ],
    },
    {
      heading: "Actions",
      items: [
        {
          label: "Toggle Ghost Cursor",
          icon: IconPointer,
          run: () => console.log("add something"),
        },
        {
          label: "Open GitHub",
          icon: IconBrandGithub,
          run: () => window.open(config.socials[3].url, "_blank"),
        },
      ],
    },
  ]

  const handleSelect = (item) => {
    item.run()
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {sections.map((section, i) => (
            <React.Fragment key={section.heading}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup heading={section.heading}>
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <CommandItem
                      key={item.label}
                      value={item.label}
                      onSelect={() => handleSelect(item)}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
