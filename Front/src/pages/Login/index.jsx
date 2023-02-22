import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styles from "./Login.module.scss";
import { fetchAuth, isAuth } from "../../redux/slices/auth";

export const Login = () => {
	const isAuthUser = useSelector(isAuth)
	const dispatch = useDispatch()
	const { register, handleSubmit, setError, formState: { errors, isValid }, } = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = (values) => {
		dispatch(fetchAuth(values))
	}

	if (isAuthUser) {
		return <Navigate to='/' />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type='email'
					{...register('email', { required: 'Укажите почту' })}
					fullWidth
				/>
				<TextField className={styles.field}
					label="Пароль"
					error={Boolean(errors.password?.message)}
					helperText={errors.email?.password}
					{...register('password', { required: 'Введите пароль' })}
					fullWidth />
				<Button type="submit" size="large" variant="contained" fullWidth>
					Войти
				</Button>
			</form>
		</Paper>
	);
};
