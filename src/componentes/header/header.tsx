import "./header.css";
import { Link } from 'react-scroll';
import { useState, useEffect } from "react";

export default function MenuNavigation() {
    const [menu, setMenu] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="header" style={{ height: scrollPosition > 90 ? '50px' : '60px' }}>
            <div className="opac" style={{ opacity: scrollPosition > 90 ? 1 : 0 }}></div>
            <img style={{ width: scrollPosition > 90 ? '130px' : '150px' }} src="/logotipo.svg" alt="Logotipo Jukumari Adventure" />
            <ul className={menu ? 'menu menudos' : 'menu'}>
                <li>
                    <Link
                        activeClass="active"
                        to="inicio"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={1000}
                        onClick={() => { setMenu(!menu) }}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link
                        activeClass="active"
                        to="informacion"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={1000}
                        onClick={() => { setMenu(!menu) }}>
                        Servicios
                    </Link>
                </li>
                <li>
                    <Link
                        activeClass="active"
                        to="nosotros"
                        spy={true}
                        smooth={true}
                        offset={-40}
                        duration={1000}
                        onClick={() => { setMenu(!menu) }}>
                        Nosotros
                    </Link>
                </li>
                <li>
                    <Link
                        activeClass="active"
                        to="reservas"
                        spy={true}
                        smooth={true}
                        offset={-40}
                        duration={1000}
                        onClick={() => { setMenu(!menu) }}>
                        Reservar
                    </Link>
                </li>
                <li>
                    <Link
                        activeClass="active"
                        to="contacto"
                        spy={true}
                        smooth={true}
                        offset={-40}
                        duration={1000}
                        onClick={() => { setMenu(!menu) }}>
                        Reservar
                    </Link>
                </li>
            </ul>
            <input onChange={() => { setMenu(!menu) }} checked={menu} type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="toggle">
                <div className="bar bar--top"></div>
                <div className="bar bar--middle"></div>
                <div className="bar bar--bottom"></div>
            </label>
        </header>
    )
}
