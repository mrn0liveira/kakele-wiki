import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kakele Wiki',
    short_name: 'Kakele Wiki',
    description: 'The best place to improve your gameplay experience with Tools and Guides.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050606',
    theme_color: '#344851',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
