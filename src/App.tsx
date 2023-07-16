import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import MyCards from './pages/cards/MyCards';
import { Brightness4, Business, } from '@mui/icons-material';
import LogIn from './auth/LogIn';
import SingUP, { User } from './auth/SingUp';
import Faivorit from './pages/cards/Faivorit';
import { ThemeProvider, useTheme } from '@emotion/react';
import { CssBaseline, IconButton, createTheme } from '@mui/material';
import Home, { CardPackage } from './pages/Home';
import AdminGuard from './auth/AdminGuard';
import UserManager from './pages/UserManger';
import Cards from './pages/cards/Cards';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import NewCard from './pages/cards/NewCard';
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import Edit from './pages/cards/Edit';
import RouteGuard from './auth/RouteGuard';
import BusinessGuard from './auth/BusinessGuard';
import SingalCardPage from './pages/cards/singalCardPage';
import Footer from './components/footer';


interface Context {
  admin: boolean
  setAdmin: Function
  userName: string
  setUserName: Function
  business: boolean
  setBusiness: Function
  loginEmail:String
  setLoginEmail:Function


  cardsLove:Array<string>
  setCardsLove:Function

  cards:Array<CardPackage>
  setCards:Function
}

export const AppContext = createContext<Context | null>(null);

  const darktheme = createTheme({
    palette:{
      mode:'dark'
    },
  });
function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [admin, setAdmin] = useState(false);
  const [business, setBusiness] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [cardsLove, setCardsLove] = useState<Array<string>>([""]);
  const [userName, setUserName] = useState('');
  const [cards, setCards] = useState<Array<CardPackage>>([]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  function handelClick(){
    const toggleMode=mode ==='light' ? 'dark' : 'light'
    setMode(toggleMode)
  }
  
  return (
    
      
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{
          cards,
          setCards,
                admin,
                setAdmin,
                userName,
                setUserName,
                business,
                setBusiness,
                loginEmail,
                setLoginEmail,
                cardsLove,
                setCardsLove
               
                
      }}>
        <CssBaseline/>

        <Header/>
        <ToastContainer
          position="top-right"
          theme="dark"
        />
        <IconButton
        color='info'
        onClick={handelClick}
        >
         <Brightness4 
         color='inherit'/>
        </IconButton>

          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='login' element={<LogIn/>}/>
          <Route path='signup' element={<SingUP/>}/>
          <Route path='cards' element={<Cards />}/>
          <Route path='business/:id' element={<SingalCardPage />}/>

          <Route
            path="myCards"
            element={
              <BusinessGuard>
                <MyCards/>
              </BusinessGuard>}
          />

          <Route
            path="edit/:id"
            element={
              <RouteGuard>
                <Edit />
              </RouteGuard>}
          />
          <Route
            path="add"
            element={
              <BusinessGuard>
                <NewCard/>
              </BusinessGuard>}
          />
         <Route
            path="faivorit"
            element={
              <RouteGuard>
                <Faivorit/>
              </RouteGuard>}
          />
         <Route
            path="users"
            element={
              <AdminGuard>
                <UserManager />
              </AdminGuard>
            }
          />
          </Routes>
          <Footer/>
          </AppContext.Provider>
      </ThemeProvider>


    

   
  );
}

export default App;
