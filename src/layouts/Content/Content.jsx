import './Content.scss'
import { useTimer } from '@/hooks/useTimer.js'
import { TimerDisplay, Carousel, Button, Details } from '@/components/'

export const Content = () => {
  const {
    changeTime,
    initialTime,
    isRunning,
    toggleTimer,
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
      <Carousel timerValue={initialTime} onClick={changeTime} />
      <Button
        isTimerRunning={isRunning}
        onClick={toggleTimer}
        timerValue={timeLeft}
        initialTime={initialTime}
      />
      <Details roundsValue={rounds} goalsValue={goals} />
    </main>
  )
}
