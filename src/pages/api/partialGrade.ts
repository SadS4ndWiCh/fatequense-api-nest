import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from './_libs/api';
import { getGXStateOf } from './_libs/utils/gxstate';

import { studentGetOptions, withRouteOptions } from './_libs/utils/api-route';
import { getPartialGrade } from './_libs/scrappers/partialGrade.scrap';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const cookie = req.cookies['SigaAuthToken']!;

	const { data: html, success } = await api.get('partialGrade', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}
	const gxstate = getGXStateOf(html);
	if (gxstate === null) return res
		.status(500)
		.json({ error: 'Ocorreu um problema ao pegar as informações' });
		
	const partialGrades = getPartialGrade(gxstate);

	return res.status(200).json({
		partialGrades
	});
}

export default withRouteOptions({
	options: studentGetOptions,
	handler
});