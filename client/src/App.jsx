import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ScoretickerHome from './pages/ScoretickerHome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ScoreUpdater from './pages/ScoreUpdater'
import ShowMatch from './pages/ShowMatch'
import CreateMatch from './pages/CreateMatch'

const App = () => {
  return (
    <>
      <div className=' bg-gray-100'>

        <Navbar />
        <div className='w-[1440px] mx-auto font-Inter'>
          <Routes>
            <Route path="/" element={<CreateMatch />} />
            <Route path="/create" element={<CreateMatch />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route path="/score-updater/:id" element={<ScoreUpdater />} />

          </Routes>

        </div>

      </div>
      <Routes>
        <Route path="/show-match-ticker/:id" element={<ShowMatch />} />
      </Routes>
    </>
  )
}

export default App