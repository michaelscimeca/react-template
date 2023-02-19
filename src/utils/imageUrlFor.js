import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: "vj4khdtr",
  dataset: "production"
})

export function urlFor(source) {
  return builder.image(source)
}
