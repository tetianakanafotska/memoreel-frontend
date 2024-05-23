import React from 'react';
import styles from './styles/NavBar.module.sass';
import { NavLink } from 'react-router-dom';

function NavBar() {
	return (
		<>
			<nav className={styles.NavBar}>
				<div>
                    <NavLink to='/'>Logo</NavLink>
                </div>

				<div>
					<NavLink to='/login' className={styles.navlink}>Login</NavLink>
					<NavLink to='/signup' className={styles.navlink}>Signup</NavLink>
				</div>
			</nav>
		</>
	);
}

export default NavBar;
