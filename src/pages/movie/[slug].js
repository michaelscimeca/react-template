import { client, PortableText, ImageBuilder, Image, Head } from 'lib/sanity';

const query =`*[_type == "movie" && slug.current == $slug][0]{
  title,
  poster,
  overview
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "movie" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`
  );

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const queryParams = { slug: params?.slug ?? `` };
  const movie = await client.fetch(query, queryParams);

  return {
    props: movie,
  };
}

export default function Movie( movie ) {
  return <>
  {/* {JSON.stringify(movie.overview)} */}
  <Head>
    <title>{movie.title}</title>
  </Head>
  <main className="container mx-auto prose prose-lg p-4">
    <h1>{movie.title}</h1>
    <Image
      className="float-left m-0 w-1/3 mr-4 rounded-lg"
      src={ImageBuilder.image(movie.poster).width(300).height(300).url()}
      width={300}
      height={300}
      alt={movie.title}
    />
    <PortableText value={movie.overview} />
  </main>
  </>;
}
