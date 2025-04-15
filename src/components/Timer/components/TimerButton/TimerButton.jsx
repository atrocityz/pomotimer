import { Pause, Play } from 'lucide-react'
import { useTimer } from '@/hooks/useTimer.js'
import { useTimerActions } from '@/hooks/useTimerActions.js'
import classNames from 'classnames'
import { memo } from 'react'

import './TimerButton.scss'

export const TimerButton = memo(() => {
  const { timerEnabled } = useTimer()
  const { toggleTimer } = useTimerActions()

  const isEnabled = timerEnabled === true
  const title = isEnabled ? 'Pause timer' : 'Start timer'

  return (
    <button
      className={classNames('timer-button', {
        'timer-button--play': !isEnabled,
      })}
      type="button"
      onClick={() => toggleTimer(!isEnabled)}
      title={title}
      aria-label={title}
    >
      {timerEnabled ? <Pause size={56} /> : <Play size={56} />}
    </button>
  )
})
