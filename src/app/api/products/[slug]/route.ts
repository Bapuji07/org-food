import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = params;

    if (!slug) {
        return NextResponse.json({ message: 'Product slug is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://ofc-ecom-web.exceloid.in/api/products/slug/${slug}`);

        if (!response.ok) {
            return NextResponse.json({ message: `Failed to fetch product details: ${response.statusText}` }, { status: response.status });
        }

        const result = await response.json();
        const product = result.data;
        const productsArray = [product];


        return NextResponse.json(productsArray, { status: 200 });
    } catch (err) {
        console.error('Error fetching ProductDetails:', err);
        return NextResponse.json({ message: 'Internal server error while fetching product details' }, { status: 500 });
    }
}
