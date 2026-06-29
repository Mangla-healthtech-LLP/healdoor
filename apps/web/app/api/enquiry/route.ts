import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, mobile, service, location, message, sourceUrl, productSlug } = body;

    // Format mobile to E.164. e.g. +91XXXXXXXXXX
    let formattedMobile = mobile.replace(/\s+/g, '');
    if (!formattedMobile.startsWith('+')) {
      // Assuming Indian number if no country code provided
      formattedMobile = `+91${formattedMobile.replace(/\D/g, '')}`;
    } else {
      // Keep the '+' but remove other non-digits
      formattedMobile = `+${formattedMobile.replace(/\D/g, '')}`;
    }

    const payloadData = {
      name,
      mobile: formattedMobile,
      service_slug_history: service || "Unknown Service",
      product_slug: productSlug || "",
      location: location || "Unknown Location",
      message: message || "",
      source_url: sourceUrl || "Website",
    };

    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

    const response = await fetch(`${cmsUrl}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Payload CMS error:", errorData);
      throw new Error(`Failed to save to CMS: ${response.status} ${response.statusText}`);
    }
    
    return NextResponse.json({ success: true, message: "Enquiry received successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing enquiry:", error);
    return NextResponse.json({ success: false, message: "Failed to process enquiry" }, { status: 500 });
  }
}
