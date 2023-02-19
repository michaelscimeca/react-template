import Head from 'next/head'
import Image from 'next/image'
import {client} from 'lib/sanity'

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  poster,
  "posterAspect": poster.asset->.metadata.dimensions.aspectRatio,
  "director": crewMembers[job == "Director"][0].person->name
}[0...50]
`;

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
        <div>
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
          <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          >
          By{' '}
            <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
            />
          </a>
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
  return {props: {data}}
}
