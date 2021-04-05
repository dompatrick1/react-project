import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../LoginFormPage/LoginForm.css';

function DemoForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('demo@demo.com');
    const [password, setPassword] = useState('demoUser');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
      <Redirect to="/" />
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="guestContainer">
                <label>
                <input
                    type="hidden"
                    value={credential}
                    required
                />
                </label>
                <label>
                <input
                    type="hidden"
                    value={password}
                    required
                />
                </label>
                <button type="submit">Guest Log In</button>
            </div>
            </form>
        </>
    )

}

export default DemoForm;
