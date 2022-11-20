import { request } from "urllib";
import { buildOptions, ROUTES, STATUS } from "./network";

export type Route = keyof typeof ROUTES;

const get = async (route: Route, cookie: string) => {
	const requestGradeData = buildOptions({
		method: 'GET',
		route: ROUTES[route],
		headers: {
			cookie,
		}
	});
	const { data, res } = await request(
		requestGradeData.url, requestGradeData.options
	);

	return {
		data: data.toString('utf-8'),
		success: res.statusCode != STATUS.redirect
	}
}

const post = (route: Route, form: Record<string, string>) => {
	const requestData = buildOptions({
    method: 'POST',
    route: ROUTES[route],
    form,
  });
  return request(requestData.url, requestData.options);
}

export const api = {
	get,
	post
}