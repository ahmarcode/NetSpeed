const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/NetSpeed/' : '',
  basePath: isProd ? '/NetSpeed' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
