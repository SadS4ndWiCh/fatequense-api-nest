import { getterGXStateWithPrefix, IGetGXStateReturn } from "../utils/gxstate";

export const getProfile = ({ $, ...gxstate }: IGetGXStateReturn) => {
	const gxstateGet = getterGXStateWithPrefix(gxstate.prefix!, gxstate.parsed);

	const photoUrl = $(`#${gxstate.prefix}FOTO > img`).attr()?.src;

	const profile: IProfile = {
		name: gxstate.parsed['vPRO_PESSOALNOME'],
		personalEmail: gxstate.parsed['vPRO_PESSOALEMAIL'],
		institutionalEmail: gxstateGet('vINSTITUCIONALFATEC'),
		cpf: gxstate.parsed['vPRO_PESSOALDOCSCPF'],
		birthday: gxstate.parsed['vPRO_PESSOALDATANASCIMENTO'], 
		averageGrade: Number(gxstateGet('vACD_ALUNOCURSOINDICEPR')),
		photoUrl,
		college: {
			name: gxstate.parsed['vUNI_UNIDADENOME_MPAGE'],
			courseName: gxstate.parsed['vACD_CURSONOME_MPAGE'],
			currentSemester: Number(gxstateGet('vACD_ALUNOCURSOCICLOATUAL')),
			coursePeriod: gxstate.parsed['vACD_PERIODODESCRICAO_MPAGE'],
			state: gxstate.parsed['vSITUACAO_MPAGE'],
		}
	};

	return profile;
}