import { useContext, useState } from "react";
import * as yup from "yup";
import { Field, Formik, Form } from "formik";
import Error from "../components/Error";
import logo from "../img/logo.png";
import { resetPassword } from "../services/auth";
import AuthContext from "../contexts/AuthContext";
import { useNavigate, Link, useParams } from "react-router-dom";

const rules = yup.object({
	email: yup.string().label('Email').email().required(),
	password: yup.string().label('Password').min(8).required(),
	confirmPassword: yup.string().label('Confirm Password').min(8).required(),
});

interface FormValues {
	email: string,
	password: string,
	confirmPassword: string,
}

const initialValues: FormValues = {
	email: '',
	password: '',
	confirmPassword: '',
};

const ResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [apiErrors, setApiErrors] = useState<any>({});
	const [submitted, setSubmitted] = useState(false);
	const params = useParams();
	const token = params.token || '';

	const onSubmit = (values: FormValues) => {
		setLoading(true);
		setError(undefined);
		setApiErrors({});
		resetPassword(values.email, values.password, values.confirmPassword, token).then(res => {
			setSubmitted(true);
		}).catch(err => {
			setLoading(false);
			if (err.response && err.response.status === 422) {
				setApiErrors(err.response.data.errors);
				return;
			}
			console.error(err);
			setError('Something went wrong, please try again');
		})
	}

	return (
		<div className="flex items-center w-screen h-screen justify-items-center bg-gray-100">
			<div className="shadow m-auto max-w-full w-96 p-4 bg-white">
				<div className="w-full text-center p-4">
					<img src={logo} alt="Logo" className="w-32 inline" />
					{submitted ? (
						<>
							<p className="mb-4 text-gray-700">Your password has been reset successfully.</p>
							<Link to="/login" className="button button-primary">Back to Login</Link>
						</>
					) : (
						<p>Enter you email below and if we recognise your email address we will send you a link to reset your password</p>
					)}
				</div>
				{!submitted ? (
					<Formik validationSchema={rules} initialValues={initialValues} onSubmit={onSubmit}>
						{({ errors, isValid, touched }) => {
							const allErrors = { ...errors, ...apiErrors };
							return (
								<Form className="text-left">
									<div className="mb-4">
										<label htmlFor="email" className="form-label block">Email:</label>
										<Field name="email" className="input-control block w-full" placeholder="you@example.com" />
										<Error error={allErrors.email} />
									</div>
									<div className="mb-4">
										<label htmlFor="password" className="form-label block">New Password:</label>
										<Field name="password" type="password" autocomplete="new-password" className="input-control block w-full" placeholder="*********" />
										<Error error={allErrors.password} />
									</div>
									<div className="mb-4">
										<label htmlFor="confirmPassword" className="form-label block">Confirm Password:</label>
										<Field name="confirmPassword" type="password" autocomplete="new-password" className="input-control block w-full" placeholder="*********" />
										<Error error={allErrors.confirmPassword} />
									</div>
									<Error error={allErrors.token} />
									<Error error={error} />
									<div>
										<button disabled={!isValid || loading} className="button button-primary block w-full">{loading ? 'Please wait...' : 'Reset Password'}</button>
									</div>
									<div className="text-center mt-4">
										<Link to="/login" className="link">Back to Login</Link>
									</div>
								</Form>
							)
						}}
					</Formik>
				) : null}
			</div>
		</div>
	);
}

export default ResetPassword; 