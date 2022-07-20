import './Header.scss';
import burgerIcon from '../../assets/tt-burger-btn.svg';
import {useState} from "react";

/*
  Index
  ---------- ---------- ---------- ---------- ----------
  • Component declaration
  • Event handlers
  • Init & Export
*/

/*
  • Component declaration
  ---------- ---------- ---------- ---------- ----------
*/

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className={`App-header ${isOpen ? "--is-opened" : ''}`}>
            <button className="menu" onClick={() => setIsOpen(!isOpen)}>
                <img src={burgerIcon} alt="" aria-hidden={true}/>
            </button>
            
            <div className={"menu__content"}>
                <nav>
                    <a href={"#"} className={"menu__content__link"}>Nouvelle entrée</a>
                    <a href={"#"} className={"menu__content__link"}>Mes entrées</a>
                    <a href={"#"} className={"menu__content__link"}>Mon équipe</a>
                    <a href={"#"} className={"menu__content__link"}>FAQ</a>
                    <a href={"#"} className={"login-link menu__content__link"}>Déconnexion</a>
                    <a href={"#"} className={"menu__content__link"}>Mon Compte</a>
                </nav>
            </div>
        </header>
    );
}

/*
  • Event handlers
  ---------- ---------- ---------- ---------- ----------
*/

/*
  • Init & Export
  ---------- ---------- ---------- ---------- ----------
*/

export default Header;
