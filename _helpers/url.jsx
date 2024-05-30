export function apiUrl() {
  let apiUrl = "https://tech24.us-east-1.elasticbeanstalk.com/app";

  if (process.env.NODE_ENV === "production") {
    apiUrl = "https://tech24.us-east-1.elasticbeanstalk.com/app";
  }

  return apiUrl;
}
