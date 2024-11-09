import { SignupForm } from '../../ui/signup-form';

export default function SignUpPage() {
  return (
    <div>
      <TextSection />
      <SignupForm />
    </div>
  );
}
function TextSection() {
  return (
    <div className='text-container text-white text-center'>
      <h2 className='heading'>
        Greetings from Easy Generator Auth App
        <br />
      </h2>
    </div>
  );
}
