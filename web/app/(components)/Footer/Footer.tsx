import { ContactUs } from './ContactUs';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="footer__items">
          <div className="footer__item menu">
            <h3>Menu</h3>
            <menu>
              <li>
                <a href="#o-mne">O mne</a>
              </li>
              <li>
                <a href="#ponuka">Ponuka</a>
              </li>
              <li>
                <a href="#fotenie">Fotenie</a>
              </li>
              <li>
                <a href="#cennik">Cenník</a>
              </li>
              <li>
                <a href="#galeria">Galéria</a>
              </li>
              <li>
                <a href="#kontakt">Kontakt</a>
              </li>
            </menu>
          </div>
          <div className="footer__item contact">
            <h3 className="footer__item-title" id="kontakt">
              Kontakt
            </h3>
            <ul className="footer__item-list">
              <li>
                <a href="tel:+421911397538">+421 911 397 538</a>
              </li>
              {/* <li>
                <a href="mailto:annamaria@leonafoto.sk">
                  annamaria@leonafoto.sk
                </a>
              </li> */}
              <li>
                <a href="https://www.facebook.com/profile.php?id=100085023186786">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__item address">
            <h3 className="footer__item-title">Adresa</h3>
            <ul className="footer__item-list">
              <li>Leonafoto.sk</li>
              <li>Annamária Bánová</li>
              <li>Údernícka 6</li>
              <li>Petržalka</li>
              <li>851 01 Bratislava</li>
            </ul>
          </div>
          <div className="footer__item map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.38182900914!2d17.093755015648462!3d48.12215947922216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c899d5dea7b89%3A0xdd61199a903eb608!2zw5pkZXJuw61ja2EgNiwgODUxIDAxIFBldHLFvmFsa2E!5e0!3m2!1ssk!2ssk!4v1668962429421!5m2!1ssk!2ssk"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa"
            ></iframe>
          </div>
          <div className="footer__item write-me">
            <h3 className="footer__item-title">Napíšte mi</h3>
            <ContactUs />
          </div>
        </div>
      </div>
    </footer>
  );
};
