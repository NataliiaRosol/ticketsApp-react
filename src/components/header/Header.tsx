import { NavLink, useLocation } from "react-router";

function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? "header-link-active" : "";

  return (
    <header className="header">
      <h1 className="header-title">Flights App</h1>
        
        <div className="header-links">
          <NavLink to="/"  className={`header-link ${isActive('/')}`}>Home</NavLink> 
          <NavLink to="/cart" className={`header-link ${isActive('/cart')}`}>Cart</NavLink>
      
      </div>
    </header>
  );
}

export default Header;
