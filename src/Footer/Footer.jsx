import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        
        <nav>
          <a href="/about" className="text-white mx-2">Acerca de</a>
          <a href="/contact" className="text-white mx-2">Contacto</a>
          <a href="/privacy" className="text-white mx-2">Política de privacidad</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
