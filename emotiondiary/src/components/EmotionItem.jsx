import { useState } from 'react'
import { getEmotionImage } from '../util/get-emotion-image'
import './EmotionItem.css'

const EmotionItem = ({emotionId, emotionName, onClick, isSelected}) => {

  return (
    <div 
      className={`EmotionItem 
        ${isSelected?`EmotionItem_${emotionId}_selected`:""}`}
        onClick={onClick}
      >
        <img src={getEmotionImage(emotionId)}/>
        <h4>{emotionName}</h4>
    </div>
  )
}

export default EmotionItem