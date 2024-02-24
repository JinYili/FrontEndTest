export const encodeText = (txt: string) => {
  return btoa(txt);
};

export const decodeSecret = (secret: string) => {
  const obj = atob(secret);
  return obj;
};
