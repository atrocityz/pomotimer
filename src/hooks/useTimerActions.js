import { useContext } from 'react'
import { TimerActionsContext } from '@/contexts/TimerContext.jsx'

export const useTimerActions = () => {
  const timerContext = useContext(TimerActionsContext)

  if (!timerContext)
    throw new Error(
      'useTimer must be used within a TimerActionsContextProvider',
    )

  return timerContext
}
