import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils/gxstate';
import { api } from './_libs/api';

import { studentGetOptions, withRouteOptions } from './_libs/utils/api-route';
import { getNotices } from './_libs/scrappers/notices.scrap';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const cookie = req.cookies['SigaAuthToken']!;

	const { data: html, success } = await api.get('home', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const gxstate = getGXStateOf(html);
	if (gxstate === null) return res
		.status(500)
		.json({ error: 'Ocorreu um problema ao pegar as informações' });

	const notices = getNotices(gxstate);
	
	return res.status(200).json({ notices });
}

export default withRouteOptions({
	options: studentGetOptions,
	handler
});