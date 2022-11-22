import { IDisciplineHistory } from "../../../../@types/discipline";
import { IGetGXStateReturn } from "../utils/gxstate";

export const getHistory = (gxstate: IGetGXStateReturn) => {
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
	
	return history;
}