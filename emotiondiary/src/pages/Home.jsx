import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'
import { useState, useContext } from 'react'
import { DiaryStateContext } from '../App'

const getMonthlyData = (data, pivotDate) => {
    const beginDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth())
    const endDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1)

    return data.filter(diary => (diary.createdDate >= beginDate) 
                             && (diary.createdDate < endDate))
}

const Home = () => {
    const data = useContext(DiaryStateContext)
    const [pivotDate, setPivotDate] = useState(new Date())

    const monthlyData = getMonthlyData(data, pivotDate)
    console.log(monthlyData)

    const goPrevMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1)
        )
    }

    const goNextMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1)
        )
    }

    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button
                    text='<'
                    onClick={goPrevMonth}
                />}
                rightChild={<Button text='>' 
                    onClick={goNextMonth}
                />}
            />
            <DiaryList data={monthlyData}/>
        </div>
    )
}

export default Home