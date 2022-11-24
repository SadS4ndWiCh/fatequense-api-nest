import {
	login,
	get,
	validUserAccount,
	invalidUserAccount
} from './utils/accounts';

describe('Fatec api', () => {
	let userSessionCookie: string;
	beforeAll(async () => {
		try {
			const { data } = await login(validUserAccount);
			userSessionCookie = data.cookie;
		} catch {
		}
	});

	describe('Sign in with account', () => {
		it('should be able to sign in with siga account', async () => {
			expect(userSessionCookie).toBeTruthy();
		});

		it('shouldn\'t be able to sign in with an invalid account', async () => {
			await expect(login(invalidUserAccount)).rejects.toThrow();
		});
	});

	describe('Retrieve student data from siga', () => {
		describe('Get student profile', () => {
			it('should be able to retrieve profile with logged account', async () => {
				const profileResponse = await get('/profile', userSessionCookie);
				expect(profileResponse).toHaveProperty('status', 200);
			});

			it('shouldn\t be able to retrieve profile with an invalid cookie', async () => {
				const profileResponse = await get('/profile', 'some-invalid-cookie');
				expect(profileResponse).toBeNull();
			});
		});

		describe('Get student partial grade', () => {
			it('should be able to retrieve partial grade with logged account', async () => {
				const partialGradeResponse = await get('/partialGrade', userSessionCookie);
				expect(partialGradeResponse).toHaveProperty('status', 200);
			});

			it('shouldn\t be able to retrieve partial grade with an invalid cookie', async () => {
				const partialGradeResponse = await get('/partialGrade', 'some-invalid-cookie');
				expect(partialGradeResponse).toBeNull();
			});
		});

		describe('Get student partial absences', () => {
			it('should be able to retrieve partial absences with logged account', async () => {
				const partialAbsencesResponse = await get('/partialAbsences', userSessionCookie);
				expect(partialAbsencesResponse).toHaveProperty('status', 200);
			});

			it('shouldn\t be able to retrieve partial absences with an invalid cookie', async () => {
				const partialAbsencesResponse = await get('/partialAbsences', 'some-invalid-cookie');
				expect(partialAbsencesResponse).toBeNull();
			});
		});

		describe('Get student schedule', () => {
			it('should be able to retrieve schedule with logged account', async () => {
				const scheduleResponse = await get('/schedule', userSessionCookie);
				expect(scheduleResponse).toHaveProperty('status', 200);
				expect(scheduleResponse?.data.schedule.length).toBeGreaterThan(0);
			});

			it('shouldn\t be able to retrieve schedule with an invalid cookie', async () => {
				const scheduleResponse = await get('/schedule', 'some-invalid-cookie');
				expect(scheduleResponse).toBeNull();
			});
		});

		describe('Get student history', () => {
			it('should be able to retrieve history with logged account', async () => {
				const historyResponse = await get('/history', userSessionCookie);
				expect(historyResponse).toHaveProperty('status', 200);
			});

			it('shouldn\t be able to retrieve history with an invalid cookie', async () => {
				const historyResponse = await get('/history', 'some-invalid-cookie');
				expect(historyResponse).toBeNull();
			});
		});

		describe('Get notices', () => {
			it('should be able to retrieve notices with logged account', async () => {
				const noticesResponse = await get('/notices', userSessionCookie);
				expect(noticesResponse).toHaveProperty('status', 200);
			});

			it('shouldn\t be able to retrieve notices with an invalid cookie', async () => {
				const noticesResponse = await get('/notices', 'some-invalid-cookie');
				expect(noticesResponse).toBeNull();
			});
		});
	});
});