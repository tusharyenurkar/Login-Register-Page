import { useState } from 'react';
import { Link } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [userSubmit, setUserSubmit] = useState(null);

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setCpassword('');
    setUserSubmit(null);
  };

  const submit = async () => {
  
    if (!name || !email || !password || !cpassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }

    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:4000/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
        setUserSubmit(result.user);
        reset();
      } else {
        alert('Registration error: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='registrationDiv'>
      <h4>Registration Form</h4>

      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='login-input'
      />

      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='login-input'
      />

      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='login-input'
      />

      <input
        type='password'
        placeholder='Confirm Password'
        value={cpassword}
        onChange={(e) => setCpassword(e.target.value)}
        className='login-input'
      />

      <button onClick={reset}>Reset</button>
      <button onClick={submit}>Register</button>
      <Link to="/login">
              <button><h4>Back To Login</h4></button>
            </Link>

      {userSubmit && (
        <div style={{ marginTop: '1rem' }}>
          <h5>Registered User Info:</h5>
          <pre>{JSON.stringify(userSubmit, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Registration;
