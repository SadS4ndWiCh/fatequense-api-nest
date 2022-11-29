import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookie } from './cookie';
import { getIP, rateLimit } from './rate-limit';

type Props = {
	options?: ApiRouteOptions,
	handler: ApiRoute
}

const defaultOptions: ApiRouteOptions = {
	allowedMethods: ['GET', 'POST'],
	rateLimit: { requests: 10 },
	validations: [],
}

export const studentGetOptions: ApiRouteOptions = {
	allowedMethods: ['GET'],
	rateLimit: { requests: 10 },
	validations: [
		{
			fn: req => !!req.cookies['SigaAuthToken'],
			errorMessage: 'Cookie do Siga não foi informado'
		}
	]
}

export const withRouteOptions = ({
	handler,
	options = {} as ApiRouteOptions,
}: Props) => {
	options = { ...defaultOptions, ...options };
	const limiter = options.rateLimit && rateLimit(options.rateLimit);

	return async (req: NextApiRequest, res: NextApiResponse) => {
		if (limiter) {
			try {
				const ip = getIP(req);
				await limiter.check(res, options.rateLimit!.requests, ip);
			} catch {
				return res.status(429).json({ error: 'O limite de requisição foi excedido' });
			}
		}

		if (req.method && !options.allowedMethods.includes(req.method.toUpperCase() as RequestMethods)) {
			return res
				.status(405)
				.json({ error: `O método ${req.method} não é permitido nessa rota` });
		}

		const parsedCookies = parseCookie(req.headers.cookie || '');
		req.cookies = parsedCookies;

		options.validations?.forEach(validation => {
			if (!validation.fn(req)) return res
				.status(400)
				.json({ error: validation.errorMessage || 'Requisição inválida' });
		})
		
		await handler(req, res);
	};
}