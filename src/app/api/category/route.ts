import { NextRequest, NextResponse } from "next/server";

// Define a type for the expected data structure
interface CategoryData {
  id: number;
  name: string;
  slug: string;
}

interface ApiResponse {
  data: CategoryData[];
}

// Handler function for GET requests
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const response = await fetch('https://ofc-ecom-web.exceloid.in/api/options/categories');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();
    const data = result.data;
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 }
    );
  }
}
