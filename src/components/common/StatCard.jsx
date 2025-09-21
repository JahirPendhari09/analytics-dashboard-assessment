import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { motion } from 'framer-motion'

export default function StatCard({ title, value, footer, accent='primary.main' }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type:'spring', stiffness:260, damping:18 }}>
      <Card variant="outlined" sx={{ backgroundColor: 'background.paper', borderRadius: 1, textAlign:"center" }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ color:'text.secondary', mb: 0.5 }}>{title}</Typography>
          <Typography variant="h4" sx={{ color: accent, fontWeight: 800 }}>{value}</Typography>
          {footer && <Box sx={{ mt: 1 }}>{footer}</Box>}
        </CardContent>
      </Card>
    </motion.div>
  )
}
