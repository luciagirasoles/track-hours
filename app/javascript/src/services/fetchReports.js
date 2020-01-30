const API_USERS_DATA = "/api/users";

async function createError(response) {
  const { errors } = await response.json();
  const error = Error(errors.message);
  error.message = errors;
  error.status = response.status;
  error.statusText = response.statusText;
  return error;
}

export async function fetchUserReport() {
  try {
    let response = await fetch(API_USERS_DATA, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
      }
    });
    if (!response.ok) throw await createError(response);
    const payload = await response.json();
    return Object.values(payload);
  } catch (e) {
    return { errors: e.message };
  }
}
