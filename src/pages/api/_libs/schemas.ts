import { z } from "zod";

export const authSigaBody = z.object({
  username: z.string(),
  password: z.string(),
});

export const cookieRequestBody = z.object({
	cookie: z.string()
});