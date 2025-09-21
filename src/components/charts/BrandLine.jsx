import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export default function BrandLine({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="make" hide />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#673ab7" strokeWidth={2.5} dot={false} isAnimationActive animationDuration={700} />
      </LineChart>
    </ResponsiveContainer>
  )
}
