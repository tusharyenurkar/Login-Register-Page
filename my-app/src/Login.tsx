import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_URL } from './constants/constant';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const reset = () => {
    setName('');
    setPassword('');
    setUser({});
  };

  const submit = async () => {
    const data = { name, password };

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        setUser(result.user);
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='LoginDiv'>
      <h4>Login Form</h4>
      <input
        type='text'
        placeholder='Username'
        className='login-input'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type='password'
        placeholder='Password'
        className='login-input'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={reset}>Reset</button>
      <button onClick={submit}>Log In</button>
      <Link to="/registration">
        <button><h4>Registration</h4></button>
      </Link>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default Login;
