import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectWaCount, selectMostSoldBrand, selectYearRangeAndGrowth, selectCafvData, selectYearCountData, selectCityCountData, selectEvTypeData, selectBrandLineData, selectTopModelDistribution } from '../store/selectors'
import { fetchEVData } from '../store/actions'
import StatCard from '../components/common/StatCard'
import AnimatedNumber from '../components/common/AnimatedNumber'
import YearBar from '../components/charts/YearBar'
import CityBar from '../components/charts/CityBar'
import CafvPie from '../components/charts/CafvPie'
import EvTypePie from '../components/charts/EvTypePie'
import BrandLine from '../components/charts/BrandLine'
import  '../App.css'

export default function Overview(){
  const dispatch = useDispatch()
  const status = useSelector(s=>s.data.status)

  useEffect(()=>{ if(status==='idle') dispatch(fetchEVData()) }, [status, dispatch])

  const waCount = useSelector(selectWaCount)
  const topBrand = useSelector(selectMostSoldBrand)
  const { range, growth } = useSelector(selectYearRangeAndGrowth)
  const cafv = useSelector(selectCafvData)
  const years = useSelector(selectYearCountData)
  const cities = useSelector(selectCityCountData)
  const evTypes = useSelector(selectEvTypeData)
  const brandLine = useSelector(selectBrandLineData)
  const topModels = useSelector(selectTopModelDistribution)

  if(status==='loading'){
    return <LinearProgress />
  } 
  if(status==='failed') {
    return <Typography color="error">Failed to load data.</Typography>
  }

  return (
    <Box  sx={{ p:3, backgroundColor: 'background.default', minHeight:'100%', pb: 4, width: '100%' }}>
      <div className='card-item' id='item-1'>
        <Grid item xs={12} md={3} width={'100%'}>
          <StatCard title="Total EVs (WA)" value={<AnimatedNumber value={waCount} />} />
        </Grid>
        <Grid item xs={12} md={3} width={'100%'}>
          <StatCard title="Top Brand" value={topBrand||'—'} />
        </Grid>
        <Grid item xs={12} md={3} width={'100%'}>
          <StatCard title={`Growth (${range||'N/A'})`} value={<><AnimatedNumber value={growth} precision={2}/> %</>} />
        </Grid>
        <Grid item xs={12} md={3} width={'100%'}>
          <StatCard title="CAFV Count" value={<AnimatedNumber value={cafv.reduce((s,x)=>s+x.value,0)} />} />
        </Grid>
      </div>
      <div className='card-item'>
        <Grid item xs={12} md={6} sx={{  width:"100%"}}>
          <Card>
            <CardContent>
              <Typography variant="h6">EV Count by Year</Typography>
              <YearBar data={years} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} sx={{ width:"100%"}}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb:1 }}>EV Distribution by City</Typography>
              <CityBar data={cities} />
            </CardContent>
          </Card>
        </Grid>
      </div>

      <div className='card-item'>
        <Grid item xs={12} md={6} sx={{ width:"100%"}}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb:1 }}>CAFV Eligibility</Typography> 
              <CafvPie data={cafv} /> 
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} sx={{  width:"100%"}}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb:1 }}>EV Types</Typography>
              <EvTypePie data={evTypes} />
            </CardContent>
          </Card>
        </Grid>
      </div>

      <div className='card-item' >
        <Grid item xs={12} md={6} sx={{ width:"100%"}}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb:1 }}>Brand Distribution</Typography>
              <BrandLine data={brandLine} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} sx={{ width:"100%"}}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb:1 }}>Top 5 Model Distribution</Typography>
              {topModels.map((m,i)=> (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>{m.brandModel} ({m.percentage}%)</Typography>
                  <LinearProgress variant="determinate" value={m.percentage} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </div>
    </Box>
  )
}

