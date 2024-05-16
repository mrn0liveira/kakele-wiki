import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/src/schemas";
import { getUserByEmail } from "@/src/data/user";

export default {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),

		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (passwordsMatch) return user;
				}
				return null;
			},
		}),
	],
	logger: {
		error: (error) => console.error(error),
		debug: (message) => console.log(message),
		warn: (message) => console.log(message),
	},
	debug: true,
	trustHost: true,
} satisfies NextAuthConfig;
