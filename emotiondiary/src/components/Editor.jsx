import Button from './Button'
import './Editor.css'
import EmotionItem from './EmotionItem'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const emotionList = [
  {emotionId: 1, emotionName:"완전 좋음"},
  {emotionId: 2, emotionName:"좋음"},
  {emotionId: 3, emotionName:"그럭저럭"},
  {emotionId: 4, emotionName:"나쁨"},
  {emotionId: 5, emotionName:"끔찍함"},
]

const Editor = ({onSubmit, initData}) => {
  const navigate = useNavigate()

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: ''
  })

  useEffect(()=>{
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(initData.createdDate)
      })
    }
  }, [initData])

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate')
      value = new Date(value)

    setInput({
      ...input,
      [name] : value
    })
  }

  return (
    <div className='Editor'>
      <section className='date_section'>
        <h4>오늘의 날짜</h4>
        <input 
          type='date'
          name='createdDate'
          value={input.createdDate.toISOString().substring(0, 10)}
          onChange={onChangeInput}
        />
      </section>
      <section className='emotion_section'>
        <h4>오늘의 감정</h4>
        <div className='emotion_item_list'>
          {emotionList.map(item=> 
            <EmotionItem
              key={item.emotionId} 
              {...item}
              onClick={()=>{
                const newInput = {...input, emotionId:item.emotionId}
                console.log(newInput)
                setInput(newInput)
              }}
              isSelected={item.emotionId === input.emotionId}
            />)
          }
        </div>
      </section>
      <section className='content_section'>
        <h4>오늘의 일기</h4>
        <textarea 
          name='content'
          value={input.content}
          onChange={onChangeInput}
          placeholder='오늘은 어땠나요?'/>
      </section>
      <section className='button_section'>
        <Button text={'취소하기'}
          onClick={()=>navigate(-1)}
          />
        <Button text={'작성하기'} type={'POSITIVE'}
          onClick={()=>onSubmit(input)}
          />
      </section>
    </div>
  )
}

export default Editor