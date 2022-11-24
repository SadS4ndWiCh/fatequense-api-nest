import type { Config } from 'jest';

const jestConfigs: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['./node_modules/', './.next'],
	// modulePathIgnorePatterns: ['./__tests__/api/utils'],
	testMatch: ['**/**/__tests__/**/**/*.test.(ts)'],
	setupFiles: ['dotenv/config'],
	testTimeout: 7000
}

export default jestConfigs;