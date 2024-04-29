module.exports = {
  compress: true,
  experimental: {
    images: {
      layoutRaw: true,
      allowFutureImage: true,
    },
  },
  images: {
    unoptimized: true,
    domains: [
      "tech24-uat.s3.amazonaws.com",
      "elasticbeanstalk-us-east-1-847794743507.s3.amazonaws.com",
      "encrypted-tbn0.gstatic.com",
      "itmapprod.s3.amazonaws.com"
    ],
  },
};
