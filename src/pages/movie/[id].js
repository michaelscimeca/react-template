import React from "react";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import Layout from "../../components/Layout";
import imageUrlFor from "../../../utils/imageUrlFor";
import { client } from "../../../lib/sanity";
import Image from 'next/image'

const moviesQuery = `*[_type == "movie"] { _id }`;

const singleMovieQuery = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  overview,
  releaseDate,
  poster,
  "cast": castMembers[] {
    _key,
    characterName,
    "person": person-> {
      _id,
      name,
      image
    }
  }
}[0]
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

const Movie = ({ movie }) => {
  const {
    poster: { crop = { left: 0, top: 0 }, hotspot = { x: 0.5, y: 0.5 } }
  } = movie;
  return (
    <Layout>
      <div className="movie">
        <div
          className="header"
          style={{
            backgroundImage: `url(${imageUrlFor(movie.poster)})`,
            backgroundPosition: `${(hotspot.x - crop.left) *
              100}% ${(hotspot.y - crop.top) * 100}%`
          }}
        >
          <div className="header-content">
            <h1>{movie.title}</h1>
          </div>
        </div>

        <div className="content">
          <div className="sidebar">
            <img
              className="poster"
              src={imageUrlFor(movie.poster)
                .ignoreImageParams()
                .width(500)}
              alt={`Movie poster for ${movie.title}`}
            />
          </div>
          <div className="main-content">
            <div className="overview">
              <BlockContent
                blocks={movie.overview}
                serializers={serializers}
                dataset={client.clientConfig.dataset}
                projectId={client.clientConfig.projectId}
              />
            </div>
            <h2>Cast</h2>
            <ul className="cast-list">
              {movie.cast.map(cast => (
                <li key={cast._key} className="cast-list-item">
                  <Link href="/person/[id]" as={`/person/${cast.person._id}`} legacyBehavior>
                    <a className="cast-list-link">
                      <span>
                        {cast.person.image && (
                          <img src={imageUrlFor(cast.person.image).width(64)} />
                        )}
                      </span>
                      <span>
                        <span className="cast-person-name">
                          {cast.person.name}
                        </span>
                        <span className="cast-character-name">
                          {cast.characterName}
                        </span>
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const movies = await client.fetch(moviesQuery);
  // console.log(movies)
  const paths = movies.map(movie => ({
    params: { id: movie._id }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// export const getStaticProps = async ({ params }) => {
//   const movie = await sanity.fetch(singleMovieQuery, { id: params.id });
//   console.log( params.id, movie)

//   return { props: { movie } };
// };


export const getStaticProps = async ({ params}) => {
  const movie = await client.fetch(singleMovieQuery, { id: params.id })
  console.log(movie)

  return { props: { movie } };
}

export default Movie;
