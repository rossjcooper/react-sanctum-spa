import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Error from "../components/Error";
import { AuthUser, changePassword, ChangePasswordData } from "../services/auth";
import * as yup from "yup";
import { date } from "yup/lib/locale";

const rules = yup.object({
	currentPassword: yup.string().label('Current password').required().min(8).max(32),
	newPassword: yup.string().label('New password').required().min(8).max(32),
	confirmPassword: yup.string().label('Confirm password').required().min(8).max(32),
});

const initialValues: ChangePasswordData = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
};

export const ChangePasswordForm = () => {
	const [apiErrors, setApiErrors] = useState({});
	const [saving, setSaving] = useState(false);

	const handleSubmit = (values: ChangePasswordData) => {
		setApiErrors({});
		setSaving(true);
		changePassword(values).then(res => {

		}).catch(err => {
			if (err.response && err.response.data.errors) {
				setApiErrors(err.response.data.errors);
			} else {
				console.error(err);
			}
		}).finally(() => {
			setSaving(false);
		})
	}

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={rules}>
			{({ errors, touched, isValid }) => {
				const allErrors = { ...errors, ...apiErrors };
				return (
					<Form>
						<div>
							<h2 className="text-xl mb-6 text-gray-400">Change Password</h2>
							<div className="mb-4">
								<label htmlFor="currentPassword" className="form-label block">Current Password:</label>
								<Field name="currentPassword" id="currentPassword" type="password" autocomplete="current-password" className="input-control w-full" />
								<Error error={allErrors.currentPassword} />
							</div>
							<div className="mb-4">
								<label htmlFor="newPassword" className="form-label block">New Password:</label>
								<Field name="newPassword" id="newPassword" type="password" autocomplete="new-password" className="input-control w-full" />
								<Error error={allErrors.newPassword} />
							</div>
							<div className="mb-4">
								<label htmlFor="confirmPassword" className="form-label block">Confirm New Password:</label>
								<Field name="confirmPassword" id="confirmPassword" type="password" autocomplete="new-password" className="input-control w-full" />
								<Error error={allErrors.confirmPassword} />
							</div>
							<div className="flex">
								<button className="ml-auto button button-primary" disabled={saving || !touched || !isValid}>{saving ? 'Saving...' : 'Change Password'}</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	);
}

export default ChangePasswordForm;