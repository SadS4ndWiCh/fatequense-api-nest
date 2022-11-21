import { NextApiRequest, NextApiResponse } from 'next'

export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'UPDATE' | 'PATCH';

export type ApiRoute = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
export type ApiRouteOptions = {
	allowedMethods: RequestMethods[];
}

type Props = {
	options?: ApiRouteOptions,
	handler: ApiRoute
}

const defaultOptions: ApiRouteOptions = {
	allowedMethods: ['GET', 'POST'],
}

export const withRouteOptions = ({
	handler,
	options = defaultOptions,
}: Props) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method && !options.allowedMethods.includes(req.method.toUpperCase() as RequestMethods)) {
			return res
				.status(405)
				.json({ error: `O método ${req.method} não é permitido nessa rota` });
		}
		
		await handler(req, res);
	};
}