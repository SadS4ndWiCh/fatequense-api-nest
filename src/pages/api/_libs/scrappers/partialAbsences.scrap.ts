import { IGetGXStateReturn } from "../utils/gxstate";

export const getPartialAbsences = (gxstate: IGetGXStateReturn) => {
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
	
	return partialAbsences;
}