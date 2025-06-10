import { z } from "zod/v4";

interface IUser {
  email: string,
  password: string
}

const User = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(6).max(12)
});

export const validateUser = (data: IUser) => User.safeParse(data)