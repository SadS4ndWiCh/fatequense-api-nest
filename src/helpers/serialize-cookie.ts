export const serializeCookie = (cookies: Record<string, string | boolean>) => {
  return Object.entries(cookies)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return key;
      }

      return `${key}=${value}`;
    })
    .join('; ');
};
