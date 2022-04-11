import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import Error from './Error/Error';
import ListProducts from './Products/ListProducts';
import ProductDetail from './Products/ProductDetail';

class Router extends Component {
    //State se crea vacio
    state = {
        productos: [],
        termSearch: "",
        categories: [],
        loaded:false
      
    }
    //Se agregan los elementos
    componentDidMount() {
        this.searchProduct(this.state.termSearch);
    }

    searchProduct = (termSearch) => {
        const url = `http://localhost:5000/api/items?q=${termSearch}`;
        this.setState({termSearch:termSearch});
        //mandamos los headers
        Axios.get(url).then(res => {
            this.setState({ productos: res.data.items, categories: res.data.categories,loaded:true })
        })
    }


    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/**pasar datos al componente por props usamos render*/}
                    <Route exact path="/" render={() => (
                        <ListProducts productos={this.state.productos} categories={this.state.categories} searchProduct={this.searchProduct} termSearch={this.state.termSearch} loaded={this.state.loaded}/>
                    )}>
                    </Route>
                    <Route exact path="/items" render={() => (
                        <ListProducts productos={this.state.productos} categories={this.state.categories} searchProduct={this.searchProduct} termSearch={this.state.termSearch}/>
                    )}>
                    </Route>
                    {/*para mostrar estatico usamos component,si no hay que pasar datos*/}
                    <Route exact path="/items/:id" render={(props) => {
                        let idProducto = props.location.pathname.replace('/items/', '');
                        return (<ProductDetail id={idProducto} categories={this.state.categories}  searchProduct={this.searchProduct} termSearch={this.state.termSearch}/>)
                    }}>
                    </Route>

                    <Route component={Error}></Route>
                </Switch>
            </BrowserRouter >
        )
    }
}

export default Router;