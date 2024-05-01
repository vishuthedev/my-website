import * as Yup from 'yup';

interface ContactFormValues {
  yourname: string;
  email: string;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactFormSchema: Yup.ObjectSchema<ContactFormValues> = Yup.object().shape({
  yourname: Yup.string().required('Please enter yourName'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .matches(emailRegex, 'Invalid email'), // Replace with your email regex pattern
  message: Yup.string().required('Please enter message'),
});

