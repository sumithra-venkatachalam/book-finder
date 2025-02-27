import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/signup');
  };

  return (
    <div className="HeaderContainer">
      <h1 className="HeaderTitle">Book Finder</h1>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="LogoutIcon"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Header;
