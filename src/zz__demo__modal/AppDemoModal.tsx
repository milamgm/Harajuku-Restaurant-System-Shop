import { useEffect, useRef, useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

type AppDemoModalProps = {
  openDemoModal: boolean;
  setOpenDemoModal: React.Dispatch<React.SetStateAction<boolean>>;
};
interface CarouselRef {
  element?: HTMLElement;
  prev: (e?: React.SyntheticEvent) => void;
  next: (e?: React.SyntheticEvent) => void;
}

//DISPLAYS A MODAL WITH INFORMATION ABOUT THE APP AND CREATES A NEW ORDER ID AND TABLE NUMBER (FOR DEMO PURPOSES)
const AppDemoModal = ({
  openDemoModal,
  setOpenDemoModal,
}: AppDemoModalProps) => {
  const { orderId, setOrderId, tableNum } = useAppContext();
  const carouselRefi = useRef<CarouselRef | null>(null);
const [restartAppImg, setRestartAppImg ] = useState("./imgs/demoModalImgs/spinner.gif")
  const handleRestartApp = () => {
    setOrderId(`AQ${Math.floor(Math.random() * 9000000)}`);
    onNextClick();
  };

  //Carousel Controls
  const onPrevClick = () => {
    carouselRefi.current?.prev();
  };
  const onNextClick = () => {
    carouselRefi.current?.next();
  };
  return (
    <Modal
      show={openDemoModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>App Demo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel
        fade
          interval={null}
          controls={false}
          indicators={false}
          ref={carouselRefi}
        >
          {orderId !== "" && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./imgs/demoModalImgs/restart.png"
              />
              <Carousel.Caption>
                <h5 className="mb-4" style={{ backgroundColor: "#111111" }}>
                  Are you sure you want to restart the app?
                </h5>
                <button onClick={() => setOpenDemoModal(false)}>No</button>
                <button onClick={handleRestartApp}>Yes</button>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./imgs/demoModalImgs/tablet.png"
            />
            <Carousel.Caption>
              <h5 className="mb-4" style={{ backgroundColor: "#111111" }}>
                Welcome to the demo of the restaurant app for customers. Each
                restaurant table would be equipped with tablets where customers
                can place their orders directly from this app. Orders will be
                automatically sent to the kitchen."
              </h5>
              <button
                className="mt-2"
                style={{ width: "100px" }}
                onClick={onNextClick}
              >
                Next
              </button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./imgs/demoModalImgs/cart.png"
            />
            <Carousel.Caption>
              <h5 className="mb-4" style={{ backgroundColor: "#111111" }}>
                The products you add to the cart will be automatically sent to
                the kitchen after a stipulated time (for demo 15 secs); if you
                keep adding items, the time may increase (till max. 50 secs).
              </h5>
              <button
                style={{ backgroundColor: "#54a1a6" }}
                onClick={onPrevClick}
              >
                Back
              </button>
              <button style={{ width: "100px" }} onClick={onNextClick}>
                Next
              </button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./imgs/demoModalImgs/buttons.png"
            />
            <Carousel.Caption>
              <h5 className="mb-5" style={{ backgroundColor: "#111111" }}>
                You can check the items in your cart as well as the panel of
                items in the kitchen and served items, by clicking on the two
                buttons on the bottom right hand side of the screen.
              </h5>
              <button
                style={{ backgroundColor: "#54a1a6" }}
                onClick={onPrevClick}
              >
                Back
              </button>
              <button style={{ width: "100px" }} onClick={onNextClick}>
                Next
              </button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./imgs/demoModalImgs/ready.png"
            />
            <Carousel.Caption>
              <h5 className="mb-4" style={{ backgroundColor: "#111111" }}>
                If you want to reset the demo, click on the "reset demo" button.
                <br /> <br /> Your order id is : {orderId} <br />
                Your table number is : {tableNum}
                <br />
                <br /> Please have a seat and enjoy your meal!
              </h5>
              <button
                style={{ backgroundColor: "#54a1a6" }}
                onClick={onPrevClick}
              >
                Back
              </button>
              <button
                style={{ backgroundColor: "#02ca27" }}
                onClick={() => setOpenDemoModal((prev: boolean) => !prev)}
              >
                Start the demo
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default AppDemoModal;
