import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUsername } from '../../redux/usernameSlice';

function Header({ name }) {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => { 
    navigate('/');
    dispatch(clearUsername())


  };

  return (
    <div className="HeaderContainer">
      <h1 className="HeaderTitle">Book Finder</h1>
      <div className="nameAndIcon">
      <h2 className="loggedInUsername">{name}</h2>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="LogoutIcon"
        onClick={handleLogout}
      />
      </div>
    </div>
  );
}

export default Header;
