import React from "react";
import headerLogo from '../images/header-logo.svg';
import { Link, Switch, Route } from 'react-router-dom';

export function Header({ onLogout, email }) {
  return (
    <header className="header">
      <img
        src={headerLogo}
        className="header__logo"
        alt="Логотип Mesto"
      />

      <div className="header__auth-panel">

        <p className="header__user-email">
          {email}
        </p>

        <Switch>
          <Route path="/sign-up">
            <Link className="header__link" to="/sign-in" >Войти</Link>
          </Route>

          <Route exact path="/">
            <Link className="header__logout-link" to="/sign-in" onClick={onLogout}>Выйти</Link>
          </Route>

          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up" >Регистрация</Link>
          </Route>
        </Switch>

      </div>
    </header>
  )
}

