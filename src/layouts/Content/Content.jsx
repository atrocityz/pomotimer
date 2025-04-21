import './Content.scss'
import { useTimer } from '@/hooks/useTimer.js'
import { TimerDisplay, Carousel, Button, Details } from '@/components/'

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
