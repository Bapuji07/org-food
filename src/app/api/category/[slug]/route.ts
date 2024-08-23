import { NextRequest, NextResponse } from "next/server";

// Function to search for slug in nested categories
function findCategoryBySlug(categories: any[], slug: string, returnParent: boolean, parent: any = null): any | null {
    // console.log('Searching in categories:', categories);
    console.log('Searching for slug:', slug, 'with returnParent:', returnParent);

    for (const category of categories) {
        // If the current category matches and has children, return it
        if (category.slug === slug && category.children?.length > 0) {
            // console.log('Found matching category with children:', category);
            return category;
        }

        // If the current category matches but has no children (leaf node)
        if (category.slug === slug && (!category.children || category.children.length === 0)) {
            // console.log('Found leaf node category:', category, 'Returning parent:', returnParent ? parent : category);
            return returnParent ? parent : category;
        }

        // Recursively search in the children categories
        if (category.children && category.children.length > 0) {
            const foundCategory = findCategoryBySlug(category.children, slug, returnParent, category);  // Pass parent here
            if (foundCategory) {
                return foundCategory;
            }
        }
    }
    return null;
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const url = new URL(req.url);

    // Get returnParent as a string and convert it to boolean
    const returnParentParam = url.searchParams.get('returnParent');
    const returnParent = returnParentParam === 'true';  // Convert to boolean based on "true"


    if (!slug) {
        return NextResponse.json({ message: 'Category slug is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://ofc-ecom-web.exceloid.in/api/options/categories/${slug}`);

        if (!response.ok) {
            throw new Error(`Error fetching category: ${response.statusText}`);
        }

        const result = await response.json();
        const categories = result.data.children;

        // First, check if the response itself is the category we want
        if (result.data.slug === slug) {
            // console.log('Found root category:', result.data);
            return NextResponse.json(result.data, { status: 200 });
        }

        // If not, search in the nested categories
        const foundCategory = findCategoryBySlug(categories, slug, returnParent);
        if (!foundCategory) {
            console.log('Category not found');
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(foundCategory, { status: 200 });
    } catch (err) {
        console.error('Error fetching category:', err);
        return NextResponse.json({ message: 'Error in fetching category' }, { status: 500 });
    }
}
