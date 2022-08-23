import React from 'react'
import { Routing } from './Routing'
import { Sidebar } from './Sidebar'

export const Content = () => {
  return (
    <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
    <Sidebar/>
    </div>
    <div id="layoutSidenav_content">
    <main>
    <div className="container-fluid px-4">
            <Routing/>
    </div>
</main>
    </div>
</div>
  )
}
