import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth, logout } from '../../redux/slices/auth';

export const Header = () => {
	const isAuthUser = useSelector(isAuth)
	const dispatch = useDispatch();

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			dispatch(logout())
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>KardopoloFF BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuthUser ? (
							<>
								<Link to="/new-post">
									<Button variant="contained">Написать статью</Button>
								</Link>
								<Button onClick={onClickLogout} variant="contained" color="error">
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link to="/new-account">
									<Button variant="contained">Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
