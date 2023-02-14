import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {client} from 'lib/sanity'

const inter = Inter({ subsets: ['latin'] })

const serializers = {
  types: {
    summaries: props => {
      const { node } = props;
      if (!node) {
        return false;
      }
      const { summaries } = node;
      if (!summaries || summaries.length === 0) {
        return false;
      }
      return (
        <div className="summaries">
          <h2>{node.caption}</h2>
          <ul>
            {summaries.map(summary => {
              return (
                <li key={summary._key}>
                  <BlockContent
                    blocks={summary.summary}
                    serializers={serializers}
                  />
                  — <a href={summary.url}>{summary.author}</a>
                </li>
              );
            })}
          </ul>
          <style jsx>{`
            .summaries {
              clear: both;
              padding: 2em 0 2em;
            }

            .summaries :global(ul) {
              margin: 0;
              padding: 0;
            }

            .summaries :global(li) {
              display: block;
              margin: 0 0 1em;
              padding: 1em 0 2em;
            }

            .summaries :global(li:not(:last-child)) {
              border-bottom: 1px solid #ccc;
            }

            .summaries {
              clear: both;
              padding: 2em 0 2em;
            }

            .summaries :global(li:not(:last-child)) {
              border-bottom: 1px solid #ccc;
            }
          `}</style>
        </div>
      );
    }
  }
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
// export const getStaticPaths = async () => {
//   // Get the paths we want to pre-render based on persons
//   const movies = await sanity.fetch(moviesQuery);
//   // console.log(movies)
//   const paths = movies.map(movie => ({
//     params: { id: movie._id }
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// };

// This function gets called at build time on server-side.
// export const getStaticProps = async ({ params }) => {
//   const movie = await sanity.fetch(singleMovieQuery, { id: params.id });
//   console.log( params.id, movie)

//   return { props: { movie } };
// };

export const getStaticProps = async () => {
  const data = await client.fetch(query)
  console.log(data)

  return {props: {data}}
}