import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to={"/admin-home"}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Home
                            </Link>
                            <Link className="nav-link" to={"/admin-users"}>
                                <div className="sb-nav-link-icon"><i className="fas fa-user fa-fw"></i></div>
                                Users
                            </Link>
                            <Link className="nav-link" to={"/admin-banners"}>
                                <div className="sb-nav-link-icon"><i className="fas fa-image fa-fw"></i></div>
                                Banners
                            </Link>
                            {/* <div className="sb-sidenav-menu-heading">User's</div> */}
                                <a className="nav-link collapsed" href="!#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Tests & Courses
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to={"/admin-add-test-series"}>
                                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                            Create Test-Series
                                            </Link>
                                            <Link className="nav-link" to={"/admin-add-classes"}>
                                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                            Create Courses
                                            </Link>
                                    <a className="nav-link" href="layout-sidenav-light.html">Edit-Test-Series</a>
                                </nav>
                            </div>                             
                                <a className="nav-link collapsed" href="!#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Daily Dose
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapsePages" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to={"/admin-add-daily-test"}>
                                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                            Add Test
                                            </Link>
                                            <Link className="nav-link" to={"/admin-add-post"}>
                                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                            Add Post
                                            </Link>                                                                              
                                </nav>
                            </div> 
                        </div>
                    </div>
                    {/* <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Start Bootstrap
                    </div> */}
                </nav>
  )
}
