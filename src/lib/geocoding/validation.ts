// Louisville Metro approximate bounding box (Jefferson County + surrounding)
export const LOUISVILLE_BOUNDS = {
  minLon: -85.966,
  minLat: 37.991,
  maxLon: -85.414,
  maxLat: 38.362,
} as const

// Louisville center for proximity bias in geocoding
export const LOUISVILLE_CENTER = {
  lon: -85.7585,
  lat: 38.2527,
} as const

export function isWithinLouisville(lon: number, lat: number): boolean {
  return (
    lon >= LOUISVILLE_BOUNDS.minLon &&
    lon <= LOUISVILLE_BOUNDS.maxLon &&
    lat >= LOUISVILLE_BOUNDS.minLat &&
    lat <= LOUISVILLE_BOUNDS.maxLat
  )
}
