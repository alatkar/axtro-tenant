import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  const protectedPaths = [
    '/profile',
    '/applications',
    '/saved',
  ]

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !token) {
    const redirectUrl = new URL('/auth/signin', request.url)
    redirectUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/applications/:path*',
    '/saved/:path*',
    '/auth/:path*'
  ]
} 