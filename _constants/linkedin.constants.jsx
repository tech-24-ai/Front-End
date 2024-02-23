export const linkedinConstants = {
    CLIENT_ID: '864ej8kchpyt6f',
    CLIENT_SECRET: 'FF6f7WrLSl3SvbRX',
    REDIRECT_URI: process.env.NODE_ENV === 'production' ? 'https://uat.d2bjah3yyu7fa0.amplifyapp.com/linkedin' : 'https://uat.d2bjah3yyu7fa0.amplifyapp.com/linkedin',
    // REDIRECT_URI: process.env.NODE_ENV === 'production' ? 'http://itmap-front-app.s3-website-us-east-1.amazonaws.com/linkedin' : 'http://localhost:3000/linkedin',
    SCOPE: 'r_liteprofile,r_emailaddress',
    STATE: '987654321'
};