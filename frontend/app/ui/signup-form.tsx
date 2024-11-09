'use client';

import Link from 'next/link';
import { signup } from '../actions/auth';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export function SignupForm() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <div className='section-container'>
      <div className='form-container'>
        <form action={action}>
          <div>
            <label htmlFor='name'>Name</label>
            <input id='name' name='name' placeholder='Name' />
          </div>
          {state?.errors?.name && <p className='error'>{state.errors.name}</p>}

          <div>
            <label htmlFor='email'>Email</label>
            <input id='email' name='email' placeholder='Email' />
          </div>
          {state?.errors?.email && (
            <p className='error'>{state.errors.email}</p>
          )}

          <div>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' />
          </div>
          {state?.errors?.password && (
            <div className='error'>
              <p>Password must:</p>
              <div>
                {state.errors.password.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            </div>
          )}
          <SubmitButton />
          <p>
            Already registered? <Link href='/auth/sign-in'>Sign in</Link>
          </p>
          {/* <button className='text-white cursor-pointer'>Login</button> */}
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type='submit'
      className='submit-btn text-white cursor-pointer'
    >
      Sign Up
    </button>
  );
}
