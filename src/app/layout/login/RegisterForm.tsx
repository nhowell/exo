import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { t } from "../../../helpers/translate";
import { useClaimUsernameAndGetToken } from "../../../spacetraders-api/users/claimUsernameAndGetToken";
import { IUserCredentials } from "../../hooks/useProvideAuth";
import { ILoginForm } from "./LoginForm";
import styles from "./RegisterForm.module.css";

export interface IRegisterForm extends Pick<ILoginForm, "username"> {}

const initialValues: IRegisterForm = {
	username: "",
};

export function RegisterForm() {
	const register = useClaimUsernameAndGetToken();

	const [auth, setAuth] = useState<IUserCredentials>();

	const handleRegister = async (
		values: IRegisterForm,
		{ setSubmitting }: FormikHelpers<IRegisterForm>,
	) => {
		register.mutate(values.username, {
			onSuccess: (data) => {
				setAuth({ username: values.username, token: data.token });
			},
			onSettled: () => {
				setSubmitting(false);
			},
		});
	};

	return (
		<>
			<h1>{t("Register")}</h1>

			{auth ? (
				<>
					<p>
						{t("Welcome to SpaceTraders,")} <code>{auth.username}</code>.
					</p>
					<p>
						<strong>{t("Your Token")}:</strong> <code>{auth.token}</code>
					</p>
					<p className={styles.info}>
						{t(
							"Remember to save your token someplace safe! Once you've saved your token, login and start playing!",
						)}
					</p>
				</>
			) : (
				<Formik<IRegisterForm>
					initialValues={initialValues}
					onSubmit={handleRegister}
				>
					{({ isSubmitting }) => (
						<Form>
							<div>
								<label htmlFor="newUsername">{t("Username")}</label>
								<Field
									type="text"
									id="newUsername"
									name="username"
									validate={(value: string) => {
										if (!value) {
											return t("Username is required.");
										}
									}}
								/>
								<ErrorMessage name="username" component="div" />
							</div>

							{register.error ? <div>{t(register.error)}</div> : undefined}

							<div>
								<button type="submit" disabled={isSubmitting}>
									{t("Claim username and get token")}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			)}
		</>
	);
}
