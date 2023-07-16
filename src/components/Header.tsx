import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, styled, alpha, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from "react-router-dom";
import { verifyToken } from "../auth/TokenManager";
import Logout from "../auth/Logout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { CardPackage } from "../pages/Home";
import { getCards } from "../services/ApiService";


function Header() {
  const context = useContext(AppContext);
function validateAdmin(): boolean {
    return context?.admin as boolean;
  }
  function validateBusiness(): boolean {
    return context?.business as boolean;
  }
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));
    
      const [search, setSearch] = useState('');
      useEffect(() => {
        getCards()
            .then(json => {
              if (context) {
                context.setCards(json)
              }
            })
    }, []);
    const cards1=context?.cards as CardPackage[]
      function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {

        const value = e.target.value;
        setSearch(value);
        console.log(value);

        const normalizedValue = value.trim().toLowerCase();
        const filtered: Array<CardPackage> = cards1.filter(
            card => (card.title as string).toLowerCase().includes(normalizedValue)
        );

        context?.setCards(filtered);
    }

    return (
     
        <AppBar position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavLink to="/" className="navbar-brand">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,display: { xs: 'none', md: 'flex' },fontFamily: 'monospace',fontWeight: 700,letterSpacing: '.3rem',color: 'inherit',textDecoration: 'none',
              }}
            >
              logo
            </Typography>
            </NavLink>
            
            <NavLink to="/about" className="navbar-brand">
            <Typography variant="h6" component="div" sx={{ mr: 2,display: { xs: 'none', md: 'flex' } }}>
                About         
          </Typography>
          </NavLink>
         
          
          <NavLink to="/cards" className="navbar-brand">
          <Typography variant="h6" component="div" sx={{mr: 2,display: { xs: 'none', md: 'flex' } }}>
            All cards
          </Typography>
          </NavLink>
          
          {validateAdmin() &&
            <Typography variant="h6" component="div" sx={{mr: 2,display: { xs: 'none', md: 'flex' } }}>
              <NavLink to="/users" className="navbar-brand">
                Users Manager
              </NavLink>
              </Typography>
                        }
          {validateBusiness() &&
          <>
          <NavLink to="/faivorit" className="navbar-brand">
          <Typography variant="h6" component="div" sx={{mr: 2,display: { xs: 'none', md: 'flex' } }}>
            Faivorits
          </Typography>
          </NavLink>

          <NavLink to="/myCards" className="navbar-brand">
          <Typography variant="h6" component="div" sx={{mr: 2,display: { xs: 'none', md: 'flex' } }}>
            My cards
          </Typography>
          </NavLink>

          <NavLink to="/add" className="navbar-brand">
          <Typography variant="h6" component="div" sx={{mr: 2,display: { xs: 'none', md: 'flex' } }}>
            Add Card
          </Typography>
          </NavLink>
          </>}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />

          </Search>
         
          {!verifyToken() &&
          <NavLink to="/login" className="navbar-brand">
            <Button color="inherit" >Login</Button>
          </NavLink>
          
          }
          {!verifyToken() &&
          <NavLink  to="/signup" className="navbar-brand">
            <Button color="inherit" >SING UP</Button>
          </NavLink>
          }
          {verifyToken() &&
            <Logout/>
          }
          </Toolbar>
        </Container>
      </AppBar>
      
    );
}

export default Header;