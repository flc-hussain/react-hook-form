import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      role: '',
      email: '',
      password: '',
      signup1: false,
      signup2: false,
    },
  });

  const goToStep2 = () => setStep(2);
  const goToStep3 = () => setStep(3);
  const goBack = () => setStep(1);

  const v = getValues();

  return (
    <div className="bg">
      <div className="box">
        <h1>Signup Form</h1>

        <div className="steps">
          <div className="line"></div>
          <div className="step">
            <p>User</p>
            <div className={step === 1 ? "circle active" : "circle"}>1</div>
          </div>
          <div className="step">
            <p>Privacy</p>
            <div className={step === 2 ? "circle active" : "circle"}>2</div>
          </div>
          <div className="step">
            <p>Done</p>
            <div className={step === 3 ? "circle active" : "circle"}>3</div>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit(goToStep2)} noValidate>
            <h2>User Form:</h2>

            <label className="label">name *</label>
            <input
              className="input"
              type="text"
              placeholder="name"
              {...register('name', { required: 'Name required' })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}

            <label className="label">role</label>
            <input
              className="input"
              type="text"
              placeholder="eg. software developer"
              {...register('role')}
            />

            <label className="label">email *</label>
            <input
              className="input"
              type="email"
              placeholder="email@example.com"
              {...register('email', { required: 'Valid Email required' })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}

            <label className="label">password *</label>
            <input
              className="input"
              type="text"
              placeholder="password"
              {...register('password', {
                required: 'The minimum password length is 10 characters and must contain at least 1 lowercase letter, 1 uppercase letter and 1 number)',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/,
                  message: 'The minimum password length is 10 characters and must contain at least 1 lowercase letter, 1 uppercase letter and 1 number)',
                },
              })}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}

            <p className="star">* required fields</p>

            <div className="btns">
              <button type="submit" className="btn">Next</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <h2>Privacy Form:</h2>

            <div className="check">
              <input type="checkbox" {...register('signup1')} />
              <label>Recieve updates about Tray.io product by email</label>
            </div>

            <div className="check">
              <input type="checkbox" {...register('signup2')} />
              <label>Recieve communication by email for other products created by the Tray.io team</label>
            </div>

            <div className="btns">
              <button type="button" className="btn" onClick={goBack}>Back</button>
              <button type="button" className="btn" onClick={goToStep3}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="success-title">Success!</h3>

            <div className="tick">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="60" fill="#2ea73a"/>
                <path d="M53 77 L85 109 L115 50 L60 60 Z" fill="#20822a"/>
                <path d="M45 75 L30 60 L38 52 L45 59 L75 29 L83 37 Z" fill="white"/>
              </svg>
            </div>

            <p className="success-text">Please verify your email address, you should have recieved an email from us already!</p>

            <div className="json">
{`JSON Data Form-Completed: {
  "FormStage": 3,
  "FormUserSignup": {
    "name": "${v.name}",
    "role": "${v.role}",
    "email": "${v.email}",
    "password": "${v.password}"
  },
  "FormUserPrivacy": {
    "signup1": ${v.signup1},
    "signup2": ${v.signup2}
  }
}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;