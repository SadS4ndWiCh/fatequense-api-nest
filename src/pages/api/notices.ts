import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils/gxstate';
import { api } from './_libs/api';
import { cookieRequestBody } from './_libs/schemas';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.body);

	const { data: html, success } = await api.get('home', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const { $ } = getGXStateOf(html);
	const $table = $('#TABLE5');
	$table
		.find('script')
		.remove()

	const notices: string[] = $table
		.find('tr')
		.map((_, el) =>
			$(el)
				.find('p')
				.map((_i, p) =>
					$(p)
						.text()
						.trim()
						.replaceAll('\n','')
						.replaceAll('\t','')
						.replaceAll(' ','')
				)
				.get()
				.filter(text => text !== '')
				.join('\n')
		)
		.get()
		.filter((notice) => notice !== '');

	return res.status(200).json({ notices });
}