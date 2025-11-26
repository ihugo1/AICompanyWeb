import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.seccion}>
          <h4>Contacto</h4>
          <p>Teléfono: 2216-6064</p>
          <p>Email: info@empresa.com</p>
        </div>
        <div className={styles.seccion}>
          <h4>Servicios</h4>
          <p>Instalación de Aires Acondicionados</p>
          <p>Mantenimiento Electromecánico</p>
          <p>Reparaciones Especializadas</p>
        </div>
        <div className={styles.seccion}>
          <h4>Ubicación</h4>
          <p>El Salvador</p>
          <p>Más de 10 años de experiencia</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2025 AL Company.</p>
      </div>
    </footer>
  );
};