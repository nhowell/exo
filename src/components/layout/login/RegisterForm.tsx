import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";

import { APP_NAME } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { HttpStatusCode } from "@/spacetraders-api/api/types";
import { useClaimUsernameAndGetToken } from "@/spacetraders-api/hooks/users/useClaimUsernameAndGetToken";
import { t } from "@/utils/translate";

import styles from "./RegisterForm.module.css";

interface IOwnProps {
	onRegister(): void;
}

export interface IRegisterForm {
	username: string;
}

const initialValues: IRegisterForm = {
	username: "",
};

interface IUserCredentials {
	username: string;
	token: string;
}

export function RegisterForm(props: IOwnProps) {
	const register = useClaimUsernameAndGetToken();

	const [userCredentials, setUserCredentials] = useState<IUserCredentials>();

	const handleRegister = (
		values: IRegisterForm,
		{ setSubmitting }: FormikHelpers<IRegisterForm>,
	) => {
		register.mutate(values.username, {
			onSuccess: (data) => {
				setUserCredentials({ username: data.user.username, token: data.token });
				props.onRegister();
			},
			onSettled: () => {
				setSubmitting(false);
			},
		});
	};

	const auth = useAuth();

	return (
		<>
			{userCredentials ? (
				<>
					<h1>{t("Registration Complete")}</h1>
					<p>
						{t("Welcome to")} {APP_NAME}!
					</p>
					<p>
						{t("You're the CEO of the new space trading corporation,")}{" "}
						<code>{userCredentials.username}</code>.
					</p>
					<p>
						<strong>{t("Your Access Token")}:</strong>{" "}
						<code>{userCredentials.token}</code>
					</p>
					<p className={styles.info}>
						{t(
							"Remember to save your access token someplace safe! After you've saved your token, we'll log you in and you can start playing!",
						)}
					</p>
					<button
						type="button"
						onClick={() => auth.login({ token: userCredentials.token })}
					>
						{t("Ok, I've saved my token. Let's get started!")}
					</button>
				</>
			) : (
				<>
					<h1>{t("Register")}</h1>
					<Formik<IRegisterForm>
						initialValues={initialValues}
						onSubmit={handleRegister}
					>
						{({ isSubmitting }) => (
							<Form>
								<div>
									<label htmlFor="newUsername">{t("Corporation Name")}</label>
									<Field
										type="text"
										id="newUsername"
										name="username"
										validate={(value: string) => {
											if (!value) {
												return t("Corporation Name is required.");
											}
										}}
									/>
									<ErrorMessage name="username" component="div" />
								</div>

								{register.error ? (
									register.error.statusCode === HttpStatusCode.Conflict ? (
										<div>{t("Corporation name already taken.")}</div>
									) : (
										<div>{t(register.error.message)}</div>
									)
								) : undefined}

								<div>
									<button type="submit" disabled={isSubmitting}>
										{t("Register new corporation")}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</>
			)}
		</>
	);
}
