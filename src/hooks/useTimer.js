import { useCallback, useEffect, useRef, useState } from 'react'
import { getRequestNotificationPermission } from '@/utils/getRequestNotificationPermission.js'

const audioAlert = new Audio('./audio/notification.mp3')

export const useTimer = () => {
  const [timerState, setTimerState] = useState({
    isRunning: false,
    initialTime: 25,
    timeLeft: 25 * 60,
    goals: 0,
    rounds: 0,
  })
  const [isAudioPermissionGranted, setIsAudioPermissionGranted] =
    useState(false)
  const intervalRef = useRef(null)
  const endTimeRef = useRef(null)

  const toggleStartPause = useCallback(
    () =>
      setTimerState((prev) => ({
        ...prev,
        isRunning: !prev.isRunning,
      })),
    [],
  )

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimerState((prev) => ({
      ...prev,
      timeLeft: prev.initialTime * 60,
      isRunning: false,
    }))
  }, [timerState.initialTime])

  const changeInitialTime = useCallback((time) => {
    setTimerState((prev) => ({
      ...prev,
      initialTime: time,
    }))
  }, [])

  const completeGoal = useCallback(() => {
    resetTimer()
    isAudioPermissionGranted
      && audioAlert.play().catch((error) => new Error(error))
    updateTimerDetailsValue()
    alert('Goal is compelete')
  }, [timerState.initialTime])

  const updateTimerDetailsValue = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      rounds: (() => {
        if (prev.goals === 11) {
          if (prev.rounds === 3) {
            return 0
          }
          return prev.rounds + 1
        }
        return prev.rounds
      })(),
      goals: prev.goals === 11 ? 0 : prev.goals + 1,
    }))
  }, [])

  useEffect(() => {
    getRequestNotificationPermission()
      .then((result) => setIsAudioPermissionGranted(result))
      .catch(() => setIsAudioPermissionGranted(false))
  }, [])

  useEffect(() => {
    resetTimer()
  }, [timerState.initialTime])

  useEffect(() => {
    if (!timerState.isRunning) return

    endTimeRef.current = Date.now() + timerState.timeLeft * 1000

    intervalRef.current = setInterval(() => {
      const remainingTime = Math.round((endTimeRef.current - Date.now()) / 1000)

      if (remainingTime < 0) {
        completeGoal()
        return
      }

      setTimerState((prev) => ({
        ...prev,
        timeLeft: remainingTime,
      }))
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [timerState.initialTime, timerState.timeLeft, timerState.isRunning])

  return {
    initialTime: timerState.initialTime,
    isRunning: timerState.isRunning,
    toggleStartPause,
    changeInitialTime,
    timeLeft: timerState.timeLeft,
    goals: timerState.goals,
    rounds: timerState.rounds,
  }
}
