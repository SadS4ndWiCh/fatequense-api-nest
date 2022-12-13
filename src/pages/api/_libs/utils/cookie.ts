export const parseCookie = (cookies: string) => {
	const allCookies: Record<string, any> = {};
	const splittedCookies = cookies.split(';');

	splittedCookies.forEach(cookie => {
		const [cookieName, cookieValue] = cookie.split('=');
		
		allCookies[cookieName.trim()] = cookieValue ? cookieValue.trim() : true;
	});

	return allCookies;
}

export const serializeCookie = (cookieObj: Record<string,string>): string => {
	const cookies = Object
		.keys(cookieObj)
		.map(key => `${key}=${encodeURIComponent(cookieObj[key])}`)
		.join(';');
	
		return cookies;
}