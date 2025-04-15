import { memo } from 'react'

import './TimerCard.scss'

export const TimerCard = memo((props) => {
  const { value } = props

  const formattedValue = value.toString().padStart(2, '0')

  return (
    <div className="timer-card">
      <time className="timer-card__time">{formattedValue}</time>
    </div>
  )
})
