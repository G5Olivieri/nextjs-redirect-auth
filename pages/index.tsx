import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextPage
} from 'next'
import Head from 'next/head'
import nookies from 'nookies'
import jwt from "jsonwebtoken";

type HomeProps = {
	email: string
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomeProps>> {
	const cookies = nookies.get(context)
	if (cookies.access_token) {
		try {
			const payload: any = jwt.verify(cookies.access_token, process.env.AUTH_PUBLIC_KEY!)
			return {
				props: {
					email: payload.email
				}
			}
		} catch (e) {
			return {
				notFound: true
			}
		}
	}
	const query = new URLSearchParams({
		redirect_uri: process.env.NEXT_PUBLIC_HOSTNAME + '/api/callback',
		response_type: 'code',
		client_id: process.env.AUTH_CLIENT_ID!,
	})
	return {
		redirect: {
			destination: process.env.NEXT_PUBLIC_AUTH_URL + '/login?' + query.toString(),
			statusCode: 301,
		}
	}
}

const Home: NextPage<HomeProps> = ({email}) => {
	return (
		<div>
			<Head>
				<title>Simple Authentication</title>
				<meta name="description" content="Simple nextjs auth redirect"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<header>
				{email}
			</header>

			<main>
				<h1>COMU 2022</h1>
			</main>

		</div>
	)
}

export default Home
