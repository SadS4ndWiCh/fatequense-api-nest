import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from './_libs/api';
import { getGXStateOf } from './_libs/utils/gxstate';

import { cookieRequestBody } from './_libs/schemas';
import { IDisciplinePartialGrade } from '../../@types/discipline';
import { withRouteOptions } from './_libs/utils/api-route';
import { getPartialGrade } from './_libs/scrappers/partialGrade.scrap';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.query);

	const { data: html, success } = await api.get('partialGrade', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}
	const gxstate = getGXStateOf(html);

	const partialGrades = getPartialGrade(gxstate);

	return res.status(200).json({
		partialGrades
	});
}

export default withRouteOptions({
	options: { allowedMethods: ['GET'] },
	handler
});