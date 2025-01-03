import Button from "../components/Button"
import Header from "../components/Header"
import Editor from "../components/Editor"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { DiaryStateContext } from "../App"
import { DiaryDispatchContext } from "../App"

const Edit = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const data = useContext(DiaryStateContext)
    const {handleDelete, handleUpdate} = useContext(DiaryDispatchContext)
    const [diaryToEdit, setDiaryToEdit] = useState()

    useEffect(()=>{
        const currentDiaryItem = data.find(item=>String(item.id)===String(id))
        if (!currentDiaryItem) {
            window.alert('존재하지 않는 일기입니다')
            navigate('/', {replace: true})
        } else {
            setDiaryToEdit(currentDiaryItem)
        }
    }, [id])

    
    // const diaryItem = getCurrentDiaryItem()
    // const itemToEdit = {...diaryItem, createdDate: new Date(diaryItem.createdDate)}


    const handleDeleteButton = () => {
        if (window.confirm("정말 삭제할까요? 복원이 불가합니다."))
        {
            console.log(id, "deleting...") 
            handleDelete(id) 
            navigate('/', {replace: true})
        }
    }

    const handleSubmit = (input) => {
        console.log(input)
        handleUpdate(
            id,
            input.createdDate.getTime(),
            input.emotionId,
            input.content
        )
        navigate('/', {replace: true})
    }
    return (
        <div>
            <Header
                title={'일기 수정하기'}
                leftChild={<Button
                    text={'< 뒤로 가기'}
                    onClick={()=>navigate(-1)}
                />}
                rightChild={<Button
                    text={'삭제하기'}
                    type={'NEGATIVE'}
                    onClick={handleDeleteButton}
                />}
            />
            <Editor initData={diaryToEdit}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Edit