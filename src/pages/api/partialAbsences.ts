import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils/gxstate';
import { api } from './_libs/api';
import { cookieRequestBody } from './_libs/schemas';
import { withRouteOptions } from './_libs/utils/api-route';
import { getPartialAbsences } from './_libs/scrappers/partialAbsences.scrap';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.query);

	const { data: html, success } = await api.get('partialAbsences', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		});
	}

	const gxstate = getGXStateOf(html);

	const partialAbsences = getPartialAbsences(gxstate);

	return res.status(200).json({
		partialAbsences,
	});
}

export default withRouteOptions({
	options: { allowedMethods: ['GET'] },
	handler
});