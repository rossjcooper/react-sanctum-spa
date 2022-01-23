import { useContext, useRef, useState } from 'react';
import * as yup from 'yup';
import { Field, Formik, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import Error from '../components/Error';
import logo from '../img/logo.png';
import { forgotPassword } from '../services/auth';
import AuthContext from '../contexts/AuthContext';

const rules = yup.object({
    email: yup.string().label('Email').email().required(),
});

interface FormValues {
	email: string,
}

const initialValues: FormValues = {
    email: '',
};

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [apiErrors, setApiErrors] = useState({});
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sent, setSent] = useState(false);

    const onSubmit = (values: FormValues) => {
        setLoading(true);
        setError(undefined);
        setApiErrors({});
        forgotPassword(values.email).then((res) => {
            setSent(true);
        }).catch((err) => {
            setLoading(false);
            if (err.response && err.response.status === 422) {
                setApiErrors(err.response.data.errors);
                return;
            }
            console.error(err);
            setError('Something went wrong, please try again');
        });
    };

    return (
        <div className="flex items-center w-screen h-screen justify-items-center bg-gray-100">
            <div className="shadow m-auto max-w-full w-96 p-4 bg-white">
                <div className="w-full text-center p-4">
                    <img src={logo} alt="Logo" className="w-32 inline" />
                    {sent ? (
                        <>
                            <p className="mb-4 text-gray-700">If we recognise your email we have sent you an email with a link to reset your password. Don't forget to check your Spam folder.</p>
                            <Link to="/login" className="button button-primary">Back to Login</Link>
                        </>
                    ) : (
                        <p>Enter you email below and if we recognise your email address we will send you a link to reset your password</p>
                    )}
                </div>
                {!sent ? (
                    <Formik validationSchema={rules} initialValues={initialValues} onSubmit={onSubmit}>
                        {({ errors, isValid, touched }) => {
                            const allErrors = { ...errors, ...apiErrors };
                            return (
                                <Form className="text-left">
                                    <div className="mb-4">
                                        <Field name="email" className="input-control block w-full" placeholder="you@example.com" ariaLabel="Email" />
                                        <Error error={allErrors.email} />
                                    </div>
                                    <Error error={error} />
                                    <div>
                                        <button disabled={!isValid || loading} className="button button-primary block w-full">{loading ? 'Please wait...' : 'Get Link'}</button>
                                    </div>
                                    <div className="text-center mt-4">
                                        <Link to="/login" className="link">Back to Login</Link>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                ) : null}
            </div>
        </div>
    );
};

export default ForgotPassword;
