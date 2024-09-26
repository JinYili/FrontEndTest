import { NextRequest, NextResponse } from 'next/server'; 
export async function GET(request: NextRequest) {
  try {
    const response = await fetch( process.env.url ||'https://jsonplaceholder.typicode.com/users');
    const people =  await response.json(); 
    return new NextResponse(JSON.stringify(people), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    const error_response = {
      status: 'error',
      message: (e as Error).message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
