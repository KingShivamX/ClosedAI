import React from "react"
import { Link, useLocation } from "react-router-dom"
import { logo } from "../assets"

const Header = () => {
    const location = useLocation()

    return (
        <header className="w-full flex justify-between items-center border-b border-b-[#e6ebf4] bg-white sm:pr-6 sm:pl-2 pr-4 py-2">
            <Link to="/">
                <img
                    src={logo}
                    alt="logo"
                    className="h-[3.5rem] sm:h-[4rem] object-contain"
                />
            </Link>

            {location.pathname === "/create-post" ? (
                <Link
                    to="/"
                    className="font-inter font-semibold shadow-sm bg-[#FFAE00] text-white px-4 py-2 rounded"
                >
                    Home
                </Link>
            ) : (
                <Link
                    to="/create-post"
                    className="font-inter font-semibold shadow-sm bg-[#FFAE00] text-white px-4 py-2 rounded"
                >
                    Create
                </Link>
            )}
        </header>
    )
}

export default Header
