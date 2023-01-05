export const parseCookies = (cookies: string) => {
  const allCookies: Record<string, any> = {};

  cookies.split(';').forEach((cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');

    allCookies[cookieName.trim()] = cookieValue ? cookieValue.trim() : true;
  });

  return allCookies;
};
