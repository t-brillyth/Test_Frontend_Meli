import React, { Component } from "react";
import Axios from "axios";
import Searcher from "../Searcher/Searcher";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { number_format } from "../../helpers/helpers";
import "./Products.sass";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    //el state se crea vacio
    this.state = { producto: null };
  }
  //consultamos el detalle de producto
  componentDidMount() {
    this.queryAPI();
  }

  queryAPI = () => {
    const url = `http://localhost:5000/api/items/${this.props.id}`;
    //mandamos los headers de autorizacion
    return Axios.get(url).then((res) => {
      console.log("response", res.data);
      this.setState({ producto: res.data });
    });
  };

  render() {
    if (!this.state.producto) return null;
    const { title, price, picture, condition, sold_quantity, description } =
      this.state.producto;
    return (
      <React.Fragment>
        <Searcher
          searchProduct={this.props.searchProduct}
          redirectAfterSearch={true}
          termSearch={this.props.termSearch}
        />
        <Container>
          <Breadcrumbs categories={this.props.categories} />
          <Row>
            <div className="col-lg-12">
              <Card className="item-detalle">
                <Card.Body>
                  <Container className="producto-container">
                    <Row>
                      <Col sm={1} md={8} lg={{ order: 1 }}>
                        <Row>
                          <div className="img-container">
                            <img
                              className="card-img-top img-detail"
                              src={picture}
                              alt={title}
                            />
                          </div>
                        </Row>
                        <Row>
                          <p className="desciption-title mt-5">
                            Descripción del producto{" "}
                          </p>
                          <p className="product-description">{description}</p>
                        </Row>
                      </Col>
                      <Col sm={1} md={4} lg={4} xs={{ order: 1 }}>
                        <span className="condition">
                          {condition} - {sold_quantity} vendidos
                        </span>
                        <h5 className="card-text title mr-4">{title}</h5>
                        <h3 className="priceDetails">
                          {price.currency} {number_format(price.amount)}
                        </h3>
                        <div className="comprar-btn d-grid gap-2">
                          <Button variant="primary" size="lg">
                            Comprar
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
export default ProductDetail;
