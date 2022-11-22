import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils/gxstate';
import { api } from './_libs/api';

import { cookieRequestBody } from './_libs/schemas';
import { withRouteOptions } from './_libs/utils/api-route';
import { getSchedules } from './_libs/scrappers/schedules.scrap';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.query);

	const { data: html, success } = await api.get('schedule', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		});
	}

	const gxstate = getGXStateOf(html);
	const schedule = getSchedules(gxstate);

	return res.status(200).json({
		schedule,
	})
}

export default withRouteOptions({
	options: { allowedMethods: ['GET'] },
	handler
});