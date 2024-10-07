import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className=' bg-black text-white'>
            <nav className=' flex justify-between w-[1440px] mx-auto py-4'>
                <div>
                    logo
                </div>
                <div className=' flex gap-4'>
                    <Link to="/create">Create</Link>
                    <Link to="/">Home</Link>
                    {/* <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link> */}
                    <Link to="/score-updater">Score Updater</Link>
                    <Link to="/show-match-ticker">Match</Link>

                </div>
            </nav>
        </header>
    )
}

export default Navbar