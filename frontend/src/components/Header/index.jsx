import React from 'react';
import Button from '@mui/material/Button';
import {Link, Router, Routes} from "react-router-dom";
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch  = useDispatch()

  const onClickLogout =  () =>{
    if(window.confirm("logOut"))dispatch(logout())
    window.localStorage.removeItem('token')
  }


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>

          <Link className={styles.logo} to="/">
            <div>Own Blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">write a article</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Sing in</Button>
                </Link>
                <Link to="/Registration">
                  <Button variant="contained">Craete Accoute</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
