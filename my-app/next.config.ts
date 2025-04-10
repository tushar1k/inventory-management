import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['https://s3-inventorymanagement-image-bucket.s3.ap-south-1.amazonaws.com'], 
    // ['s3-inventorymanagement.s3.us-east-2.amazonaws.com'],
    
  },
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;




//2
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

//3
/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "s3-inventorymanagement.s3.us-east-2.amazonaws.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;