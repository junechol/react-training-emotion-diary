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
    case 'UPDATE': return state.map(diary => diary.id === action.data.id ? action.data : diary)
    case 'DELETE': return state.filter(diary => diary.id !== action.id)
    default: return state
  }
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function App() {
  const [data, dispatch] = useReducer(reducer, mockData)

  // add new diary
  const handleCreate = (createdData, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: uuid(),
        createdData,
        emotionId,
        content
      }
    })
  }

  // modify a diary
  const handleUpdate = (id, createdData, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdData,
        emotionId,
        content
      }
    })
  }

  // delete a diary
  const handleDelete = (id) => {
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
