'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signin } from '../actions/auth';

export function SigninForm() {
  const [state, action] = useActionState(signin, undefined);

  return (
    <div className='section-container'>
      <div className='form-container'>
        <form action={action}>
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
              <div>
                {state.errors.password.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            </div>
          )}
          <SubmitButton />
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
      Sign In
    </button>
  );
}
