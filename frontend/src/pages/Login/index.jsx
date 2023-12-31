import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onChange"
    })

    // asynchronously fetches user data, checks for a valid payload and stores the token
    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values))

        if (!data.payload) {
            return console.log('error payload')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('tekon', data.payload.token)
        }
        console.log(data)
    }

    // if the user is authenticated, redirects to the home page
    if (isAuth) {
        return <Navigate to={'/'}/>
    }


    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}><TextField
                className={styles.field}
                label="E-Mail"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {required: 'write email'})}
                fullWidth
            />
                <TextField className={styles.field} label="Password"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           {...register('password', {required: 'write password'})}
                           fullWidth/>
                <Button type={"submit"} size="large" variant="contained" fullWidth>
                    Login
                </Button></form>
        </Paper>
    );
};
