import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    console.log('Received request with params:', params);

    const drugName = await params?.name;
    console.log('Extracted drug name:', drugName);

    // Fetch data from FDA API - search by generic name or brand name
    console.log('Sending request to FDA API...');
    const response = await fetch(
      `https://api.fda.gov/drug/label.json?search=drug_interactions:${drugName}&limit=1`
    );

    console.log(response)

    console.log('Response received from FDA API with status:', response.status);

    if (!response.ok) {
      console.log('FDA API request failed');
      return NextResponse.json(
        { error: 'Failed to fetch data from FDA API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Parsed JSON response:', data);

    // Check if results exist
    if (!data.results || data.results.length === 0) {
      console.log('No data found for the given drug.');
      return NextResponse.json(
        { error: 'No data found for this drug' },
        { status: 404 }
      );
    }

    // Extract only the fields we need
    const result = data.results[0];
    console.log('Extracted first result:', result);

    const drugInfo = {
      boxed_warning: result.boxed_warning || null,
      indications_and_usage: result.indications_and_usage || null,
      adverse_reactions: result.adverse_reactions || null,
      // Additional metadata
      generic_name: result.openfda?.generic_name?.[0] || drugName,
      brand_name: result.openfda?.brand_name?.[0] || null,
      manufacturer: result.openfda?.manufacturer_name?.[0] || 'Unknown'
    };

    console.log('Final structured drug info:', drugInfo);

    return NextResponse.json(drugInfo);
  } catch (error) {
    console.error('Error fetching drug data:', error);  
    return NextResponse.json(
      { error: `Failed to process request: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
  
}
