import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import { GXState } from '../../../../@types/gxstate';

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

export interface IGetGXStateReturn {
	default: string;
	parsed: GXState,
	prefix: string | null;
	$: CheerioAPI;
}
export const getGXStateOf = (html: string): IGetGXStateReturn | null => {
	const $ = cheerio.load(html);

	const gxstate = $('[name="GXState"]').val() as string;
	if (!gxstate) return null;
	const gxstateParsed = parseGXState(gxstate);
	const gxstatePrefix = getGXStatePrefix(gxstate);

	return {
		default: gxstate,
		parsed: gxstateParsed,
		prefix: gxstatePrefix,
		$,
	}
}