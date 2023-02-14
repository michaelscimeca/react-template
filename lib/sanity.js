import {createClient} from 'next-sanity'

const projectId = 'vj4khdtr'; // "pv8y60vp"
const dataset = "production" // "production"
const apiVersion = '2023-12-16';
// Wrap the cache function in a way that reuses the TypeScript definitions
export const client = createClient({projectId, dataset, apiVersion, useCdn: false})
