import { client } from 'lib/sanity';
import Movie from "../components/Movies";

const query = `*[_type == "movie" && slug.current == $slug][0]{
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
  const slug = params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  const movie = await client.fetch(query, { slug });
  console.log({ slug, movie })

  return {
    props: {
      data: { movie },
    },
  };
}

export default function Page({ data }) {
  return (
    <>
      <Movie movie={data.movie} />
    </>
  );
}
