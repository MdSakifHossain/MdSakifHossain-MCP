// @ts-nocheck
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  IconArrowDown,
  IconArrowsUpDown,
  IconArrowUp,
  IconDots,
  IconPencil,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useModels } from "../contexts/ModelsContext"

export default function LLMTracker() {
  const { models, isLoading } = useModels()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredModels, setFilteredModels] = useState(models)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement
      const isSearchFocused = activeElement === searchInputRef.current

      if (e.key === "Escape" && isSearchFocused)
        return searchInputRef.current?.blur()

      if (e.key === "/") {
        const activeTag = activeElement?.tagName.toLowerCase()
        if (activeTag === "input" || activeTag === "textarea") return

        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredModels(
        models?.filter((model) =>
          model.model_name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase().trim())
        )
      )
    }, 100)

    return () => clearTimeout(timer)
  }, [searchQuery, models])

  return (
    <div className="flex flex-1 flex-col gap-8 px-8 py-12">
      {isLoading ? (
        <SpinnerEmpty></SpinnerEmpty>
      ) : (
        <>
          <InputGroup className="mx-auto max-w-5xl">
            <InputGroupInput
              ref={searchInputRef}
              type="search"
              name="search"
              placeholder={`Search ${models?.length} Models by Name`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon>
              <IconSearch className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <TableActions list={filteredModels}></TableActions>
        </>
      )}
    </div>
  )
}

function TableActions({ list }) {
  const MODEL_NAME_LENGTH = 20
  const navigate = useNavigate()

  // State to track current sort column and direction
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })

  // Toggle sorting logic: asc -> desc -> null
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" }
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" }
      }
      return { key: null, direction: null }
    })
  }

  // Value getter helper function for dynamic sorting
  const getValue = (model, key) => {
    switch (key) {
      case "model_name":
        return model.model_name ?? ""
      case "params":
        return model.total_parameters_b ?? 0
      case "context_window":
        return model.context_window ?? 0
      case "is_thinking":
        return model.is_thinking ? 1 : 0
      case "is_loaded":
        return model.is_loaded ? 1 : 0
      case "generated_tokens":
        return Number(model.generated_tokens) || 0
      case "generation_time_s":
        return model.generation_time_s ?? 0
      case "generation_speed_tps":
        return model.generation_speed_tps ?? 0
      case "model_score":
        return model.model_score ?? -1
      case "agent_score":
        return model.agent_score ?? -1
      default:
        return ""
    }
  }

  // Compute sorted list based on current sortConfig
  const sortedList = useMemo(() => {
    if (!list) return []
    if (!sortConfig.key || !sortConfig.direction) return list

    return [...list].sort((a, b) => {
      const aVal = getValue(a, sortConfig.key)
      const bVal = getValue(b, sortConfig.key)

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [list, sortConfig])

  // Helper to render sort arrows inside headers
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <IconArrowsUpDown className="ml-1 inline-block size-3.5 opacity-40" />
      )
    }
    if (sortConfig.direction === "asc") {
      return <IconArrowUp className="ml-1 inline-block size-3.5" />
    }
    return <IconArrowDown className="ml-1 inline-block size-3.5" />
  }

  return (
    <Table className="font-geist-mono text-base">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>

          <TableHead
            className="cursor-pointer select-none"
            onClick={() => handleSort("model_name")}
          >
            Model {renderSortIcon("model_name")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("params")}
          >
            Params {renderSortIcon("params")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("context_window")}
          >
            Context {renderSortIcon("context_window")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("is_thinking")}
          >
            Type {renderSortIcon("is_thinking")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("is_loaded")}
          >
            Loaded {renderSortIcon("is_loaded")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("generated_tokens")}
          >
            Tokens {renderSortIcon("generated_tokens")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("generation_time_s")}
          >
            Time {renderSortIcon("generation_time_s")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("generation_speed_tps")}
          >
            Speed (t/s) {renderSortIcon("generation_speed_tps")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("model_score")}
          >
            Model Score {renderSortIcon("model_score")}
          </TableHead>

          <TableHead
            className="cursor-pointer text-center select-none"
            onClick={() => handleSort("agent_score")}
          >
            Agent Score {renderSortIcon("agent_score")}
          </TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedList?.map((model, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href={model.model_url}
                    className="contrast"
                    target="_blank"
                  >
                    {model.model_name.length > MODEL_NAME_LENGTH
                      ? model.model_name.slice(0, MODEL_NAME_LENGTH) + "..."
                      : model.model_name}
                  </a>
                </TooltipTrigger>
                <TooltipContent>{model.model_name}</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell className="text-center">{getParams(model)}</TableCell>
            <TableCell className="text-center">
              {formatNumber(model.context_window)}
            </TableCell>
            <TableCell className="text-center">
              {model.is_thinking ? "🧠" : "⚡️"}
            </TableCell>
            <TableCell className="text-center">
              {model.is_loaded ? "✅️" : "❌️"}
            </TableCell>
            <TableCell className="text-center">
              {model.generated_tokens
                ? formatNumber(model.generated_tokens)
                : "-"}
            </TableCell>
            <TableCell className="text-center">
              {model.generation_time_s !== null &&
              model.generation_time_s !== undefined
                ? `${parseTime(model.generation_time_s)}`
                : "-"}
            </TableCell>
            <TableCell className="text-center">
              {model.generation_speed_tps !== null &&
              model.generation_speed_tps !== undefined
                ? `${model.generation_speed_tps} `
                : "-"}
            </TableCell>
            <TableCell className="text-center">
              <Tooltip>
                <TooltipTrigger>
                  {model.model_score !== null && model.model_score !== undefined
                    ? model.model_score
                    : "-"}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{model.model_notes}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell className="text-center">
              <Tooltip>
                <TooltipTrigger>
                  {model.agent_score !== null && model.agent_score !== undefined
                    ? model.agent_score
                    : "-"}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{model.agent_notes}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8">
                      <IconDots />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate(`/llm-tracker/edit/${model._id}`)}
                  >
                    <IconPencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled variant="destructive">
                    <IconTrash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function SpinnerEmpty() {
  const { error } = useModels()

  return (
    <Empty className="w-full select-none">
      <EmptyHeader>
        {error ? (
          <img src="/oops.svg" className="w-6/12" />
        ) : (
          <Spinner className="size-10" />
        )}
        <EmptyTitle>{error ? "Error" : "Processing your request"}</EmptyTitle>
        <EmptyDescription>
          {error
            ? error
            : "Please wait while we process your request. Server is Booting in a few momnets."}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

// --- Custom on demand ---

function formatNumber(n) {
  if (n === null || n === undefined) return "N/A"

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  })

  return formatter.format(n)
}

function getParams(m) {
  if (!m) return "N/A"

  // Handles both new schema (is_moe) and fallback legacy schema (isMoE)
  const isMoE = m.is_moe ?? m.isMoE
  const total = m.total_parameters_b ?? m.totalParams
  const active = m.active_parameters_b ?? m.activeParams

  if (total === undefined || total === null) return "N/A"

  return isMoE ? `${total}B-A${active}B` : `${total}B`
}

function parseTime(num) {
  return typeof num !== "number"
    ? "-"
    : num < 60
      ? `${num}s`
      : `${Math.floor(num / 60)}min ${num % 60}s`
}
