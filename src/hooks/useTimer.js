import { useCallback, useEffect, useRef, useState } from 'react'
import { getRequestNotificationPermission } from '@/utils/getRequestNotificationPermission.js'

const audioAlert = new Audio('./audio/notification.mp3')

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [initialTime, setInitialTime] = useState(25)
  const [timeLeft, setTimeLeft] = useState(initialTime * 60)
  const [goals, setGoals] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false)
  const intervalRef = useRef(null)
  const endTimeRef = useRef(null)

  const toggleStartPause = useCallback(
    () => setIsRunning((status) => !status),
    [],
  )

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimeLeft(initialTime * 60)
    setIsRunning(false)
  }, [initialTime])

  const changeInitialTime = useCallback((time) => {
    setInitialTime(time)
  }, [])

  const completeGoal = useCallback(() => {
    resetTimer()
    audioPermissionGranted
      && audioAlert.play().catch((error) => new Error(error))
    updateTimerDetailsValue()
    alert('Goal is compelete')
  }, [initialTime])

  const updateTimerDetailsValue = useCallback(() => {
    setGoals((prevGoals) => {
      const isLastGoal = prevGoals === 10

      if (isLastGoal) {
        setRounds((prevRounds) => (prevRounds === 3 ? 0 : prevRounds + 1))
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
    resetTimer()
  }, [initialTime])

  useEffect(() => {
    if (!isRunning) return

    endTimeRef.current = Date.now() + timeLeft * 1000

    intervalRef.current = setInterval(() => {
      const remainingTime = Math.round((endTimeRef.current - Date.now()) / 1000)

      if (remainingTime <= 0) {
        completeGoal()
        return
      }

      setTimeLeft(remainingTime)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, timeLeft])

  return {
    initialTime,
    isRunning,
    toggleStartPause,
    changeInitialTime,
    currentMinutes: Math.floor(timeLeft / 60),
    currentSeconds: timeLeft % 60,
    goals,
    rounds,
  }
}
