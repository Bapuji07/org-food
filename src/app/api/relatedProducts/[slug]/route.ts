import { NextRequest,NextResponse } from "next/server";
export async function GET(req: NextRequest,{ params }: { params: { slug: string } }): Promise<NextResponse> {
    const { slug } = params;
    if (!slug) {
        return NextResponse.json({ message: 'product id is required' }, { status: 400 });
    }


    try {
      const response = await fetch(`https://ofc-ecom-web.exceloid.in/api/products/${slug}/related`);
  
    //   if (!response.ok) {
    //     throw new Error(`Failed to fetch: ${response.statusText}`);
    //   }
  
      const result = await response.json();
      console.log(result,'related product')
      return NextResponse.json(result, { status: 200 });
  
    } catch (error) {
      console.error('Error fetching related products:', error);
      return NextResponse.json(
        { message: 'Error fetching related products' },
        { status: 500 }
      );
    }
  }