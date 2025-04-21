import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import 'swiper/css'
import classNames from 'classnames'
import { memo } from 'react'

import './Carousel.scss'

const timerItems = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

const swiperParams = {
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
}

export const Carousel = memo(({ onClick, timerValue }) => {
  return (
    <div className="timer-carousel">
      <Swiper className="timer-carousel__slider" {...swiperParams}>
        {timerItems.map((time) => (
          <SwiperSlide className="timer-carousel__slide" key={time}>
            <button
              className={classNames('timer-carousel__button', {
                'is-active': timerValue === time,
              })}
              type="button"
              aria-label={`Set timer to ${time} minutes`}
              onClick={() => onClick(time)}
            >
              {time}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
})
