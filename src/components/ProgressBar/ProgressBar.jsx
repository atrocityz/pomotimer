import './ProgressBar.scss'
import { useCallback, useMemo, useRef } from 'react'
import { getCircleLength } from '@/utils/getCircleLength.js'

export const ProgressBar = ({ timerValue, initialTime }) => {
  const circleRef = useRef(null)

  const circleLength = useMemo(() => {
    if (!circleRef.current) return 0

    return getCircleLength(circleRef.current)
  }, [circleRef.current])

  const countProgressBarLength = useCallback(() => {
    return Math.round(circleLength * (timerValue / initialTime))
  }, [timerValue, initialTime, circleLength])

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
            strokeDasharray: circleLength,
            strokeDashoffset: countProgressBarLength(),
          }}
        />
      </svg>
    </span>
  )
}
