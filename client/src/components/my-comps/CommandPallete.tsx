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
  CommandShortcut,
} from "@/components/ui/command"
import {
  IconBell,
  IconCalculator,
  IconCalendar,
  IconClipboard,
  IconCode,
  IconCopy,
  IconCreditCard,
  IconFileTypeTxt,
  IconFolder,
  IconFolderPlus,
  IconHelpCircle,
  IconHome,
  IconInbox,
  IconLayoutGrid,
  IconList,
  IconPhoto,
  IconPlus,
  IconScissors,
  IconSettings,
  IconTrash,
  IconUser,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react"
import React from "react"

export function CommandPallete() {
  const [open, setOpen] = React.useState(false)

  // Toggle the menu when ctrl + K is pressed
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
            <CommandItem>
              <IconHome />
              <span>Home</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconInbox />
              <span>Inbox</span>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconFileTypeTxt />
              <span>Documents</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconFolder />
              <span>Folders</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>
              <IconPlus />
              <span>New File</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconFolderPlus />
              <span>New Folder</span>
              <CommandShortcut>⇧⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconCopy />
              <span>Copy</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconScissors />
              <span>Cut</span>
              <CommandShortcut>⌘X</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconClipboard />
              <span>Paste</span>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconTrash />
              <span>Delete</span>
              <CommandShortcut>⌫</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="View">
            <CommandItem>
              <IconLayoutGrid />
              <span>Grid View</span>
            </CommandItem>
            <CommandItem>
              <IconList />
              <span>List View</span>
            </CommandItem>
            <CommandItem>
              <IconZoomIn />
              <span>Zoom In</span>
              <CommandShortcut>⌘+</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconZoomOut />
              <span>Zoom Out</span>
              <CommandShortcut>⌘-</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem>
              <IconUser />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconCreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconSettings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconBell />
              <span>Notifications</span>
            </CommandItem>
            <CommandItem>
              <IconHelpCircle />
              <span>Help & Support</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools">
            <CommandItem>
              <IconCalculator />
              <span>Calculator</span>
            </CommandItem>
            <CommandItem>
              <IconCalendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <IconPhoto />
              <span>Image Editor</span>
            </CommandItem>
            <CommandItem>
              <IconCode />
              <span>Code Editor</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
