declare global {
	interface IProfile {
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
}

export {};