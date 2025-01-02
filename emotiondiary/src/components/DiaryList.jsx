import './DiaryList.css'
import Button from "./Button"
import DiaryItem from './DiaryItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const DiaryList = ({data}) => {
    const navigate = useNavigate()
    const [sortType, setSortType] = useState('latest')

    const handleSortTypeChange = (e) => {
        setSortType(e.target.value)
    }

    const getSortedData = () => {
        return data.toSorted((a,b)=>{
            if (sortType === 'oldest') {
                return a.createdDate - b.createdDate
            } else {
                return b.createdDate - a.createdDate
            }
        })
    }

    const sortedData = getSortedData()

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={(e)=>handleSortTypeChange(e)}>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된 순</option>
                </select>
                <Button 
                    text={'새 일기 쓰기'} type={'POSITIVE'}
                    onClick={()=>navigate('/new')}
                    />
            </div>
            <div className="list_wrapper">
                {sortedData.map(diary => <DiaryItem
                    key={diary.id}
                    {...diary}
                />)}
            </div>
        </div>
    )
}

export default DiaryList