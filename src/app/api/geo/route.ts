import { NextRequest, NextResponse } from 'next/server';
import { getAllListingsWithCoordinates, getListingsInBounds } from '@/lib/queries/geo';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const north = searchParams.get('north');
    const south = searchParams.get('south');
    const east = searchParams.get('east');
    const west = searchParams.get('west');

    // If all bounds provided, use viewport filtering
    if (north && south && east && west) {
      const listings = await getListingsInBounds(
        parseFloat(north),
        parseFloat(south),
        parseFloat(east),
        parseFloat(west)
      );
      return NextResponse.json(listings);
    }

    // Otherwise return all listings with coordinates
    const listings = await getAllListingsWithCoordinates();
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Geo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}
