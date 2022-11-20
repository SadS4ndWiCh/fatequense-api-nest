import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

import { GXState } from '../../../@types/gxstate';

export const parseCookie = (cookies: string) => {
	const allCookies: Record<string, any> = {};
	const splittedCookies = cookies.split(';');

	splittedCookies.forEach(cookie => {
		const [cookieName, cookieValue] = cookie.split('=');
		
		allCookies[cookieName.trim()] = cookieValue ? cookieValue.trim() : true;
	});

	return allCookies;
}

export const parseGXState = (gxstate: string): GXState => {
	return JSON.parse(gxstate.replaceAll(/\\>/g,'&gt;'));
}

export const getGXStatePrefix = (gxstate: string) => {
	const matchResult = gxstate.match(/MPW\d{4}/);
	if (matchResult == null) return null;

	return matchResult[0];
}

export const getterGXStateWithPrefix = (prefix: string, gxstate: Record<string, any>) => {
	return (key: string) => gxstate[`${prefix}${key}`];
}

export interface GetGXStateOfProps {
	default: string;
	parsed: GXState,
	prefix: string | null;
	$: CheerioAPI;
}
export const getGXStateOf = (html: string): GetGXStateOfProps => {
	const $ = cheerio.load(html);

	const gxstate = $('[name="GXState"]').val() as string;
	const gxstateParsed = parseGXState(gxstate);
	const gxstatePrefix = getGXStatePrefix(gxstate);

	return {
		default: gxstate,
		parsed: gxstateParsed,
		prefix: gxstatePrefix,
		$,
	}
}