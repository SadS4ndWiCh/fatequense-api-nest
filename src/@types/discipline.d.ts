declare global {
  interface IDiscipline {
    name: string;
    teacherName: string;
  }

  interface IDisciplineExamDate {
    title: ExamTitle;
    startsAt: string;
    grade: number;
  }

  interface IDisciplinePartialGrade {
    cod: string;
    disciplineName: string;
    averageGrade: number;
    examsDates: IDisciplineExamDate[];
  }

  interface IDisciplineLessons {
    title: string;
    date: string;
    presences: number;
    absences: number;
  }

  interface IDisciplinePartialAbsences {
    cod: string;
    disciplineName: string;
    totalPresences: number;
    totalAbsences: number;
    lessons: IDisciplineLessons[];
  }

  interface ISchedule {
    cod: string;
    startsAt: Date;
    endsAt: Date;
    discipline: IDiscipline | null;
  }

  type DisciplineState =
    | 'dismissed'
    | 'approved'
    | 'attending'
    | 'not-attended'
    | 'unknown';

  interface IDisciplineGrade {
    cod: string;
    classHours: number;
    name: string;
    state: DisciplineState;
    period?: string;
    frequency?: number;
    grade?: number;
  }

  interface ISemester {
    number: number;
    disciplines: IDisciplineGrade[];
  }

  interface IDisciplineHistory {
    cod: string;
    disciplineName: string;
    description: string;
    finalGrade: number;
    totalAbscences: number;
    presenceFrequency: number;
    renunciantionAt: string;
    isApproved: boolean;
  }
}

export {};
