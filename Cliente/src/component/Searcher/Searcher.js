import React, { Component } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./Searcher.sass";

class Searcher extends Component {
  state = { termSearch: this.props.termSearch, redirect: false };

  readData = (e) => {
    this.setState({ termSearch: e.target.value });
  };

  searchProducts = () => {
    this.props.searchProduct(this.state.termSearch);
    if (this.props.redirectAfterSearch) {
      this.setState({ redirect: true });
    }
  };

  //Redireccion al listado de productos
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/items" />;
    }
  };

  //buscar al presionar enter
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.searchProducts();
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <header>
          <Container>
            <Navbar expand="lg" variant="light">
              <Container className="px-0">
                <Link className="navbar-brand" to={"/"}>
                  <img src="/img/Logo_ML.png" alt="Logo Mercado Libre" />
                </Link>
                <div className="navbar-collapse">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.termSearch || ""}
                      placeholder="Nunca dejes de buscar"
                      onChange={this.readData}
                      onKeyPress={this.handleKeyPress}
                    />
                    <div className="input-group-prepend">
                      <Button variant="light" onClick={this.searchProducts}>
                        <img src="/img/ic_search.png" alt="icono buscar" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Container>
            </Navbar>
          </Container>
        </header>
      </React.Fragment>
    );
  }
}
export default Searcher;
