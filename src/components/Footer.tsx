import { Container } from "react-bootstrap";
import qrcode from "../../public/imgs/misc/qr-code.png";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div>
          <h4>CompanyName</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            maxime provident doloribus nostrum dolorum dolorem, quidem expedita
            amet inventore ipsum, veniam asperiores non iusto suscipit ad, quas
            eaque deleniti quae.
          </p>
          <div>
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Tik Tok</span>
          </div>
        </div>
        <div>
          <div>
            <img src={qrcode} width="150px" className="qrcode"/>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
