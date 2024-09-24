// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['agerbandhu-production.up.railway.app',"https://agerbandhu-production.up.railway.appundefined"],
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
  
