const API_LOGIN_URL = "/login";
const API_LOGOUT_URL = "/logout";

async function createError(response) {
  const { errors } = await response.json();
  const error = Error(errors.message);
  error.message = errors;
  error.status = response.status;
  error.statusText = response.statusText;
  return error;
}

export async function login(user) {
  try {
    let response = await fetch(API_LOGIN_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) throw await createError(response);
    const payload = await response.json();
    return payload;
  } catch (e) {
    return { errors: e.message };
  }
}

export async function logout() {
  const response = await fetch(API_LOGOUT_URL, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
    }
  });
  // .then(() => {
  //   clearCookies();
  // });

  console.log("logOut response ", response);
}

function clearCookies() {
  var cookies = document.cookie.split("; ");
  for (var c = 0; c < cookies.length; c++) {
    var d = window.location.hostname.split(".");
    while (d.length > 0) {
      var cookieBase =
        encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
        "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
        d.join(".") +
        " ;path=";
      var p = location.pathname.split("/");
      document.cookie = cookieBase + "/";
      while (p.length > 0) {
        document.cookie = cookieBase + p.join("/");
        p.pop();
      }
      d.shift();
    }
  }
}
