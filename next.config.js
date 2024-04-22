module.exports = {
    compress:true,
    experimental: {
        images: {
            layoutRaw: true
        }
    },
    images: {
        loader: 'imgix',
        path:'',
        domains:[
            'tech24-uat.s3.amazonaws.com'
        ]
    },
    
  }