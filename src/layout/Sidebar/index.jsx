import React from 'react'
import "./side.scss"
import { NavLink } from 'react-router'

const Sidebar = () => {
  return (
    <div className='sideBar'>
        <h3>SideBar</h3>
        <ul>
            <li>
                <NavLink  to="/main/users">Usres</NavLink>
            </li>
            <li>
                <NavLink to="/main/products">Products</NavLink>
            </li>
            <li>
                <NavLink to="/main/tasks">Tasks</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar