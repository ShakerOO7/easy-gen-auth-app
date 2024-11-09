import { SigninForm } from '../../ui/signin-form';

export default function SignUpPage() {
  return (
    <div>
      <TextSection />
      <SigninForm />
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
