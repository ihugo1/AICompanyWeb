import { useState } from 'react';
import { supabase } from '../../api/supabase.client';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Redirect to the admin page on successful login
      navigate('/admin');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h2 className={styles.titulo}>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.campo}>
            <label className={styles.label} htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.campo}>
            <label className={styles.label} htmlFor="password">
              Contraseña
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button
            className={styles.boton}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};
