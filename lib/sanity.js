import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image';
import Head from 'next/head';

const client = createClient({
    projectId: 'vj4khdtr', 
    dataset: 'production',
    apiVersion: '2023-12-16', 
    useCdn: false
});

const ImageBuilder = imageUrlBuilder(client);

export { PortableText, client, ImageBuilder, Image, Head}


