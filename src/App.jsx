import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./routes/pages/Home"
import About from "./routes/pages/About"
import NotFound from './routes/pages/404'

function App() {
  useState(() => {})

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact"/>
          <Route path="*" element={<NotFound />}/>
          </Routes>
      </Router>
      
    </>
  )
}

export default App
