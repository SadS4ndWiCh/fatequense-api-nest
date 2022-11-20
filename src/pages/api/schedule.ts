import type { NextApiRequest, NextApiResponse } from 'next';
import { getDate, getDay, setDate, setHours, setMinutes } from 'date-fns';

import { getGXStateOf } from './_libs/utils';
import { api } from './_libs/api';

import { IDisciplineRaw } from '../../@types/gxstate';
import { cookieRequestBody } from './_libs/schemas';

export interface IDiscipline {
	name: string;
	teacherName: string;
}

export interface ISchedule {
	cod: string;
	startsAt: Date;
	endsAt: Date;
	discipline: IDiscipline | null;
}

const getDisciplineByCod = (allDisciplines: IDisciplineRaw[], targetCod: string) => {
	return allDisciplines.find(discipline => discipline.ACD_DisciplinaSigla === targetCod);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = cookieRequestBody.parse(req.body);

	const { data: html, success } = await api.get('schedule', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		});
	}

	const { $, ...gxstate } = getGXStateOf(html);
	const allDisciplines = gxstate.parsed['vALU_ALUNOHISTORICOITEM_SDT'];
	const dataGridTags = [
		'[name="Grid2ContainerDataV"]',
		'[name="Grid3ContainerDataV"]',
		'[name="Grid4ContainerDataV"]',
		'[name="Grid5ContainerDataV"]',
		'[name="Grid6ContainerDataV"]',
		'[name="Grid7ContainerDataV"]',
	];

	const today = new Date()
	const todayWeek = getDay(today);

	const schedule = dataGridTags.map((tag, idx): ISchedule[] => {
		const dayLessons = JSON.parse($(tag).attr('value') || '{}') as string[][];
		const currWeekday = idx + 1;

		const daySchedule = dayLessons.map((lesson) => {
			const [_, horaries, cod] = lesson;
			const [startsAt, endsAt] = horaries.split('-');
			const [startsAtHours, startsAtMinutes] = startsAt.split(':');
			const [endsAtHours, endsAtMinutes] = endsAt.split(':');
			const date = new Date();

			let startsAtDate = setMinutes(setHours(date, Number(startsAtHours)), Number(startsAtMinutes));
			let endsAtDate = setMinutes(setHours(date, Number(endsAtHours)), Number(endsAtMinutes));

			let incDays = getDate(today);
			if (((todayWeek === currWeekday) && today > startsAtDate) || (todayWeek > currWeekday)) {
				incDays += 7;
			} else {
				incDays += currWeekday - todayWeek;
			}

			startsAtDate = setDate(startsAtDate, incDays);
			endsAtDate = setDate(endsAtDate, incDays);

			const disciplineRaw = getDisciplineByCod(allDisciplines, cod) || null;
			const discipline: IDiscipline | null = disciplineRaw === null ? null : {
				name: disciplineRaw['ACD_DisciplinaNome'],
				teacherName: disciplineRaw['Pro_PessoalNome'],
			}

			return {
				cod,
				startsAt: startsAtDate,
				endsAt: endsAtDate,
				discipline,
			};
		});

		return daySchedule.sort((a, b) => a.startsAt < b.startsAt ? -1 : 1);
	});

	return res.status(200).json({
		schedule,
	})
}