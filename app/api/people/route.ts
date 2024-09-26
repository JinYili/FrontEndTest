import { NextRequest, NextResponse } from 'next/server'; 
export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const people =  await response.json(); 
    return new NextResponse(JSON.stringify(people), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    const error_response = {
      status: 'error',
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
