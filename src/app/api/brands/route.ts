import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch('https://ofc-ecom-web.exceloid.in/api/options/brands');

    if (!response.ok) {
      throw new Error('Failed to fetch brand names');
    }

    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('Error fetching brand names:', err);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
