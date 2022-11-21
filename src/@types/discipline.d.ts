export interface IDiscipline {
	name: string;
	teacherName: string;
}

export interface IDisciplineExamDate {
	title: ExamTitle;
	startsAt: string;
	grade: number;
}

export interface IDisciplinePartialGrade {
	cod: string;
	disciplineName: string;
	averageGrade: number;
	examsDates: IDisciplineExamDate[];
}

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

export interface ISchedule {
	cod: string;
	startsAt: Date;
	endsAt: Date;
	discipline: IDiscipline | null;
}

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

export interface IDisciplineHistory {
	cod: string;
	disciplineName: string;
	description: string;
	finalGrade: number;
	totalAbscences: number;
	presenceFrequency: number;
	renunciantionAt: string;
	isApproved: boolean;
}

