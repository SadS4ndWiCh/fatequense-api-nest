import { api } from "./api";

export const validUserAccount = {
	username: process.env.TEST_SIGA_USERNAME as string,
	password: process.env.TEST_SIGA_PASSWORD as string
};

export const invalidUserAccount = {
	username: '00000000000',
	password: '123abc123'
}

export const login = (authData: { username: string, password: string }) => {
	return api.post('/login', authData);
}

export const get = async (route: string, cookie: string) => {
	try {
		return await api.get(route, { params: { cookie } });
	} catch {
		return null;
	}
}