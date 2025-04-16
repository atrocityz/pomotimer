import { createContext, useCallback, useMemo, useState } from 'react'

export const TimerContext = createContext()
export const TimerActionsContext = createContext()

export const TimerProvider = (props) => {
  const { children } = props

  const [isTimerEnabled, setTimerEnabled] = useState(false)
  const [selectedTime, setSelectedTime] = useState(25)

  const changeTimerValue = useCallback((time) => {
    setSelectedTime(time)
  }, [])

  const toggleTimer = useCallback(() => {
    setTimerEnabled((status) => !status)
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerEnabled(false)
  }, [])

  const value = useMemo(
    () => ({
      selectedTime,
      isTimerEnabled,
    }),
    [selectedTime, isTimerEnabled],
  )

  const actions = useMemo(
    () => ({
      changeTimerValue,
      pauseTimer,
      toggleTimer,
    }),
    [],
  )

  return (
    <TimerContext.Provider value={value}>
      <TimerActionsContext.Provider value={actions}>
        {children}
      </TimerActionsContext.Provider>
    </TimerContext.Provider>
  )
}
