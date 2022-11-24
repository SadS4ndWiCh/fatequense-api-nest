import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils/gxstate';
import { api } from './_libs/api';
import { cookieRequestBody } from './_libs/schemas';
import { IDisciplineHistory } from '../../@types/discipline';
import { withRouteOptions } from './_libs/utils/api-route';
import { getHistory } from './_libs/scrappers/history.scrap';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.query);

	const { data: html, success } = await api.get('history', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const gxstate = getGXStateOf(html);
	if (gxstate === null) return res
		.status(500)
		.json({ error: 'Ocorreu um problema ao pegar as informações' });

	const history = getHistory(gxstate);

	return res.status(200).json({ history });
}

export default withRouteOptions({
	options: { allowedMethods: ['GET'] },
	handler
});