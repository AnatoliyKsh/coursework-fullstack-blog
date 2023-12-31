import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {fetchRegister} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";
import {selectIsAuth} from "../../redux/slices/auth";


export const Registration = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const {register, handleSubmit , formState: {errors, isValid}} = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: "onChange"
    })

    // asynchronously submits user registration data and stores the token if available
    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))

        if (!data.payload) {
            return console.log('error payload')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('tekon', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Create account
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField error={Boolean(errors.fullName?.message)}
                           helperText={errors.fullName?.message}
                           {...register('fullName', {required: 'Write Full Name'})}
                            className={styles.field} label="Full Name" fullWidth/>
                <TextField error={Boolean(errors.email?.message)}
                           helperText={errors.email?.message} type="email"
                           {...register('email', {required: 'Write email'})}
                            className={styles.field} label="E-Mail" fullWidth/>
                <TextField error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message} type='password'
                           {...register('password', {required: 'Write Password'})}
                            className={styles.field} label="Password" fullWidth/>
                <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
                    Registration
                </Button>
            </form>
        </Paper>
    );
};
