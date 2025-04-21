import './Content.scss'
import { TimerDisplay } from '@/components/TimerDisplay/TimerDisplay.jsx'
import { Carousel } from '@/components/Carousel/Carousel.jsx'
import { Button } from '@/components/Button/Button.jsx'
import { Details } from '@/components/Details/Details.jsx'
import { useTimer } from '@/hooks/useTimer.js'

export const Content = () => {
  const {
    changeInitialTime,
    initialTime,
    isRunning,
    toggleStartPause,
    timeLeft,
    goals,
    rounds,
  } = useTimer()

  return (
    <main className="content container">
      <TimerDisplay
        minutesValue={Math.floor(timeLeft / 60)}
        secondsValue={timeLeft % 60}
      />
      <Carousel timerValue={initialTime} onClick={changeInitialTime} />
      <Button
        isTimerRunning={isRunning}
        onClick={toggleStartPause}
        timerValue={timeLeft}
        initialTime={initialTime}
      />
      <Details roundsValue={rounds} goalsValue={goals} />
    </main>
  )
}
