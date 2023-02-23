import Link from "next/link";
import Head from "next/head";

export default function Movies({ movies }) {
  return (
    <>
    {JSON.stringify(movies)}
      {/* <Head>
        <title>{movies.length} Movies</title>
      </Head>
      <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
        {movies.map((movie) => (
          <Link key={movie._id} href={movie.slug.current} className="p-4 hover:bg-blue-50">
            <h2>{movie.title}</h2>
          </Link>
        ))}
      </main> */}
    </>
  );
}
