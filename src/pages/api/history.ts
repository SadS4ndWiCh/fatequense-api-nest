import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils';
import { api } from './_libs/api';
import { cookieRequestBody } from './_libs/schemas';

export interface IDisciplineHistory {
	cod: string;
	disciplineName: string;
	description: string;
	finalGrade: number;
	totalAbscences: number;
	presenceFrequency: number;
	renunciantionAt: string;
	isApproved: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.body);

	const { data: html, success } = await api.get('history', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const { $, ...gxstate } = getGXStateOf(html);

	const history: IDisciplineHistory[] = gxstate.parsed['vALU_ALUNONOTAS_SDT']
		.map((disciplineHistory): IDisciplineHistory => ({
			cod: disciplineHistory.ACD_DisciplinaSigla,
			disciplineName: disciplineHistory.ACD_DisciplinaNome,
			description: disciplineHistory.GER_TipoObservacaoHistoricoDescricao,
			finalGrade: disciplineHistory.ACD_AlunoHistoricoItemMediaFinal,
			totalAbscences: disciplineHistory.ACD_AlunoHistoricoItemQtdFaltas,
			presenceFrequency: disciplineHistory.ACD_AlunoHistoricoItemFrequencia / 100,
			renunciantionAt: disciplineHistory.ACD_AlunoHistoricoItemDesistenciaData,
			isApproved: disciplineHistory.ACD_AlunoHistoricoItemAprovada === 1
		}));

	return res.status(200).json({ history });
}