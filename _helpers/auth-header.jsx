let token
if (process.browser) {
    token = localStorage.getItem('itmapToken') ? localStorage.getItem('itmapToken') : null
}

export function authHeader() {    
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}