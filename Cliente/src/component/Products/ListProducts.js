import React, { Component } from "react";
import Product from "./Products";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Searcher from "../Searcher/Searcher";
import { Container, Col } from "react-bootstrap";
import "./Products.sass";

class ListProducts extends Component {
  renderNoProductsFound = () => {
    if (this.props.productos.length === 0 && this.props.loaded) {
      return (
        <Col className="informG">
          <div className="info">
            <h3 className="header__title">Empieza tu busqueda.</h3>
            <ul className="links__list">
              <li>Revisá la ortografía de la palabra.</li>
              <li>Utilizá palabras más genéricas o menos palabras.</li>
              <li>
                <a href="https://www.mercadolibre.com.co/categories.html">
                  Navega por las categorías
                </a>{" "}
                para encontrar un producto similar.
              </li>
            </ul>
          </div>
        </Col>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Searcher
          searchProduct={this.props.searchProduct}
          termSearch={this.props.termSearch}
        />
        <Container>
          <Breadcrumbs categories={this.props.categories} />
          <div className="product-list">
            {Object.keys(this.props.productos).map((producto) => (
              <Product info={this.props.productos[producto]} key={producto} />
            ))}
          </div>
          {this.renderNoProductsFound()}
        </Container>
      </React.Fragment>
    );
  }
}
export default ListProducts;
