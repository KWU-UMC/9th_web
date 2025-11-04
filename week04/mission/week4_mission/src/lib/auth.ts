const KEY = "app:isAuthed";

export function setAuthed(v: boolean) {
  localStorage.setItem(KEY, v ? "1" : "0");
}
export function isAuthed() {
  return localStorage.getItem(KEY) === "1";
}
export function clearAuth() {
  localStorage.removeItem(KEY);
}
