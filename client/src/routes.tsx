import { createBrowserRouter } from "react-router"
import Root from "./layouts/Root"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <p>home</p>,
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
    element: <img src="/oops.svg" alt="404" />,
  },
])
