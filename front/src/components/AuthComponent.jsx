import { useState } from 'react';
import './AuthComponent.css';

const AuthComponent = ({ setUser }) => {
  const [mode, setMode] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, message: '', color: '#ddd' };

    const checks = [
      pwd.length > 6,
      pwd.length > 12,
      /[a-z]/.test(pwd),
      /[A-Z]/.test(pwd),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      /\d/.test(pwd),
    ];

    let score = checks.filter(Boolean).length;
    let message = '';
    let color = '#ddd';

    if (score < 3 || pwd.length < 6) {
      score = Math.min(score, 2);
      message = 'Слабый';
      color = '#ff4d4d'; 
    } else if (score === 3) {
      message = 'Ненадёжный';
      color = '#ff9933'; 
    } else if (score === 4) {
      message = 'Обычный';
      color = '#ffcc00'; 
    } else if (score === 5) {
      message = 'Сильный';
      color = '#66cc66'; 
    } else if (score === 6) {
      message = 'Безопасный';
      color = '#3399ff'; 
    }

    return { score, message, color };
  };

  const handleRegisterClick = () => {
    if (mode === 'register') {
      if (!login || !password || !confirmPassword) {
        setError('Все поля обязательны для заполнения');
        return;
      }
      if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }

      const { score } = getPasswordStrength(password);
      if (password.length < 6 || score < 3) {
        setError('Пароль слишком слабый. Используйте более надёжный пароль.');
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

  const passwordStrength = mode === 'register' ? getPasswordStrength(password) : null;

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
            {mode === 'register' && (
              <div className="password-strength-container">
                <div
                  className="password-strength-bar"
                  style={{
                    height: '6px',
                    width: `${(passwordStrength.score * 16.67)}%`,
                    maxWidth: '100%',
                    backgroundColor: passwordStrength.color,
                    borderRadius: '3px',
                    marginTop: '4px',
                  }}
                ></div>
                <div className="password-strength-label" style={{ marginTop: '4px', fontSize: '0.85em', color: `${passwordStrength.color}` }}>
                  {passwordStrength.message && `${passwordStrength.message}`}
                </div>
              </div>
            )}
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