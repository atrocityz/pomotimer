import './ProgressBar.scss'
import { useCallback, useMemo, useRef } from 'react'

export const ProgressBar = ({ timerValue, initialTime }) => {
  const circleRef = useRef(null)

  const getCircleLength = useCallback(() => {
    if (!circleRef.current) return 0

    return Math.round(2 * Math.PI * circleRef.current.r.baseVal.value)
  }, [])

  const getProgressBarLength = useCallback(() => {
    if (!circleRef.current) return 0

    return Math.round(getCircleLength() * (timerValue / initialTime))
  }, [timerValue, initialTime])

  const isTimerWasLaunched = useMemo(() => {
    return timerValue !== initialTime
  }, [timerValue])

  return (
    <span className="progress-bar">
      <svg viewBox="0 0 120 120" className="progress-bar__svg">
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r="54"
          className="progress-bar__value"
          style={{
            stroke: isTimerWasLaunched ? 'var(--color-white)' : 'transparent',
            strokeDasharray: getCircleLength(),
            strokeDashoffset: getProgressBarLength(),
          }}
        />
      </svg>
    </span>
  )
}
