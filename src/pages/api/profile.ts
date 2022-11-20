import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf, getterGXStateWithPrefix } from './_libs/utils';
import { api } from './_libs/api';
import { cookieRequestBody } from './_libs/schemas';

export interface IProfile {
	name: string;
	personalEmail: string;
	institutionalEmail: string;
	cpf: string;
	birthday: string;
	averageGrade: number;
	photoUrl?: string;
	college: {
		name: string;
		state: string;
		courseName: string;
		coursePeriod: string;
		currentSemester: number;
	}
}

export interface CacheProfile {
	cachedAt: number,
	profile: IProfile,
}

const cache: Record<string, CacheProfile> = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.body);

	if (cookie in cache) {
		return res.status(200).json({
			profile: cache[cookie].profile,
		});
	}

	const { data: html, success } = await api.get('home', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const { $, ...gxstate } = getGXStateOf(html);

	if (gxstate.prefix == null) return res.status(500).json({
		error: 'Não foi possível pegar os dados adequadamente'
	})

	const gxstateGet = getterGXStateWithPrefix(gxstate.prefix, gxstate.parsed);

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

	cache[cookie] = {
		cachedAt: Date.now(),
		profile
	};

	return res.status(200).json({
		profile
	});
}