import { getDate, getDay, setDate, setHours, setMinutes } from "date-fns";
import { IDiscipline, ISchedule } from "../../../../@types/discipline";
import { IDisciplineRaw } from "../../../../@types/gxstate";
import { IGetGXStateReturn } from "../utils/gxstate";

const getDisciplineByCod = (allDisciplines: IDisciplineRaw[], targetCod: string) => {
	return allDisciplines.find(discipline => discipline.ACD_DisciplinaSigla === targetCod);
}

export const getSchedules = ({ $, ...gxstate }: IGetGXStateReturn) => {
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

	return schedule;
}