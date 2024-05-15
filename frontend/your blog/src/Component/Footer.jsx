import React from 'react'
import Logo from '../../public/images/logo.png'


function Footer() {
  return (
    <footer>
      <div style={{ backgroundColor: '#b9e7e7' }}>
      <img  src={Logo} alt="" />
      </div> 
      <span>
        Made with ♥️ and <b>React.js</b>
      </span>
    </footer>
  )
}

export default Footer
