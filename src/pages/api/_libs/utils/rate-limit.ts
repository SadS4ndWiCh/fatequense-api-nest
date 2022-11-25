import type { NextApiRequest, NextApiResponse } from 'next';
import LRU from 'lru-cache';

export const getIP = (req: NextApiRequest) => {
	const ip = req.headers['x-forwarded-for'] ||
						 req.headers['x-real-ip'] ||
						 req.socket.remoteAddress as string;
	
	return Array.isArray(ip) ? ip.join('') : ip;
}	

export const rateLimit = (options: RateLimitOptions) => {
	const tokenCache = new LRU({
		max: options?.uniqueTokenPerInterval || 250,
		ttl: options?.interval || 60 * 1000 // 1 minuto
	});

	return {
		check: (res: NextApiResponse, limit: number, token: string) => 
			new Promise<void>((resolve, reject) => {
				const tokenCount = (tokenCache.get(token) as number[]) || [0];
				if (tokenCount[0] === 0) {
					tokenCache.set(token, tokenCount);
				}
				tokenCount[0] += 1;

				const currentUsage = tokenCount[0];
				const isRateLimited = currentUsage >= limit;
				res.setHeader('X-RateLimit-Limit', limit);
				res.setHeader(
					'X-RateLimit-Remaining',
					isRateLimited ? 0 : limit - currentUsage,
				);

				return isRateLimited ? reject() : resolve();
			})
	}
}