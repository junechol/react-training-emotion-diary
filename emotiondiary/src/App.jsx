import './App.css'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import { createContext, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import { mockData } from './mockData'

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE': return [action.data, ...state]
    case 'UPDATE': return state.map(diary => String(diary.id) === String(action.data.id) ? action.data : diary)
    case 'DELETE': return state.filter(diary => String(diary.id) !== String(action.id))
    default: return state
  }
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function App() {
  const [data, dispatch] = useReducer(reducer, mockData)

  // add new diary
  const handleCreate = (createdDate, emotionId, content) => {
    console.log("handleCreate")
    dispatch({
      type: "CREATE",
      data: {
        id: uuid(),
        createdDate,
        emotionId,
        content
      }
    })
  }

  // modify a diary
  const handleUpdate = (id, createdDate, emotionId, content) => {
    console.log("handleUpdate")
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // delete a diary
  const handleDelete = (id) => {
    console.log("handleDelete")
    dispatch({
      type: "DELETE",
      id
    })
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{handleCreate, handleUpdate, handleDelete}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
