/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'organic-public.s3.us-west-1.amazonaws.com',
          port: '',
          pathname: '/product/**',
        },
        {
          protocol: 'https',
          hostname: 'ofc-ecom-web.exceloid.in',
          port: '',
          pathname: '/_nuxt/img/**',
        },
      ],
    },
  };
  
export default nextConfig;
