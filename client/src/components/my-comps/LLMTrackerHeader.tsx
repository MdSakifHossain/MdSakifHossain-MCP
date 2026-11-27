// @ts-nocheck
import PageSwitcher from "./PageSwitcher"

const LLMTrackerHeader = () => {
  const appBase = "/llm-tracker"

  return (
    <header className="w-full px-8 pt-6">
      <PageSwitcher routes={[appBase, `${appBase}/add`, `${appBase}/notes`]} />
    </header>
  )
}

export default LLMTrackerHeader
