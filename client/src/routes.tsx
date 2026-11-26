import { createBrowserRouter } from "react-router"
import Root from "./layouts/Root"
import AddNewModel from "./pages/AddNewModel"
import EditModelInfo from "./pages/EditModelInfo"
import HomePage from "./pages/HomePage"
import LLMTracker from "./pages/LLMTracker"
import LLMTrackerNotes from "./pages/LLMTrackerNotes"
import NotFoundPage from "./pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "llm-tracker",
        Component: LLMTracker,
      },
      {
        path: "llm-tracker/notes",
        Component: LLMTrackerNotes,
      },
      {
        path: "llm-tracker/edit/:id",
        Component: EditModelInfo,
      },
      {
        path: "llm-tracker/add",
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
