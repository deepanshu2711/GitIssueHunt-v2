import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export function middleware(request:NextRequest){
    // 1.Get the auth token from cookies.
  const sessionToken = request.cookies.get('__Secure-next-auth.session-token') || request.cookies.get('next-auth.session-token');

    // 2. If ther's no token and user is trying to access a protected route 
    if(!sessionToken){
        // Redirect them to the login page
        const loginUrl = new URL('/login',request.url);
        return NextResponse.redirect(loginUrl);
    }
    // 3. If the tken exists let them proceed.
    return NextResponse.next();
}

export const config = {
    matcher:[
        '/dashboard',
        '/issues',
        '/repositories'
    ]
}