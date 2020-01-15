import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
   return (
      <footer className="page-footer light-blue darken-2">
         <div className="container">
            <div className="row">
               <div className="col l6 s12">
                  <h5 className="white-text">Hi there!</h5>
                  <p className="grey-text text-lighten-4">
                     This is a training project, which implements both front- and backend sides of Strategic Tic-Tac-Toe
                     game. Please feel free to register and try it out. Enjoy!
                  </p>
                  <p className="grey-text text-lighten-4">
                     Source code can be found on &nbsp;
                     <a
                        className="black-text text-lighten-1"
                        href="https://github.com/EzeeBreezy/tic-tac-toe"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <FontAwesomeIcon icon={faGithub} /> Github
                     </a>
                  </p>
               </div>
               <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Contact Me</h5>
                  <ul>
                     <li>
                        <a
                           className="grey-text text-lighten-3"
                           href="mailto:vladlibero@gmail.com"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <FontAwesomeIcon icon={faEnvelope} /> &nbsp; &lt;vladlibero@gmail.com&gt;
                        </a>
                     </li>
                     <li>
                        <a
                           className="grey-text text-lighten-3"
                           href="https://t.me/ezeebreezy"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <FontAwesomeIcon icon={faPaperPlane} /> &nbsp; @ezeebreezy
                        </a>
                     </li>
                     <li>
                        <a
                           className="grey-text text-lighten-3"
                           href="https://linkedin.com/in/vladyslav-panchenko"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <FontAwesomeIcon icon={faLinkedinIn} /> &nbsp; LinkedIn
                        </a>
                     </li>
                     <li>
                        <a
                           className="grey-text text-lighten-3"
                           href="https://github.com/EzeeBreezy"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <FontAwesomeIcon icon={faGithub} /> &nbsp; Github
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="footer-copyright">
            <div className="container">
               <span className="right">Vladyslav Panchenko, 2020</span>
            </div>
         </div>
      </footer>
   )
}
