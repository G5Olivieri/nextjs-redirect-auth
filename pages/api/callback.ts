import type {NextApiRequest, NextApiResponse} from 'next'
import {setCookie} from "nookies";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const code = req.query['code'] as string
	const qs = new URLSearchParams({
		code,
		redirect_uri: process.env.NEXT_PUBLIC_HOSTNAME + '/api/callback',
		client_id: process.env.AUTH_CLIENT_ID!,
		grant_type: 'authorization_code',
	})
	const response = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + '/api/token', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'accept': 'application/json',
		},
		body: qs.toString()
	})
	const token = await response.json()
	setCookie({res}, 'access_token', token.access_token, {
		maxAge: 30 * 24 * 60 * 60,
		path: '/',
	})
	res.redirect('/protected/events')
}
