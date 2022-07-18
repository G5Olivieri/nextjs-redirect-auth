import type {
	NextPage
} from 'next'
import Head from 'next/head'

const Events: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Simple Authentication</title>
				<meta name="description" content="Simple nextjs auth redirect"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<header>
			</header>

			<main>
				<h1>Authenticated</h1>
			</main>

			<footer></footer>
		</div>
	)
}

export default Events
