// src/api/api.js

// Backend base URL (FastAPI admin + menu is still used)
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

// General request handler
async function request(path, { method = "GET", body, headers = {} } = {}) {
  const opts = { method, headers: { ...headers } };

  if (body && !(body instanceof FormData)) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    opts.body = body; // automatic multipart
  }

  const res = await fetch(`${BASE}${path}`, opts);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

/* ----------------------------------------------
   ADMIN AUTH
---------------------------------------------- */
export const loginAdmin = (credentials) =>
  request("/api/admin/login", { method: "POST", body: credentials });

/* ----------------------------------------------
   MENU CRUD (Admin only)
---------------------------------------------- */
export const getMenu = () => request("/api/menu/");
export const getMenuItem = (id) => request(`/api/menu/${id}`);

export const addMenuItem = (formData) =>
  request("/api/menu/add", { method: "POST", body: formData });

export const updateMenuItem = (id, formData) =>
  request(`/api/menu/update/${id}`, { method: "PUT", body: formData });

export const deleteMenuItem = (id) =>
  request(`/api/menu/delete/${id}`, { method: "DELETE" });

/* ----------------------------------------------
   NOTHING ELSE NEEDED
   (Orders, Tables, Settings, Payment removed)
---------------------------------------------- */

export default { request };
