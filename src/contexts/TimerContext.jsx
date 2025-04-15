import { createContext, useCallback, useMemo, useState } from 'react'

export const TimerContext = createContext()
export const TimerActionsContext = createContext()

export const TimerProvider = (props) => {
  const { children } = props

  const [timerEnabled, setTimerEnabled] = useState(false)
  const [selectedTime, setSelectedTime] = useState(25)

  const changeTimerValue = useCallback((time) => {
    setSelectedTime(time)
  }, [])

  const toggleTimer = useCallback((status) => {
    setTimerEnabled(status)
  }, [])

  const value = useMemo(
    () => ({
      selectedTime,
      timerEnabled,
    }),
    [selectedTime, timerEnabled],
  )

  const actions = useMemo(
    () => ({
      changeTimerValue,
      toggleTimer,
    }),
    [changeTimerValue, toggleTimer],
  )

  return (
    <TimerContext.Provider value={value}>
      <TimerActionsContext.Provider value={actions}>
        {children}
      </TimerActionsContext.Provider>
    </TimerContext.Provider>
  )
}
