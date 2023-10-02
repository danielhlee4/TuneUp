import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SignUpForm.css'
import { signup, clearSessionErrors } from '../../store/session';
import background from './background.png'

function SignupForm() {
    const [email, setEmail] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = field => {
        let setState;

        switch (field) {
            case 'firstName':
                setState = setfirstName;
                break;
            case 'lastName':
                setState = setlastName;
                break;
            case 'email':
                setState = setEmail;
                break;
            case 'password':
                setState = setPassword;
                break;
            case 'password2':
                setState = setPassword2;
                break;
            default:
                throw Error('Unknown field in Signup Form');
        }

        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password
        };

        dispatch(signup(user));
    }

    return (
        <div className='sign-up-form-container'>
            <h2 className='sign-up-header'>Make the most out of your musical talent!</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <div className="errors">{errors?.firstName}</div>
                    <span className='firstname-label'>Firstname</span>
                    <input
                        className='firstname-input' 
                        type="text"
                        value={firstName}
                        onChange={update('firstName')}
                        placeholder="Firstname"
                    />
                <div className="errors">{errors?.lastName}</div>
         
                    <span className='lastname-label'>Lastname</span>
                    <input
                        className='lastname-input' 
                        type="text"
                        value={lastName}
                        onChange={update('lastName')}
                        placeholder="Lastname"
                    />
                <div className="errors">{errors?.email}</div>
     
                    <span className='email-label'>Email</span>
                    <input 
                        className='email-input'
                        type="text"
                        value={email}
                        onChange={update('email')}
                        placeholder="Email"
                    />

                <div className="errors">{errors?.password}</div>
  
                    <span className='password-label'>Password</span>
                    <input 
                        className='password-input'
                        type="password"
                        value={password}
                        onChange={update('password')}
                        placeholder="Password"
                    />
          
                <div className="errors">
                    {password !== password2 && 'Confirm Password field must match'}
                </div>
                <span className='confirm-password-label'>Confirm Password</span>
                <input
                    className='confirm-password-input' 
                    type="password"
                    value={password2}
                    onChange={update('password2')}
                    placeholder="Confirm Password"
                />
                <div className='sign-up-button-container'>
                <input
                    className='sign-up-button'
                    type="submit"
                    value="Sign Up"
                    disabled={!firstName || !lastName || !email || !password || password !== password2}
                />
                </div>
            </form>
            <img className='background-img' src={background}></img>
        </div>
    );
}

export default SignupForm;