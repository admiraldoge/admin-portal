/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PANAMA_HOST: process.env.NEXT_PUBLIC_PANAMA_HOST
  },
  images: {
    loader: 'akamai',
    path: '',
  }
}
