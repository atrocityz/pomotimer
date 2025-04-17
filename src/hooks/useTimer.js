import { useCallback, useEffect, useState } from 'react'
import { getRequestNotificationPermission } from '@/utils/getRequestNotificationPermission.js'

const audioAlert = new Audio('./audio/notification.mp3')

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [initialTime, setInitialTime] = useState(25)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [currentMinutes, setCurrentMinutes] = useState(initialTime)
  const [goals, setGoals] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false)

  const toggleStartPause = useCallback(
    () => setIsRunning((status) => !status),
    [],
  )

  const changeInitialTime = useCallback((time) => {
    setInitialTime(time)
  }, [])

  const completeGoal = useCallback(() => {
    setIsRunning(false)
    audioPermissionGranted
      && audioAlert.play().catch((error) => new Error(error))
    alert('Goal is compelete')
    updateTimerDetailsValue()
    setCurrentMinutes(initialTime)
  }, [initialTime])

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
    if (!initialTime) return

    setCurrentMinutes(initialTime)
    setCurrentSeconds(0)
    setIsRunning(false)
  }, [initialTime])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setCurrentSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setCurrentMinutes((prevMinutes) => {
            const minutes = prevMinutes - 1

            if (minutes < 0) {
              return completeGoal()
            }

            return minutes
          })

          return currentMinutes <= 0 ? 0 : 59
        }

        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, currentMinutes])

  return {
    initialTime,
    isRunning,
    toggleStartPause,
    changeInitialTime,
    currentMinutes,
    currentSeconds,
    goals,
    rounds,
  }
}
