import React from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { number_format } from "../../helpers/helpers";
import "./Products.sass";

const Product = (props) => {
  const { title, price, picture, id, address, free_shipping } = props.info;
  const show_free_shipping = () => {
    if (!free_shipping) {
      return (
        <img
          className="imgfree ml-2"
          src="/img/ic_shipping.png"
          alt="Envío gratis"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2} className="img-item-list-container">
            <Link to={`/items/${id}`}>
              <img className=" img-item-list" src={picture} alt={title} />
            </Link>
          </Col>
          <Col xs={7} className="text-col">
            <div className="priceDiv">
              <h5 className="price">
                {price.currency} {number_format(price.amount)}{" "}
                {show_free_shipping()}{" "}
              </h5>
            </div>
            <Link to={`/items/${id}`} className="linkText">
              <p className="card-text item-title">{title}</p>
            </Link>
          </Col>
          <Col className="text-col">
            <p className="card-text address-text">{address.state_name}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Product;
