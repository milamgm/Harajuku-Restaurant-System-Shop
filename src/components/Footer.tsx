import { Container } from "react-bootstrap";
import qrcode from "../../public/imgs/misc/qr-code.png";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div>
          <h4 className="logo">
            H<span>arajuku</span>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            maxime provident doloribus nostrum dolorum dolorem, quidem expedita
            amet inventore ipsum, veniam asperiores non iusto suscipit ad, quas
            eaque deleniti quae.
          </p>
          <div>
            <span>
              <img
                className="m-3"
                src="https://www.svgrepo.com/show/450132/facebook.svg"
                alt=""
                width="30"
              />
            </span>
            <span>
              <img
                className="m-3"
                src="https://www.svgrepo.com/show/382725/instagram.svg"
                alt=""
                width="30"
              />
            </span>
            <span>
              <img
                className="m-3"
                src="https://www.svgrepo.com/show/343529/twitter-social-media-communication-network-internet-connection.svg"
                alt=""
                width="30"
              />
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
