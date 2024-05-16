"use server";

import type * as zod from "zod";

import { getPasswordResetTokenByEmail } from "@/src/data/password-reset-token";
import { sendPasswordResetEmail } from "@/src/lib/mail";
import { generatePasswordResetToken } from "@/src/lib/tokens";
import { getUserByEmail } from "@/src/data/user";
import { ResetPasswordSchema } from "@/src/schemas";

export const resetPassword = async (
	values: zod.infer<typeof ResetPasswordSchema>,
) => {
	const validatedFields = ResetPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid email!",
		};
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return {
			error: "Email not found!",
		};
	}

	const existingPasswordResetToken = await getPasswordResetTokenByEmail(email);
	if (existingPasswordResetToken) {
		const hasExpired =
			new Date(existingPasswordResetToken.expires) < new Date();
		if (!hasExpired) {
			return { error: "Reset password email already sent! Check your inbox!" };
		}
	}

	const passwordResetToken = await generatePasswordResetToken(email);

	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token,
	);

	return {
		success: "Reset email sent!",
	};
};
