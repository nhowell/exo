import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useAuth } from "../../hooks/useAuth";
import { IUserCredentials } from "../../hooks/useProvideAuth";

export interface ILoginForm extends IUserCredentials {}

const initialValues: ILoginForm = {
	username: "",
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
		setStatus(errorMessage);
		setSubmitting(false);
	};

	return (
		<>
			<h1>Login</h1>

			<Formik<ILoginForm> initialValues={initialValues} onSubmit={handleLogin}>
				{({ status, isSubmitting }) => (
					<Form>
						<div>
							<label htmlFor="username">Username</label>
							<Field
								type="text"
								id="username"
								name="username"
								validate={(value: string) => {
									if (!value) {
										return "Username is required.";
									}
								}}
							/>
							<ErrorMessage name="username" component="div" />
						</div>

						<div>
							<label htmlFor="token">Token</label>
							<Field
								type="password"
								id="token"
								name="token"
								validate={(value: string) => {
									if (!value) {
										return "Token is required.";
									}
								}}
							/>
							<ErrorMessage name="token" component="div" />
						</div>

						{status ? <div>{status}</div> : undefined}

						<div>
							<button type="submit" disabled={isSubmitting}>
								Login
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
