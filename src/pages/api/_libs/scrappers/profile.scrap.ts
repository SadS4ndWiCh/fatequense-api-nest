import { getterGXStateWithPrefix, IGetGXStateReturn } from "../utils/gxstate";
import { toTitleCase } from "../utils/string-formatter";

export const getProfile = ({ $, ...gxstate }: IGetGXStateReturn) => {
	const gxstateGet = getterGXStateWithPrefix(gxstate.prefix!, gxstate.parsed);

	let name = gxstate.parsed['vPRO_PESSOALNOME'];
	name = toTitleCase(name.substring(0, name.length - 2));

	const photoUrl = $(`#${gxstate.prefix}FOTO > img`).attr()?.src;

	const profile: IProfile = {
		name,
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