import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import 'swiper/css'
import classNames from 'classnames'
import { memo, useMemo } from 'react'
import { useTimerActions } from '@/hooks/useTimerActions.js'

import './TimerCarousel.scss'

const timerItems = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

export const TimerCarousel = memo((props) => {
  const { selectedTime } = props
  const { changeTimerValue } = useTimerActions()

  const swiperParams = useMemo(
    () => ({
      modules: [A11y],
      centeredSlides: true,
      initialSlide: timerItems.indexOf(25),
      slidesPerView: 'auto',
      spaceBetween: 15,
      slideToClickedSlide: true,
      loop: true,
      breakpoints: {
        1023: {
          loop: false,
        },
      },
    }),
    [],
  )

  return (
    <div className="timer-carousel">
      <Swiper className="timer-carousel__slider" {...swiperParams}>
        {timerItems.map((time) => (
          <SwiperSlide className="timer-carousel__slide" key={time}>
            <button
              className={classNames('timer-carousel__button', {
                'is-active': selectedTime === time,
              })}
              type="button"
              aria-label={`Set timer to ${time} minutes`}
              onClick={() => changeTimerValue(time)}
            >
              {time}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
})
