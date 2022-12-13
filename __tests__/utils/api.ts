import axios from 'axios';

export const testAccount = {
	username: process.env.TEST_SIGA_USERNAME as string,
	password: process.env.TEST_SIGA_PASSWORD as string
};

export const api = axios.create({
	baseURL: 'http://localhost:3000/api'
});

export const login = async (authData: { username: string, password: string }) => {
	try {
		const { headers } = await api.post('/login', authData);
		api.defaults.headers.common['cookie'] = headers['set-cookie'] ? headers['set-cookie'][0] : '';
	} catch (err) {
		throw err;
	}
}

export const get = async (route: string) => {
	try {
		return await api.get(route);
	} catch {
		return null;
	}
}