// import Header from "@/components/custom/Header"
import GhostCursor from "@/components/my-comps/GhostCursor"
import { Outlet } from "react-router"
// import Header from "../components/Header";

const Root = () => {
  return (
    <div className="flex min-h-svh flex-col">
      {/* <Header /> */}
      <GhostCursor />
      <main className="flex flex-1 flex-col">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Root
