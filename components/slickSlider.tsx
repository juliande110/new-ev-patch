// components/Slider.tsx
import React from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface SliderProps extends Settings {
  children: React.ReactNode
}

const SlickSlider: React.FC<SliderProps> = ({ children, ...props }) => {
  return <Slider {...props}>{children}</Slider>
}

export default SlickSlider
