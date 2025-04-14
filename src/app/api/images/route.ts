import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, NEXT_PUBLIC_CLOUDINARY_API_SECRET } = process.env;

  const { searchParams } = new URL(request.url);
  const nextCursor = searchParams.get("nextCursor") || null; // Get the next_cursor for pagination

  const cloudinaryUrl = new URL(`https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload`);
  cloudinaryUrl.searchParams.append("max_results", "15");  // Set max results per page (10 images)
  if (nextCursor) cloudinaryUrl.searchParams.append("next_cursor", nextCursor); // Add the cursor if available

  const auth = Buffer.from(`${NEXT_PUBLIC_CLOUDINARY_API_KEY}:${NEXT_PUBLIC_CLOUDINARY_API_SECRET}`).toString("base64");

  try {
    // Fetch images from Cloudinary API
    const cloudRes = await fetch(cloudinaryUrl.toString(), {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await cloudRes.json();

    // If there's more data (i.e., next_cursor), pass it to the response to enable pagination
    const hasNext = data.next_cursor ? true : false;

    return NextResponse.json({
      resources: data.resources, // Return the images
      next_cursor: hasNext ? data.next_cursor : null, // Return the next_cursor if available
    });
  } catch (err) {
    console.error("Cloudinary API error:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
