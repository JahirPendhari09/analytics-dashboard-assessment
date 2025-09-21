import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function CityBar({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" hide />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#9575cd" isAnimationActive animationDuration={700} radius={[8,8,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
