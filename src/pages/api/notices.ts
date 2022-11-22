import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils/gxstate';
import { api } from './_libs/api';
import { cookieRequestBody } from './_libs/schemas';
import { withRouteOptions } from './_libs/utils/api-route';
import { getNotices } from './_libs/scrappers/notices.scrap';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.query);

	const { data: html, success } = await api.get('home', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const gxstate = getGXStateOf(html);
	const notices = getNotices(gxstate);
	
	return res.status(200).json({ notices });
}

export default withRouteOptions({
	options: { allowedMethods: ['GET'] },
	handler
});