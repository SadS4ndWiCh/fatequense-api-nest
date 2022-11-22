import type { RateLimitOptions } from './rate-limit';

export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'UPDATE' | 'PATCH';

export type ApiRoute = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
export type ApiRouteOptions = {
	allowedMethods: RequestMethods[];
	rateLimit?: RateLimitOptions & {
		requests: number;
	};
}