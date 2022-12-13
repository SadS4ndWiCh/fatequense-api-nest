import axios from 'axios';

export const testAccount = {
	username: process.env.TEST_SIGA_USERNAME as string,
	password: process.env.TEST_SIGA_PASSWORD as string
};
console.log(testAccount);

export const api = axios.create({
	baseURL: 'http://localhost:3000/api'
});

export const login = async (authData: { username: string, password: string }) => {
	try {
		const { data } = await api.post('/login', authData);
		api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
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