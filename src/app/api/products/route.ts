import { NextRequest, NextResponse } from "next/server";

// Handler function for GET requests
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract categoryId from query parameters
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const page = searchParams.get('page');

    if (!categoryId) {
      return NextResponse.json(
        { message: 'Category ID is required' },
        { status: 400 }
      );
    }
    // console.log(categoryId,'ooo')

    // Fetch products based on categoryId
    const response = await fetch(`https://ofc-ecom-web.exceloid.in/api/products?size=16&page=${page}&category=${categoryId}&orderDirection=asc`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const result = await response.json();
    const data = result.data;
    
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error fetching products' },
      { status: 500 }
    );
  }
}
