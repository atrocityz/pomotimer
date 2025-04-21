import { Pause, Play } from 'lucide-react'
import classNames from 'classnames'
import { memo, useMemo } from 'react'

import './Button.scss'
import { ProgressBar } from '@/components/'

export const Button = memo(
  ({ isTimerRunning, onClick, timerValue, initialTime }) => {
    const title = useMemo(
      () => (isTimerRunning ? 'Pause timer' : 'Start timer'),
      [isTimerRunning],
    )

    return (
      <button
        className={classNames('timer-button', {
          'timer-button--play': !isTimerRunning,
        })}
        type="button"
        onClick={onClick}
        title={title}
        aria-label={title}
      >
        {isTimerRunning ? <Pause size={56} /> : <Play size={56} />}
        <ProgressBar initialTime={initialTime * 60} timerValue={timerValue} />
      </button>
    )
  },
)
