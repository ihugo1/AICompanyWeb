import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.seccion}>
          <h4>Contacto</h4>
          <p>Teléfono: 2216-9064</p>
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
          <p>Resid Lomas De San Francisco No 4 J-A Antgo Cusc San Salvador, San Salvador</p>

        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2025 AL Company.</p>
      </div>
    </footer>
  );
};