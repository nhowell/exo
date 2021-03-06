import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { IAuthStorage } from "../hooks/useAuth";

export interface ILoginForm extends IAuthStorage {
	rememberMe: boolean;
}

const initialValues: ILoginForm = {
	username: "",
	token: "",
	rememberMe: false,
};

interface IOwnProps {
	onLogin(values: ILoginForm): void;
}

export function Login(props: IOwnProps) {
	const handleLogin = (
		values: ILoginForm,
		{ setSubmitting }: FormikHelpers<ILoginForm>,
	) => {
		props.onLogin(values);
		setSubmitting(false);
	};

	return (
		<div>
			<h1>Login</h1>

			<Formik<ILoginForm> initialValues={initialValues} onSubmit={handleLogin}>
				{({ isSubmitting }) => (
					<Form>
						<Field
							type="text"
							name="username"
							validate={(value: string) => {
								if (!value) {
									return "Username is required.";
								}
							}}
						/>

						<ErrorMessage name="username" component="div" />

						<Field
							type="password"
							name="token"
							validate={(value: string) => {
								if (!value) {
									return "Token is required.";
								}
							}}
						/>

						<ErrorMessage name="token" component="div" />

						<Field type="checkbox" name="rememberMe" />

						<button type="submit" disabled={isSubmitting}>
							Login
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
