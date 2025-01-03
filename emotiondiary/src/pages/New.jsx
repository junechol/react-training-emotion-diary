import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"
import {useNavigate} from 'react-router-dom'
import { useContext } from "react"
import { DiaryDispatchContext } from "../App"

const New = () => {
    const navigate = useNavigate()
    const {handleCreate} = useContext(DiaryDispatchContext)

    const handleSubmit = (input) => {
        console.log(input)
        handleCreate(
            input.createdDate.getTime(),
            input.emotionId,
            input.content
        )
        navigate('/', {replace: true})
    }
    return (
        <div>
            <Header 
                title={'새 일기 쓰기'}
                leftChild={<Button 
                    text={'< 뒤로 가기'}
                    onClick={()=>navigate(-1)}
                    />}
                />
            <Editor onSubmit={handleSubmit}/>
        </div>
    )
}

export default New