import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, NEXT_PUBLIC_CLOUDINARY_API_SECRET } = process.env;

  const { searchParams } = new URL(request.url);
  const nextCursor = searchParams.get("nextCursor") || null;

  const cloudinaryUrl = new URL(`https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload`);
  cloudinaryUrl.searchParams.append("max_results", "15");
  if (nextCursor) cloudinaryUrl.searchParams.append("next_cursor", nextCursor);

  const auth = Buffer.from(`${NEXT_PUBLIC_CLOUDINARY_API_KEY}:${NEXT_PUBLIC_CLOUDINARY_API_SECRET}`).toString("base64");

  try {
    const cloudRes = await fetch(cloudinaryUrl.toString(), {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await cloudRes.json();

    const hasNext = data.next_cursor ? true : false;

    return NextResponse.json({
      resources: data.resources,
      next_cursor: hasNext ? data.next_cursor : null,
    });
  } catch (err) {
    console.error("Cloudinary API error:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}


// export async function DELETE(request: Request) {
//   const { public_id } = await request.json();

//   try {
//     const result = await cloudinary.uploader.destroy(public_id);
    
//     if (result.result === "ok") {
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json(
//         { error: "Failed to delete image" }, 
//         { status: 400 }
//       );
//     }
//   } catch (err) {
//     console.error("Cloudinary delete error:", err);
//     return NextResponse.json(
//       { error: "Failed to delete image" }, 
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(request: Request) {
  const { public_id } = await request.json();

  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      invalidate: true // Optional: invalidates CDN cache
    });
    
    if (result.result === "ok") {
      return NextResponse.json({ success: true });
    } else {
      console.error('Cloudinary delete failed:', result);
      return NextResponse.json(
        { error: result.result || "Failed to delete image" }, 
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete image" }, 
      { status: 500 }
    );
  }
}
