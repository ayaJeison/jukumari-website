import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandWhatsapp, IconBus, IconChecklist, IconMap2, IconMountain, IconSend2 } from "@tabler/icons-react"
import MenuNavigation from "../componentes/header/header"
import "./inicio.css"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-scroll";
import { toast } from "react-toastify";
import { tipoRespuesta } from "../interfaces";

export default function Inicio() {
    const sectionRefs = useRef<any>([]);
    const [titulo, setTitulo] = useState('Agencia de turismo en el Tolima');
    const [descripcion, setDescripcion] = useState('Cotiza o contactanos, tambien puedes seleccionar alguno de nuestros próximos destinos para ver más información acerca de ellos');
    const [fondo, setFondo] = useState('fondo1.webp');
    const [ide, setIde] = useState(0);

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

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [asunto, setAsunto] = useState('');
    const enviarDatos = (event: any) => {
        event.preventDefault();
        const url = import.meta.env.VITE_URL;
        const datos = {
            nombre: nombre,
            telefono: telefono,
            correo: correo,
            asunto: asunto
        }
        const correod = {
            nombre: nombre,
            correo: correo,
        }
        Enviar(url, datos)
            .then(data => {
                if (data?.tipo === "success") {
                    toast.success('Hemos recibido tus datos, pronto nos pondremos en contacto contigo');
                    Correo(url, correod)
                        .then(() => {
                            toast.success('Gracias por enviar tus datos');
                        })
                } else {
                    toast.error('No pudimos recibir tus datos, intentalo nuevamente')
                }
            })
            .catch((error: any) => {
                toast.error('No pudimos recibir tus datos, intentalo nuevamente');
                console.log(error);
            })
            .finally(() => {
                setNombre('');
                setAsunto('');
                setCorreo('');
                setTelefono('');
            })
    }
    async function Enviar(url: string, datos: any) {
        try {
            let consulta = await fetch(`${url}app/enviar.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            if (!consulta.ok) {
                throw new Error("Ocurrió un error inesperado");
            }
            let respuesta: tipoRespuesta = await consulta.json();
            return respuesta;
        } catch (error) {
            toast.error('Ocurrió un error, recarga la página')
        }
    }
    async function Correo(url: string, datos: any) {
        try {
            let consulta = await fetch(`${url}app/correo.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            if (!consulta.ok) {
                throw new Error("Ocurrió un error inesperado");
            }
            let respuesta: any = await consulta.text();
            return respuesta;
        } catch (error) {
            toast.error('Ocurrió un error, recarga la página')
        }
    }

    const datos = [
        {
            id: 1,
            titulo: '¡Vamos al Nevado del Tolima!',
            descripcion: 'Vive la facinante experiencia de llegar hasta la cumbre del nevado del tolima con guias especializados y toda la seguridad para que distrutes tu experiencia',
            imagen: 'fondo1.webp'
        },
        {
            id: 2,
            titulo: '¡Viajemos a murillo en moto!',
            descripcion: 'Vive la facinante experiencia de llegar hasta la cumbre del nevado del tolima con guias especializados y toda la seguridad para que distrutes tu experiencia',
            imagen: 'fondo2.webp'
        },
        {
            id: 3,
            titulo: '¡Vamos a escalar y a aprender!',
            descripcion: 'Vive la facinante experiencia de llegar hasta la cumbre del nevado del tolima con guias especializados y toda la seguridad para que distrutes tu experiencia',
            imagen: 'fondo3.webp'
        },
        {
            id: 4,
            titulo: '¡Caminemos por lugares mágicos!',
            descripcion: 'Vive la facinante experiencia de llegar hasta la cumbre del nevado del tolima con guias especializados y toda la seguridad para que distrutes tu experiencia',
            imagen: 'fondo4.webp'
        }
    ]

    function cambioInfo(objeto: any) {
        setTitulo(objeto.titulo);
        setDescripcion(objeto?.descripcion);
        setFondo(objeto.imagen);
        setIde(objeto.id);
    }

    return (
        <>
            <MenuNavigation />
            <main className="main">
                <section className='inicio' id="inicio" ref={el => sectionRefs.current[0] = el}>
                    <div className="image-fondo">
                        <img src={`/imagenes/${fondo}`} alt="Imagen de producto" />
                        <div className="tapa"></div>
                    </div>


                    <div className="textoInicial">
                        <h1>
                            {titulo}
                        </h1>
                        <p>
                            {descripcion}
                        </p>
                        <div className="botones">
                            <Link
                                className="btn btn-blue"
                                activeClass="active"
                                to="cotizar"
                                spy={true}
                                smooth={true}
                                offset={-40}
                                duration={1000}>
                                Cotiza ahora <span className="icono-boton"><IconChecklist /></span>
                            </Link>
                            <button onClick={() => { window.location.href = "https://api.whatsapp.com/send?phone=57324 8231026&text=Quiero%20cotizar%20un%20viaje" }} className="btn btn-orange">Contáctanos <span className="icono-boton"><IconBrandWhatsapp /></span></button>
                        </div>
                    </div>
                    <div className="telefono-img">
                        <ul className="arreglo-circulo">
                            {
                                datos.length > 0 ?
                                    datos.map((data: any, index: number) => (
                                        data.id === ide ?
                                            <></>
                                            :
                                            <li key={index} onClick={() => { cambioInfo(data) }}> <img src={`/imagenes/${data.imagen}`} alt="" /><div className="tapar">{data.titulo}</div></li>
                                    ))
                                    : <></>
                            }
                        </ul>
                    </div>
                </section>
                <section className="informacion" id="informacion">
                    <div ref={el => sectionRefs.current[1] = el}>
                        <h2>Nuestros servicios</h2>
                        <ul className="listado-caracteristicas">
                            <li>
                                <div className="firt">
                                    <IconMountain size={60} stroke={1.5} />
                                    <span>
                                        Expediciones
                                    </span>

                                </div>
                                <div className="seco">
                                    Conoce lugares impresionantes y vive experiencias únicas con nuestras expediciones
                                </div>
                            </li>
                            <li>
                                <div className="firt">
                                    <IconMap2 size={60} stroke={1.5} />
                                    <span>
                                        Guianza Especializada
                                    </span>

                                </div>
                                <div className="seco">
                                    Contamos con un equipo de expertos, certificados y capacitados
                                </div>
                            </li>
                            <li>
                                <div className="firt">
                                    <IconBus size={60} stroke={1.5} />
                                    <span>
                                        Planes turísticos
                                    </span>

                                </div>
                                <div className="seco">
                                    Nos encargamos de organizar todo, solo elige un destino
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="info-part-2" ref={el => sectionRefs.current[2] = el}>
                        <div className="infp21">
                            <h2>Nuestros clientes</h2>

                            <ul>
                                <li>
                                    <img src="/imagenes/cliente1.jpg" alt="Cliente de Jukumari" />
                                    <div>
                                        <strong>July y Juan</strong>
                                        <p>
                                            La experiencia con la expedición al nevado del Tolima la quiero repetir, en Jukumary Todo es muy organizado
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <img src="/imagenes/cliente2.webp" alt="Cliente de Jukumari" />
                                    <div>
                                        <strong>July y Juan</strong>
                                        <p>
                                            La experiencia con la expedición al nevado del Tolima la quiero repetir, en Jukumary Todo es muy organizado
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <img src="/imagenes/cliente3.webp" alt="Cliente de Jukumari" />
                                    <div>
                                        <strong>July y Juan</strong>
                                        <p>
                                            La experiencia con la expedición al nevado del Tolima la quiero repetir, en Jukumary Todo es muy organizado
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </section>
                <section className="nosotros" id="nosotros" ref={el => sectionRefs.current[3] = el}>
                    <div className="conoce">
                        <div>
                            <span>Conoce</span>
                            <h2>Acerca de nosotros</h2>
                        </div>
                        <p>
                            Conoce Acerca de la empresa de turismo con mayor impacto en el Tolima.
                            Somos una empresa de turismo responsable, enfocados en proteger el medio ambiente y promover el turismo de manera responsable.
                            Nuestros planes, destinos o expediciones tienen un íntegro plan de desarrollo para que cada experiencia sea única y sobre todo segura.
                        </p>
                        <ul>
                            <li>
                                <strong>30</strong>
                                <small>Destinos</small>
                            </li>
                            <li>
                                <strong>08</strong>
                                <small>Caminatas por mes</small>
                            </li>
                            <li>
                                <strong>250</strong>
                                <small>Clientes en el último año</small>
                            </li>
                        </ul>
                    </div>
                    <div className="super-fondo"></div>
                </section>
                <section className="cotizar" id="reservas" ref={el => sectionRefs.current[4] = el}>
                    <h2>Reserva ahora</h2>
                    <form onSubmit={enviarDatos} className="formulario">
                        <div className="input-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input required value={nombre} onChange={(e) => { setNombre(e.target.value) }} type="text" id="nombre" placeholder="Escribe aquí" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input required value={telefono} onChange={(e) => { setTelefono(e.target.value) }} type="text" id="whatsapp" placeholder="Número de whatsapp" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="correo">Correo</label>
                            <input required value={correo} onChange={(e) => { setCorreo(e.target.value) }} type="text" id="correo" placeholder="Correo electrónico" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="mensaje">Mensaje</label>
                            <input required value={asunto} onChange={(e) => { setAsunto(e.target.value) }} type="text" id="mensaje" placeholder="Déjanos un mensaje" />
                        </div>
                        <div className="input-check">
                            <input required type="checkbox" id="permisos" />
                            <label htmlFor="permisos">Acepto el <a target="_blank" href="https://andromedacrea.com/politicas.html">tratamiento de mis datos</a></label>
                        </div>
                        <button type="submit" className="btn-enviar">Enviar datos <span className="icono-boton"><IconSend2 /></span></button>
                    </form>
                </section>
                <section className="contacto" id="contacto" ref={el => sectionRefs.current[5] = el}>
                    <div className="bola-con">
                    </div>
                    <div className="redes">
                        <h2>Contactanos</h2>
                        <p>Encuentranos en nuestras redes sociales o escríbenos un mensaje a nuestro chat de Whatsapp</p>
                        <div className="iconos-redes">
                            <div className="facebook" onClick={() => { window.location.href = "https://www.facebook.com/andromedacreat" }}><span><IconBrandFacebook /></span></div>
                            <div className="instagram" onClick={() => { window.location.href = "https://www.instagram.com/jukumariadventure/" }}><span><IconBrandInstagram /></span></div>
                            <div className="whatsapp" onClick={() => { window.location.href = "https://api.whatsapp.com/send?phone=57324 8231026&text=Quiero%20cotizar%20un%20viaje" }}><span><IconBrandWhatsapp /></span></div>
                            <div className="tiktok" onClick={() => { window.location.href = "https://www.tiktok.com/@jukumariadventure" }}><span><IconBrandTiktok /></span></div>
                        </div>
                    </div>
                </section>
                <footer className="footer">
                    <div><img src="/logotipo.svg" alt="Logotipo natal travel cartagena" /></div>
                    <div>
                        <strong>Contacto</strong>
                        <ul>
                            <li>contacto@jukumariadventure.com</li>
                            <li>(+57) 324 8231 026</li>
                            <li>info@jukumariadventure.com</li>
                        </ul>
                    </div>
                    <div>
                        <strong>Otros enlaces</strong>
                        <ul>
                            <li>&copy; Jukumari Adventure, {new Date().getFullYear()}</li>
                            <li>Todos los derechos reservados</li>
                            <li>Elaborado por <a href="https://andromedacrea.com">Andrómeda Crea</a></li>
                        </ul>
                    </div>
                </footer>
            </main>
        </>
    )
}