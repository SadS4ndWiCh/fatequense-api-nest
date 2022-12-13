import {
	login,
	get,
	testAccount,
} from './utils/api';

describe('Fatec api', () => {
	beforeAll(async () => {
		await login(testAccount);
	});

	describe('Retrieve student data from siga', () => {
		describe('Get student profile', () => {
			it('should be able to retrieve profile with logged account', async () => {
				const profileResponse = await get('/profile');
				expect(profileResponse).toHaveProperty('status', 200);
			});
		});

		describe('Get student partial grade', () => {
			it('should be able to retrieve partial grade with logged account', async () => {
				const partialGradeResponse = await get('/partialGrade');
				expect(partialGradeResponse).toHaveProperty('status', 200);
			});
		});

		describe('Get student partial absences', () => {
			it('should be able to retrieve partial absences with logged account', async () => {
				const partialAbsencesResponse = await get('/partialAbsences');
				expect(partialAbsencesResponse).toHaveProperty('status', 200);
			});
		});

		describe('Get student schedule', () => {
			it('should be able to retrieve schedule with logged account', async () => {
				const scheduleResponse = await get('/schedule');
				expect(scheduleResponse).toHaveProperty('status', 200);
				expect(scheduleResponse?.data.schedule.length).toBeGreaterThan(0);
			});
		});

		describe('Get student history', () => {
			it('should be able to retrieve history with logged account', async () => {
				const historyResponse = await get('/history');
				expect(historyResponse).toHaveProperty('status', 200);
			});
		});

		describe('Get notices', () => {
			it('should be able to retrieve notices with logged account', async () => {
				const noticesResponse = await get('/notices');
				expect(noticesResponse).toHaveProperty('status', 200);
			});
		});
	});
});