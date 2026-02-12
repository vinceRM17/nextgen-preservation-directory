import { isWithinLouisville, LOUISVILLE_CENTER } from './validation'

export type GeocodeResult = {
  success: true
  data: {
    coordinates: { x: number; y: number } // lon, lat (x=lon, y=lat for PostGIS)
    formattedAddress: string
  }
} | {
  success: false
  error: string
}

export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const token = process.env.MAPBOX_ACCESS_TOKEN

  if (!token) {
    console.error('MAPBOX_ACCESS_TOKEN not configured')
    return {
      success: false,
      error: 'Geocoding service not configured. Please contact admin.',
    }
  }

  try {
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedAddress}&proximity=${LOUISVILLE_CENTER.lon},${LOUISVILLE_CENTER.lat}&limit=1&country=us&access_token=${token}`

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache geocoding results for 1 hour
    })

    if (!response.ok) {
      if (response.status === 429) {
        return { success: false, error: 'Geocoding rate limit exceeded. Please try again later.' }
      }
      return { success: false, error: 'Geocoding service unavailable. Please try again.' }
    }

    const data = await response.json()

    if (!data.features || data.features.length === 0) {
      return {
        success: false,
        error: 'Address not found. Please check the address and try again.',
      }
    }

    const feature = data.features[0]
    const [lon, lat] = feature.geometry.coordinates

    // Validate within Louisville Metro bounds
    if (!isWithinLouisville(lon, lat)) {
      return {
        success: false,
        error: 'Address must be within the Louisville Metro area.',
      }
    }

    const formattedAddress =
      feature.properties?.full_address ||
      feature.properties?.name ||
      address

    return {
      success: true,
      data: {
        coordinates: { x: lon, y: lat },
        formattedAddress,
      },
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    return {
      success: false,
      error: 'Geocoding failed. Please try again.',
    }
  }
}
