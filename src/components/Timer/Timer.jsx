import { useCallback, useEffect, useState } from 'react'
import { useTimer } from '@/hooks/useTimer.js'
import { useTimerActions } from '@/hooks/useTimerActions.js'

import './Timer.scss'
import { TimerCarousel } from './components/TimerCarousel/TimerCarousel.jsx'
import { TimerCard } from './components/TimerCard/TimerCard.jsx'
import { TimerButton } from './components/TimerButton/TimerButton.jsx'
import { TimerDetails } from './components/TimerDetails/TimerDetails.jsx'
import { getRequestNotificationPermission } from '@/utils/getRequestNotificationPermission.js'

const audioAlert = new Audio('./audio/notification.mp3')

export const Timer = () => {
  const { selectedTime, isTimerEnabled } = useTimer()
  const { pauseTimer } = useTimerActions()

  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [currentMinutes, setCurrentMinutes] = useState(selectedTime)
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false)
  const [goals, setGoals] = useState(0)
  const [rounds, setRounds] = useState(0)

  const updateTimerDetailsValue = useCallback(() => {
    setGoals((prevGoals) => {
      if (prevGoals === 11) {
        setRounds((prevRounds) => {
          if (prevRounds === 3) {
            return 0
          }

          return prevRounds + 1
        })

        return 0
      }
      return prevGoals + 1
    })
  }, [])

  useEffect(() => {
    getRequestNotificationPermission(setAudioPermissionGranted).catch(
      (error) => new Error(error),
    )
  }, [])

  useEffect(() => {
    setCurrentMinutes(selectedTime)
    setCurrentSeconds(0)
    pauseTimer()
  }, [selectedTime])

  useEffect(() => {
    if (!isTimerEnabled) return

    const interval = setInterval(() => {
      setCurrentSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setCurrentMinutes((prevMinutes) => {
            const minutes = prevMinutes - 1

            if (minutes < 0) {
              pauseTimer(false)
              updateTimerDetailsValue()
              audioPermissionGranted
                && audioAlert.play().catch((error) => new Error(error))
              alert('Goal is end')

              return selectedTime
            }

            return minutes
          })

          return currentMinutes <= 0 ? 0 : 59
        }

        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerEnabled, currentMinutes])

  return (
    <div className="timer-wrapper">
      <div className="timer">
        <TimerCard value={currentMinutes} />
        <span className="timer__divider" aria-hidden={true}>
          :
        </span>
        <TimerCard value={currentSeconds} />
      </div>
      <TimerCarousel selectedTime={selectedTime} />
      <TimerButton isTimerEnabled={isTimerEnabled} />
      <TimerDetails roundsValue={rounds} goalsValue={goals} />
    </div>
  )
}
