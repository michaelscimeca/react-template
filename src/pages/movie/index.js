import { client } from 'lib/sanity';
import { groq } from "next-sanity";
import Movies from "../components/Movies";

const query = groq`*[_type == "movie" && defined(slug.current)]{
  _id,
  title, 
  slug
}`;

export const getStaticProps = async () => {
  const data = await client.fetch(query);
  // console.log(data)

  return { props: { data } };
};

export default function Home({ data }) {
  return <Movies movies={data} />
}
