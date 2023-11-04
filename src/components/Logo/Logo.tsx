import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import classes from './Logo.module.css';

const Logo = function () {
  return (
    <div>
      <NavLink to={'/page/1'}>
        <img src={logo} className={classes.logo} alt="Beer logo" />
      </NavLink>
    </div>
  );
};

export default Logo;
