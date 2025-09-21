import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <Box sx={{ p:3}}>
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
        <Typography variant="h4" sx={{ mb:2, fontWeight:800 }}>About AutoToll IQ</Typography>
      </motion.div>
      <Card>
        <CardContent>
          <Typography>
            AutoToll IQ is a modern, animated analytics dashboard for evaluating electric vehicle trends and toll-system readiness. It features routed pages, Redux state, light/dark theming, animated charts, and an interactive map.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
