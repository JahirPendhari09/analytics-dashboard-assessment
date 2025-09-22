import { Box, Typography } from '@mui/material'
import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts'

export default function EvTypePie({ data }) {
  const colors = ['#311b92', '#5e35b1']
  return ( <>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={90} label={({percent})=>`${(percent*100).toFixed(0)}%`} isAnimationActive>
          {data.map((_,i)=>(<Cell key={i} fill={colors[i%colors.length]} />))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <Box sx={{ marginTop: 2 }}>
      {data.map((entry, index) => (
        <Box key={`legend-${index}`} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ width: 12, height: 12, backgroundColor: ['#5e35b1', '#311b92', '#b388ff'][index], marginRight: 1 }} />
            <Typography sx={{ color: ['#5e35b1', '#311b92', '#b388ff'][index] }}>
              {entry.name}: {entry.value}
            </Typography>
        </Box>
      ))}
    </Box>
    </>
  )
}
