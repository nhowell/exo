import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { t } from "../../../helpers/translate";
import { useAuth } from "../../hooks/useAuth";

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
				{({ status, isSubmitting }) => (
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
