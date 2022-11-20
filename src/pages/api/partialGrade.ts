import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from './_libs/api';
import { getGXStateOf } from './_libs/utils';

import { ExamTitle } from '../../@types/gxstate';
import { cookieRequestBody } from './_libs/schemas';

export interface IDisciplineExamDate {
	title: ExamTitle;
	startsAt: string;
	grade: number;
}
export interface IDisciplinePartialGrade {
	cod: string;
	disciplineName: string;
	averageGrade: number;
	examsDates: IDisciplineExamDate[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.body);

	const { data: html, success } = await api.get('partialGrade', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}
	const gxstate = getGXStateOf(html);

	const partialGrades: IDisciplinePartialGrade[] = gxstate.parsed['vACD_ALUNONOTASPARCIAISRESUMO_SDT']
		?.map((discipline): IDisciplinePartialGrade => ({
			cod: discipline.ACD_DisciplinaSigla,
			disciplineName: discipline.ACD_DisciplinaNome,
			averageGrade: discipline.ACD_AlunoHistoricoItemMediaFinal,
			examsDates: discipline.Datas.map(examDate => ({
				title: examDate.ACD_PlanoEnsinoAvaliacaoTitulo,
				startsAt: examDate.ACD_PlanoEnsinoAvaliacaoDataPrevista,
				grade: examDate.Avaliacoes[0].ACD_PlanoEnsinoAvaliacaoParcialNota,
			}))
		}));

	return res.status(200).json({
		partialGrades
	});
}