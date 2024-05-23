import React, { useContext } from 'react';
import styles from './styles/NavBar.module.sass';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '@context';

function NavBar() {
	const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

	return (
		<>
			<nav className={styles.NavBar}>
				<div>
					<NavLink to='/'>Logo</NavLink>
				</div>

				<div>
					{isLoggedIn ? (
                        <NavLink
                            to='/'
                            className={styles.navlink}
                            onClick={logOutUser}>
                            Logout
                        </NavLink>
					) : (
						<>
							<NavLink
								to='/login'
								className={styles.navlink}>
								Login
							</NavLink>
							<NavLink
								to='/signup'
								className={styles.navlink}>
								Signup
							</NavLink>
						</>
					)}
				</div>
			</nav>
		</>
	);
}

export default NavBar;
