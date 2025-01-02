import { useParams } from "react-router-dom"

const Diary = () => {
    const params = useParams()
    console.log(params)
    return <h1>{params.id}번 일기입니다</h1>
}

export default Diary