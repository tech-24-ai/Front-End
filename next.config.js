module.exports = {
  compress: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  images: {
    loader: "imgix",
    path: "",
    domains: [
      "tech24-uat.s3.amazonaws.com",
      "elasticbeanstalk-us-east-1-847794743507.s3.amazonaws.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};
