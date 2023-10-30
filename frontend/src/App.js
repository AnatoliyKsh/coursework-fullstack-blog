import Container from "@mui/material/Container";
import {Routes,Route} from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";
import React from 'react'

function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    React.useEffect(()=>
    {
        dispatch(fetchAuthMe())
    },[])

  return (
    <>

      <Container maxWidth="lg"><Header />
          <Routes>
              <Route path={'/'} Component={Home}/>
              <Route path={'/Posts/:id'} Component={FullPost}/>
              <Route path={'/Posts/:id/edit'} Component={AddPost}/>
              <Route path={'/add-post'} Component={AddPost}/>
              <Route path={'/Login'} Component={Login}/>
              <Route path={'/Registration'} Component={Registration}/>
          </Routes>
      </Container>
    </>
  );
}

export default App;
