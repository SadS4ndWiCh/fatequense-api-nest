import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils';
import { api } from './_libs/api';

export interface IDisciplineLessons {
	title: string;
	date: string;
	presences: number;
	absences: number;
}
export interface IDisciplinePartialAbsences {
	cod: string;
	disciplineName: string;
	totalPresences: number;
	totalAbsences: number;
	lessons: IDisciplineLessons[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = req.body;

	const { data: html, success } = await api.get('partialAbsences', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		});
	}

	const gxstate = getGXStateOf(html);

	const partialAbsences: IDisciplinePartialAbsences[] = gxstate.parsed['vFALTAS']
		?.map((discipline): IDisciplinePartialAbsences => ({
			cod: discipline.ACD_DisciplinaSigla,
			disciplineName: discipline.ACD_DisciplinaNome,
			totalPresences: discipline.TotalPresencas,
			totalAbsences: discipline.TotalAusencias,
			lessons: discipline.Aulas.map(lesson => ({
				title: lesson.ACD_PlanoEnsinoConteudoTituloAula,
				date: lesson.ACD_PlanoEnsinoConteudoDataAula,
				presences: lesson.Presencas,
				absences: lesson.Ausencias,
			}))
		}));

	return res.status(200).json({
		partialAbsences,
	});
}