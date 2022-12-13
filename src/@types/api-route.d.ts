import type { NextApiRequest, NextApiResponse } from "next";

declare global {
	type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'UPDATE' | 'PATCH';

	interface ApiHandler {
		(req: NextApiRequest, res: NextApiResponse): Promise<any>;
	}
	type ApiValidationCallback = (req: NextApiRequest) => boolean;
	type ApiValidation = {
		fn: ApiValidationCallback;
		errorMessage?: string;
	}
	type ApiRouteOptions = {
		allowedMethods: RequestMethods[];
		rateLimit?: RateLimitOptions & {
			requests: number;
		};
		validations?: ApiValidation[];
	}
}

export {};