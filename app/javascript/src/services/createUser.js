const API_CREATE_USER = "/api/users";

async function createError(response) {
  const { errors } = await response.json();
  const error = Error(errors.message);
  error.message = Object.keys(errors.message)
    .map(key => {
      return `${key} ${errors.message[key]}`;
    })
    .join(" ,");
  error.status = response.status;
  error.statusText = response.statusText;
  return error;
}

export default async function createUser(userInfo) {
  try {
    let response = await fetch(API_CREATE_USER, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
      },
      body: JSON.stringify(userInfo)
    });
    if (!response.ok) throw await createError(response);
    const payload = await response.json();
    return payload;
  } catch (e) {
    return { errors: e.message };
  }
}
