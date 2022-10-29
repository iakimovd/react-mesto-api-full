import React, { useState } from 'react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password })
  }

  function handleEmailSet(e) {
    setEmail(e.target.value);
  }

  function handlePasswordSet(e) {
    setPassword(e.target.value);
  }

  return (

    <div className="auth">
      <h3 className="auth__title">Вход</h3>
      <form className="auth__form"
        name="auth-form"
        // noValidate
        onSubmit={handleSubmit}>
        <input
          className="auth__input popup__input_type_email"
          id="email-input"
          type="email"
          name="email"
          placeholder="Email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={email}
          onChange={handleEmailSet}

        />
        <span className="auth__input-error" id="email-input-error"></span>
        <input
          className="auth__input popup__input_type_password"
          id="password-input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={handlePasswordSet}

        />
        <span className="auth__input-error" id="password-input-error"></span>
        <button className="auth__button" type="submit">Войти</button>
      </form>
    </div>
    
  )
}