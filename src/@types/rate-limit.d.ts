declare global {
	export type RateLimitOptions = {
		uniqueTokenPerInterval?: number;
		interval?: number;
	}
}

export {};