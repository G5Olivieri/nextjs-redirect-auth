import {NextRequest, NextResponse} from "next/server";
import * as jose from 'jose'

export async function middleware(req: NextRequest) {
	if (req.cookies.has('access_token')) {
		try {
			const spki = process.env.AUTH_PUBLIC_KEY!
			const rsaPublicKey = await jose.importSPKI(spki, 'RS256')
			await jose.jwtVerify(req.cookies.get('access_token')!, rsaPublicKey, {
				issuer: 'authentication'
			})
			return NextResponse.next();
		} catch (e) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}
	const query = new URLSearchParams({
		redirect_uri: process.env.NEXT_PUBLIC_HOSTNAME + '/api/callback',
		response_type: 'code',
		client_id: process.env.AUTH_CLIENT_ID!,
	})
	const url = new URL('/login?' + query.toString(), process.env.NEXT_PUBLIC_AUTH_URL)
	return NextResponse.redirect(url)
}

export const config = {
	matcher: '/protected/(.*)',
}
