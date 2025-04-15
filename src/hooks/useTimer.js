import { useContext } from 'react'
import { TimerContext } from '@/contexts/TimerContext.jsx'

export const useTimer = () => {
  const timerContext = useContext(TimerContext)

  if (!timerContext)
    throw new Error('useTimer must be used within a TimerContextProvider')

  return timerContext
}
