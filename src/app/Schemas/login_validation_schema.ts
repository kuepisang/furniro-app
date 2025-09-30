import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password is required')
});

