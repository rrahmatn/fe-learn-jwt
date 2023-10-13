import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <>
            <div className="w-screen fixed top-0 px-2">
                <div className="navbar px-20 bg-base-100 shadow-md rounded-b-md">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                    </div>
                    <NavLink to="/login" className="flex-none">
                        <button className="btn w-fit py-2 px-3 btn-ghost">
                            Logout
                        </button>
                    </NavLink>
                </div>

            </div>
        </>
    )
}

export default Navbar