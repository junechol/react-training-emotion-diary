import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import { getEmotionImage } from './util/get-emotion-image'


function App() {
  const navigate = useNavigate()

  const handleNewPageButton = () => {
    navigate('/new')
  }

  return (
    <>
      <div>
        <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />
      </div>
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/new'}>New</Link>
        <Link to={'/diary'}>Diary</Link>
      </nav>
      <button onClick={handleNewPageButton}>New 페이지로 이동</button>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/diary/:diary_id' element={<Diary />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
