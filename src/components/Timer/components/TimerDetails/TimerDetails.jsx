import { memo } from 'react'

import './TimerDetails.scss'

export const TimerDetails = memo((props) => {
  const { roundsValue, goalsValue } = props

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
