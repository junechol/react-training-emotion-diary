import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import {Routes, Route} from 'react-router-dom'
import NotFound from './pages/NotFound'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/new' element={<New/>} />
      <Route path='/diary' element={<Diary/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
