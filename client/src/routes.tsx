import { createBrowserRouter } from "react-router"
import Root from "./layouts/Root"
import HomePage from "./pages/HomePage"
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
        path: "add",
        element: <p>add</p>,
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
