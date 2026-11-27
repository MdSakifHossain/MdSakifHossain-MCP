import { createBrowserRouter } from "react-router"
import Root from "./layouts/Root"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"

import LLMTrackerLayout from "./layouts/LLMTrackerLayout"
import AddNewModel from "./pages/llm-tracker/AddNewModel"
import EditModelInfo from "./pages/llm-tracker/EditModelInfo"
import LLMTracker from "./pages/llm-tracker/LLMTracker"
import LLMTrackerNotes from "./pages/llm-tracker/LLMTrackerNotes"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: "llm-tracker",
    Component: LLMTrackerLayout,
    children: [
      {
        index: true,
        Component: LLMTracker,
      },
      {
        path: "notes",
        Component: LLMTrackerNotes,
      },
      {
        path: "edit/:id",
        Component: EditModelInfo,
      },
      {
        path: "add",
        Component: AddNewModel,
      },
    ],
  },
  {
    path: "*",
    Component: Root,
    children: [
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
])
