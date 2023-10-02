import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './LoginForm.css';
import loginbackground from './login-background.png';
import { login, clearSessionErrors } from '../../store/session';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = (field) => {
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    return (
      <div className="login-page">
        <header className="login-header">
          <h1>Lets Jam</h1>
        </header>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <div className="errors">{errors?.email}</div>
            <label>
              <input
                type="text"
                value={email}
                onChange={update("email")}
                placeholder="Email"
              />
            </label>
            <div className="errors">{errors?.password}</div>
            <label>
              <input
                type="password"
                value={password}
                onChange={update("password")}
                placeholder="Password"
              />
            </label>
            <input
              type="submit"
              value="Log In"
              disabled={!email || !password}
            />
          </form>
        </div>
        <img className='login-background' src={loginbackground}></img>
      </div>
    );
}

export default LoginForm;