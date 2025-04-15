import './Content.scss'
import { Timer } from '@/components/Timer/Timer.jsx'
import { TimerProvider } from '@/contexts/TimerContext.jsx'

export const Content = () => {
  return (
    <div className="content container">
      <TimerProvider>
        <Timer />
      </TimerProvider>
    </div>
  )
}
