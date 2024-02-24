import { NextRequest, NextResponse } from 'next/server';
import { decodeSecret } from '../../../helper';
export async function GET(request: NextRequest) {
  try {
    const response = fetch(process.env.SECRET_URL || '');
    const { message } = await (await response).json();
    const points = decodeSecret(message);
    return new NextResponse(points, {
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
