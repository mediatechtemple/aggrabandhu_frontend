// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['agerbandhu-production.up.railway.app',"https://backend.aggrabandhuss.orgundefined","backend.aggrabandhuss.org"],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '', // Leave port empty as it's not needed for HTTPS
          pathname: '/**', // Allow all paths under the domain
        },
      ],
    },
  };
  
  export default nextConfig;
  
  



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'picsum.photos',
//           port: '', // Leave port empty as it's not needed for HTTPS
//           pathname: '/**', // Allow all paths under the domain
//         },
//       ],
//     },
//   };
  
//   export default nextConfig;
  
