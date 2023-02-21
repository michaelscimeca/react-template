import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: process.env.PROJECTID,
  dataset: "production"
})

export function urlFor(source) {
  return builder.image(source)
}
