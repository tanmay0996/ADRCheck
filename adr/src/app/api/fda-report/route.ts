// src/app/api/fda-report/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const drug = searchParams.get('drug');

  if (!drug) {
    return NextResponse.json({ error: 'Drug query parameter is required' }, { status: 400 });
  }

  try {
    // Build the endpoint using the provided drug name
    const endpoint = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(drug)}"`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data from FDA API' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
