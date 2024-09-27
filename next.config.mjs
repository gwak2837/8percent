/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    ...(process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && {
      removeConsole: { exclude: ['error'] },
    }),
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn-media.8percent.kr' }],
  },
  poweredByHeader: false,
}

export default nextConfig
