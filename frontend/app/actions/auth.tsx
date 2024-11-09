import { redirect } from 'next/navigation';
import {
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from '../lib/definitions';

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // TODO use env vars for the BASE_URL
  const response = await fetch(`${process.env.API_BASE_URL}/auth/sign-up`, {
    method: 'POST',
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let message = '';
  try {
    const jsonResponse = await response.json();
    message = jsonResponse.message ?? 'Sign up failed, please try again';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    message = 'Sign up failed unexpectedly';
  }
  if (response.ok) redirect('/auth/sign-in');
  else alert(message);
}

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.API_BASE_URL}/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let message = '';
  try {
    const jsonResponse = await response.json();
    message = jsonResponse.message ?? 'Sign in failed, please try again';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    message = 'Sign in failed unexpectedly';
  }
  if (response.ok) redirect('/home');
  else alert(message);
}
