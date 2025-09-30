import {NextRequest, NextResponse} from 'next/server'
import Backendless from '@/lib/backendless'

export async function POST(req: NextRequest){
    try{
        // 01. Get data from request
        const data = await req.json();
        console.log(data);

        // 02. Checking data into database
        const response = await Backendless.UserService.login(
            data?.username,
            data?.password,
            false
        );
        console.log(response);

        // 03. Sending Response
        return NextResponse.json({
            message: 'Successfully login account',
            data: response,
        });
    } catch(error: any){
        return NextResponse.json({
            message: error?.message,
        });
    }
}


/*  MEDIA PENGIRIMAN DATA DI HTTP REQUEST:
    1. Body
    2. Header
*/