
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useSelector } from 'react-redux'
import { selectMapPoints } from '../store/selectors'
import { Card, CardContent, Typography } from '@mui/material'

const markerIcon = new L.Icon({
  iconUrl: '/assets/marker-icon.png',
  iconRetinaUrl: '/assets/marker-icon.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function MapView(){
  const points = useSelector(selectMapPoints)
  const center = points.length ? [points[0].lat, points[0].lng] : [47.6062, -122.3321]

  return (
    <Card sx={{p:3}}>
      <CardContent>
        <Typography variant="h6" sx={{ mb:1 }}>EV Usage by City (WA)</Typography>
        <MapContainer center={center} zoom={7} style={{ height: 480, width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          {points.map((p,i)=> (
            <Marker key={i} position={[p.lat, p.lng]} icon={markerIcon}>
              <Popup>
                <b>{p.city || 'Unknown'}</b><br/>
                {p.location || '—'}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <Typography variant="caption" sx={{ mt:1, display:'block' }}>* Zoom to explore counts per zone</Typography>
      </CardContent>
    </Card>
  )
}

