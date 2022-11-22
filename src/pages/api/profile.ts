import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf, getterGXStateWithPrefix } from './_libs/utils/gxstate';
import { api } from './_libs/api';
import { cookieRequestBody } from './_libs/schemas';
import { IProfile } from '../../@types/account';
import { withRouteOptions } from './_libs/utils/api-route';
import { getProfile } from './_libs/scrappers/profile.scrap';

export interface CacheProfile {
	cachedAt: number,
	profile: IProfile,
}

const cache: Record<string, CacheProfile> = {}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.query);

	if (cookie in cache) {
		return res.status(200).json({
			profile: cache[cookie].profile,
		});
	}

	const { data: html, success } = await api.get('home', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	// const { $, ...gxstate } = getGXStateOf(html);
	const gxstate = getGXStateOf(html);

	if (gxstate.prefix == null) return res.status(500).json({
		error: 'Não foi possível pegar os dados adequadamente'
	})

	const profile = getProfile(gxstate);

	cache[cookie] = {
		cachedAt: Date.now(),
		profile
	};

	return res.status(200).json({
		profile
	});
}

export default withRouteOptions({
	options: { allowedMethods: ['GET'] },
	handler
});