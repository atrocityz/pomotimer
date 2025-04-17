import './TimerDisplay.scss'
import { TimeCard } from '@/components/TimeCard/TimeCard.jsx'

export const TimerDisplay = ({ minutesValue, secondsValue }) => {
  return (
    <div className="timer-display">
      <TimeCard value={minutesValue} />
      <span className="timer-display__divider" aria-hidden={true}>
        :
      </span>
      <TimeCard value={secondsValue} />
    </div>
  )
}
