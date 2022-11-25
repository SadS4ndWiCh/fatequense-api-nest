import { IGetGXStateReturn } from "../utils/gxstate";

export const getPartialGrade = (gxstate: IGetGXStateReturn) => {
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
	
		return partialGrades;
}