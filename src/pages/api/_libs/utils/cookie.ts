export const parseCookie = (cookies: string) => {
	const allCookies: Record<string, any> = {};
	const splittedCookies = cookies.split(';');

	splittedCookies.forEach(cookie => {
		const [cookieName, cookieValue] = cookie.split('=');
		
		allCookies[cookieName.trim()] = cookieValue ? cookieValue.trim() : true;
	});

	return allCookies;
}