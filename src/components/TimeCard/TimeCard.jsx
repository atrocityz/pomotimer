import { memo } from 'react'

import './TimeCard.scss'

export const TimeCard = memo(({ value }) => {
  const formattedValue = value.toString().padStart(2, '0')

  return (
    <div className="timer-card">
      <time className="timer-card__time">{formattedValue}</time>
    </div>
  )
})
