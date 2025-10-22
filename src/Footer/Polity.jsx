import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Polity = () => {
  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            <FontAwesomeIcon icon={faDumbbell} className="me-2" />
            Acerca de Gimnasio Active Energy
          </h2>
          <p>
            1. Identificación del responsable

            Titular del sitio web: Active Energy
            Correo electrónico de contacto: contacto@activeenergy.com

            Sitio web: www.activeenergy.com
            (reemplazar por el dominio real)

            Active Energy se compromete a garantizar la seguridad de los datos personales de sus usuarios. Cuando solicitamos llenar campos con información personal mediante los cuales puedas ser identificado, lo hacemos asegurando que solo se empleará de acuerdo con los términos de este documento.

            <br></br>2. Información que se recopila

            El sitio web podrá recopilar la siguiente información:

            Datos personales: nombre, correo electrónico, número de teléfono, edad y otros datos necesarios para el registro o la compra de rutinas.

            Datos de pago: procesados de forma segura mediante plataformas externas (por ejemplo, Mercado Pago, PayPal u otras equivalentes). Active Energy no almacena información de tarjetas de crédito ni datos bancarios.

            Datos de uso del sitio: dirección IP, tipo de dispositivo, navegador, tiempo de visita, páginas visitadas y preferencias de navegación.

            Cookies y tecnologías similares: utilizadas para mejorar la experiencia del usuario y analizar el rendimiento del sitio.

            <br></br>3. Finalidad del tratamiento de los datos

            Los datos personales recopilados serán utilizados para las siguientes finalidades:

            Gestionar el registro de usuarios y permitir el acceso a la plataforma.

            Procesar la compra y entrega de rutinas personalizadas o servicios ofrecidos.

            Enviar comunicaciones relacionadas con las compras o el uso de la plataforma.

            Enviar información promocional, newsletters o notificaciones (solo con consentimiento previo).

            Mejorar la calidad del servicio, el contenido y la experiencia de navegación del usuario.

            Cumplir con obligaciones legales y fiscales aplicables.

            <br></br>4. Confidencialidad y seguridad de la información

            Active Energy se compromete a adoptar las medidas técnicas, administrativas y de seguridad necesarias para proteger la información personal de los usuarios y evitar su pérdida, alteración, acceso no autorizado o divulgación indebida.

            Los datos se almacenan en servidores seguros y se procesan conforme a las leyes vigentes de protección de datos.

            <br></br>5. Transferencia y cesión de datos

            Active Energy no vende, alquila ni cede información personal a terceros.
            Sin embargo, podrá compartir datos con proveedores de servicios que colaboren en la operación del sitio (por ejemplo, plataformas de pago o correo electrónico), siempre bajo estrictos acuerdos de confidencialidad y solo para los fines establecidos en esta política.

            <br></br>6. Derechos de los usuarios

            El usuario podrá, en cualquier momento, ejercer los siguientes derechos sobre sus datos personales:

            Acceso: solicitar una copia de los datos personales que poseemos.

            Rectificación: solicitar la corrección de datos inexactos o incompletos.

            Cancelación: solicitar la eliminación de sus datos personales cuando lo considere necesario.

            Oposición: oponerse al tratamiento de sus datos por motivos legítimos.

            Portabilidad: solicitar la transferencia de sus datos a otro responsable.

            Para ejercer estos derechos, el usuario podrá enviar un correo electrónico a contacto@activeenergy.com
            con el asunto “Protección de Datos”, detallando su solicitud e incluyendo su nombre completo y medio de contacto.

            <br></br>7. Uso de cookies

            Este sitio web utiliza cookies para personalizar la experiencia del usuario y analizar el tráfico del sitio.
            El usuario puede aceptar, rechazar o eliminar las cookies configurando su navegador web. La desactivación de cookies puede afectar el correcto funcionamiento de algunas funciones del sitio.

            <br></br>8. Enlaces a sitios externos

            El sitio web de Active Energy puede contener enlaces a otros sitios que pueden ser de tu interés. Una vez que hacés clic en estos enlaces y abandonás nuestro sitio, Active Energy no tiene control sobre el lugar al que sos redirigido y, por lo tanto, no es responsable de los términos, privacidad o protección de tus datos en esos sitios de terceros.

            <br></br>9. Conservación de los datos

            Los datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados o mientras exista una relación contractual con el usuario.
            Una vez finalizado dicho período, los datos serán eliminados o anonimizados de forma segura.

            <br></br>10. Cambios en la Política de Privacidad

            Active Energy se reserva el derecho de modificar la presente Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente. Se recomienda revisar esta sección periódicamente.

            <br></br>11. Aceptación de la Política de Privacidad

            El uso de este sitio web implica la aceptación plena de los términos de esta Política de Privacidad. Si el usuario no está de acuerdo con los mismos, deberá abstenerse de utilizar los servicios ofrecidos por Active Energy.
          </p >
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Polity;