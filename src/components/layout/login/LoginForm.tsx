import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import { useAuth } from "@/hooks/useAuth";
import { t } from "@/utils/translate";

export interface ILoginForm {
	token: string;
}

const initialValues: ILoginForm = {
	token: "",
};

export function LoginForm() {
	const auth = useAuth();

	const handleLogin = async (
		values: ILoginForm,
		{ setStatus, setSubmitting }: FormikHelpers<ILoginForm>,
	) => {
		setStatus(undefined);
		const errorMessage = await auth.login(values);

		// Login redirects if it was successful, so it's illegal to perform
		// state updates to unmounted components.
		if (errorMessage !== undefined) {
			setStatus(errorMessage);
			setSubmitting(false);
		}
	};

	return (
		<>
			<h1>{t("Login")}</h1>

			<Formik<ILoginForm> initialValues={initialValues} onSubmit={handleLogin}>
				{({ status, isSubmitting, values }) => (
					<Form>
						<div>
							<label htmlFor="token">{t("Access Token")}</label>
							<Field
								type="password"
								id="token"
								name="token"
								validate={(value: string) => {
									if (!value) {
										return t("Access Token is required.");
									}
								}}
							/>
							<ErrorMessage name="token" component="div" />
						</div>

						{status ? <div>{t(status)}</div> : undefined}

						{isVersion2Token(values.token) && (
							<p>
								That looks like a SpaceTraders v2 token. Exo is designed for{" "}
								<a href="https://api.spacetraders.io/v1">SpaceTraders v1</a>, so
								that token will not work here.
							</p>
						)}

						<div>
							<button type="submit" disabled={isSubmitting}>
								{t("Login")}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}

function isVersion2Token(token: string): boolean {
	return token.includes(".");
}
