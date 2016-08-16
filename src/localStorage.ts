export function save(key: string, obj: any) {
  localStorage.setItem(key, JSON.stringify(typeof obj.toJS === "function" ? obj.toJS() : obj));
}

export function get(key: string): any {
  const str = localStorage.getItem(key);

  if (!str) {
    return undefined;
  }

  try {
    return JSON.parse(str);
  } catch(err) {
    return undefined;
  }
}
