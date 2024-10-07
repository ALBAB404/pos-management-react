
import {NavBar, SideBar} from "@/components"
import { Outlet } from "react-router-dom"

const Master = () => {
  return (
    <>
      <NavBar />
      <div id="layoutSidenav">
        <SideBar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Master