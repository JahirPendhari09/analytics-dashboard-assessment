import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function YearBar({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="yearGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7e57c2" stopOpacity={1}/>
            <stop offset="100%" stopColor="#5e35b1" stopOpacity={1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar isAnimationActive dataKey="count" fill="url(#yearGrad)" animationBegin={80} animationDuration={800} radius={[8,8,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}