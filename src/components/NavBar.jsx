import logo from '../img/UNIMET_neg.png'
import { routes } from '../constants/routes';
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"
import { useUser } from '../context/user';

export default function NavBar() {
  const user = useUser();
    return (
     

      <header className={styles.header}>
      <img className="logo" width="100px" height="40px"  src={logo} ></img>

      
      {user ? 
        <nav className={styles.nav}>
         <NavLink
            key={routes[0].path}
            to={routes[0].path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {routes[0].name}
          </NavLink>

          <NavLink
            key={routes[3].path}
            to={routes[3].path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {routes[3].name}
          </NavLink>

          <NavLink
            key={routes[4].path}
            to={routes[4].path}
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-link"]} ${styles.active}`
                : styles["nav-link"]
            }
          >
            {routes[4].name}
          </NavLink>
      </nav>
    
      
      :  <nav className={styles.nav}>
      <NavLink
      key={routes[1].path}
      to={routes[1].path}
      className={({ isActive }) =>
        isActive
          ? `${styles["nav-link"]} ${styles.active}`
          : styles["nav-link"]
      }
    >
      {routes[1].name}
    </NavLink>
    </nav>
      }
      <section>
        {user && (
          <>
            <div>{user.nombre}</div>
            <div>PERFIL</div>
          </>
        )}
      </section>
    </header>
      );
    }
    styles["nav-link"];

