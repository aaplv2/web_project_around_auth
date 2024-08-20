import logoAroundPath from "../images/around-the-us-white.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoAroundPath}
        alt="Logo Around The U.S."
      />
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
