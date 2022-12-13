import { NextApiRequest } from "next";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const getAuthToken = (req: NextApiRequest): string | null => {
	return req.headers['authorization']?.replace('Bearer ', '') || null;
}

export const decodeAuthToken = (token: string): jwt.JwtPayload | null => {
	try {
		return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
	} catch {
		return null;
	}
}
