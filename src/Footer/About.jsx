import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const About = () => {
  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            <FontAwesomeIcon icon={faDumbbell} className="me-2" />
            Acerca de Gimnasio Active Energy
          </h2>
          <p>
            En Active Energy creemos que la energía está dentro de cada persona, solo hace falta despertarla. Somos un gimnasio moderno enfocado en ayudarte a alcanzar tu mejor versión a través de rutinas personalizadas, entrenamientos eficaces y un acompañamiento constante.

Nuestro objetivo es que cada usuario pueda entrenar de manera inteligente, adaptando los ejercicios a sus metas y ritmo. Por eso, ofrecemos rutinas diseñadas por profesionales que podés comprar y seguir desde nuestra plataforma, con la comodidad de entrenar donde y cuando quieras.

En Active Energy, no solo vendemos planes: creamos resultados reales.
Tu cuerpo, tu energía, tu cambio.
          </p >
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;