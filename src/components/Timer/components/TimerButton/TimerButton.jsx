import { Pause, Play } from 'lucide-react'
import classNames from 'classnames'
import { memo, useMemo } from 'react'

import './TimerButton.scss'
import { useTimerActions } from '@/hooks/useTimerActions.js'

export const TimerButton = memo((props) => {
  const { isTimerEnabled } = props

  const { toggleTimer } = useTimerActions()

  const title = useMemo(
    () => (isTimerEnabled ? 'Pause timer' : 'Start timer'),
    [isTimerEnabled],
  )

  return (
    <button
      className={classNames('timer-button', {
        'timer-button--play': !isTimerEnabled,
      })}
      type="button"
      onClick={toggleTimer}
      title={title}
      aria-label={title}
    >
      {isTimerEnabled ? <Pause size={56} /> : <Play size={56} />}
    </button>
  )
})
