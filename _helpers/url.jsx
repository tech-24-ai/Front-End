export function apiUrl() {
  
 let apiUrl = 'https://lotus24.itmap.com/app'

  if (process.env.NODE_ENV === 'production') {
    apiUrl =
      'https://lotus24.itmap.com/app';
  } else {
     apiUrl = 'https://lotus24.itmap.com/app'

  }

  return apiUrl;
}
