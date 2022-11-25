declare global {
	type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'UPDATE' | 'PATCH';

	type ApiRoute = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
	type ApiRouteOptions = {
		allowedMethods: RequestMethods[];
		rateLimit?: RateLimitOptions & {
			requests: number;
		};
	}
}

export {};