import { memo } from 'react'

import './Details.scss'

export const Details = memo(({ goalsValue, roundsValue }) => {
  return (
    <div className="timer-details">
      <div className="timer-details__count">
        <span className="timer-details__count-number">{`${roundsValue}/4`}</span>
        <span className="timer-details__count-name">round</span>
      </div>
      <div className="timer-details__count">
        <span className="timer-details__count-number">{`${goalsValue}/12`}</span>
        <span className="timer-details__count-name">goal</span>
      </div>
    </div>
  )
})
