import { IconArrowLeft } from "@tabler/icons-react"
import "./inicio.css"
import { useEffect, useRef } from "react";
export default function Cotizar() {
    const sectionRefs = useRef<any>([]);

    useEffect(() => {

        let options = { threshold: 0.3 }

        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        };

        sectionRefs.current.forEach((sectionRef: any) => {
            const observer = new IntersectionObserver(callback, options);
            observer.observe(sectionRef);

            return () => {
                observer.disconnect();
            };
        });
    }, []);

    return (
        <main className="main">
            <section className='inicio' id="inicio" ref={el => sectionRefs.current[0] = el}>
                <div className="textoInicial">
                    <h1>
                        Gracias por solicitar
                        <br />
                        tu <span style={{ color: '#B4F6D0' }}>cotización </span>
                    </h1>
                    <p>
                        Conoce más acerca de nosotros, visita nuestro sitio web ahora utilizando el siguiente botón
                    </p>
                    <div className="botones">
                        <button onClick={() => { window.location.href = "../" }} className="btn btn-orange">Visitar sitio <span className="icono-boton"><IconArrowLeft /></span></button>
                    </div>
                </div>
                <div className="telefono-img">
                    <div className="arreglo-circulo"></div>
                    <img className="imagen-tel" src="/imagenes/telefono.png" alt="Imagen de interfaz inventarium" />
                </div>
            </section>
        </main>
    )
}