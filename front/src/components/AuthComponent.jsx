import React, { useState } from 'react';
import './AuthComponent.css'; // Опционально — для стилей

const AuthComponent = (setUser) => {
  const [mode, setMode] = useState(null); // null, 'register', 'login'
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegisterClick = () => {
    if (mode === 'register') {
      // Отправка данных регистрации
      if (!login || !password || !confirmPassword) {
        setError('Все поля обязательны для заполнения');
        return;
      }
      if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }

      fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setError('');
            setSuccess(true);
          }
        })
        .catch(err => {
          console.error(err);
          setError('Ошибка при регистрации');
        });
    } else {
      // Переключение в режим регистрации
      setMode('register');
      setError('');
      setSuccess(false);
      setLogin('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleLoginClick = () => {
    if (mode === 'login') {
      // Отправка данных входа
      if (!login || !password) {
        setError('Логин и пароль обязательны');
        return;
      }

      fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setError('');
            setSuccess(true);
          }
        })
        .catch(err => {
          console.error(err);
          setError('Ошибка при входе');
        });
    } else {
      // Переключение в режим входа
      setMode('login');
      setError('');
      setSuccess(false);
      setLogin('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleBack = () => {
    setMode(null);
    setError('');
    setSuccess(false);
    setLogin('');
    setPassword('');
    setConfirmPassword('');
  };

  if (success) {
    setUser(login);
  }

  return (
    <div className="auth-container">
      <h2>Добро пожаловать</h2>

      {error && <div className="error-message">{error}</div>}

      {!mode ? (
        <div className="auth-buttons">
          <button onClick={handleRegisterClick} className="btn btn-primary">
            Регистрация
          </button>
          <button onClick={handleLoginClick} className="btn btn-primary">
            Вход
          </button>
        </div>
      ) : (
        <div className="auth-form">
          <h3>{mode === 'register' ? 'Регистрация' : 'Вход'}</h3>

          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
            />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label>Подтвердите пароль:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
              />
            </div>
          )}

          <div className="form-buttons">
            <button
              onClick={mode === 'register' ? handleRegisterClick : handleLoginClick}
              className="btn btn-success"
            >
              {mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
            </button>
            <button onClick={handleBack} className="btn btn-secondary">
              Назад
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;