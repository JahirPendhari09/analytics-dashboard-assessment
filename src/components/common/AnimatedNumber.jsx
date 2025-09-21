import React from 'react'
import { useSpring, animated } from '@react-spring/web'

export default function AnimatedNumber({ value, precision=0 }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: Number(value)||0,
    config: { mass:1, tension:170, friction:20 },
  })
  return <animated.span>{number.to(n=> (Number(n).toFixed(precision)))}</animated.span>
}