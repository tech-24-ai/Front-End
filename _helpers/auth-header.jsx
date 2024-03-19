let token;
if (process.browser) {
  token = localStorage.getItem("tech24Token")
    ? localStorage.getItem("tech24Token")
    : null;
}

export function authHeader() {
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
