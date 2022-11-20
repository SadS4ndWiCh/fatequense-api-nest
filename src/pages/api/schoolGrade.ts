import type { NextApiRequest, NextApiResponse } from 'next';

import { getGXStateOf } from './_libs/utils';
import { api } from './_libs/api';

export type DisciplineState = 'dismissed' | 'approved' | 'attending' | 'not-attended' | 'unknown';

export interface IDisciplineGrade {
	cod: string;
	classHours: number;
	name: string;
	state: DisciplineState;
	period?: string;
	frequency?: number;
	grade?: number;
}

export interface ISemester {
	number: number;
	disciplines: IDisciplineGrade[];
}

const statesCodes: Record<string, DisciplineState> = {
	"#418a58": "dismissed",
	"#75fa9f": "approved",
	"#b2d4fd": "attending",
	"#ffffff": "not-attended",
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { cookie } = req.body;

	const { data: html, success } = await api.get('schoolGrade', cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const { $ } = getGXStateOf(html);

	const semesters: ISemester[] = $('#TABLE1 table [valign=TOP]').map((i, el) => {
		const semester: ISemester = {} as ISemester;
		semester.number = i + 1;

		// Get all disciplines div from semester column
		semester.disciplines = $(el).find(':scope div').map((_, div) => {
			const $discipline = $(div);

			// Get discipline informations from div
			const data = $discipline.find('tr td').map((__i, td) => {
				const $td = $(td);
				const str = $td.text().trim();
				if (str.indexOf('NF:') > -1) {
					return [
						$td.contents().not($td.children()).text(),
					].concat($td.find('b').map((___i, b) => $(b).text().trim()).get());
				}

				return str;
			}).get();
			
			const cssStateColor = $discipline.css('background-color')?.toLowerCase();
			const disciplineState: DisciplineState = cssStateColor
				? statesCodes[cssStateColor]
				: 'unknown';

			const discipline: IDisciplineGrade = {
				cod: data[0],
				classHours: Number(data[1].replace('AS:', '')),
				name: data[2],
				state: disciplineState,
			}

			if (data.length > 3) {
				discipline.period = data[6];
				discipline.frequency = Number(data[5]);
				discipline.grade = Number(data[4]);
			}

			return discipline;
		}).get();

		return semester;
	}).get();

	return res.status(200).json({ semesters });
}