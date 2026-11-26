import { createBrowserRouter } from "react-router"
import Root from "./layouts/Root"
import HomePage from "./pages/HomePage"
import LLMTracker from "./pages/LLMTracker"
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
        path: "notes",
        element: <p>notes</p>,
      },
      {
        path: "edit/:id",
        element: <p>edit/:id</p>,
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
