import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

//crear servidor
const app = express();
//configurar para que use json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//endpoints 
app.get("/api/items", async (req, res) => {

  //busqueda por default->param undefined ya que trae resultados aleatorios de la api

  let search_param = req.query.q === "none" ? undefined : req.query.q;
  let url = `https://api.mercadolibre.com/sites/MLA/search?q=${search_param}`;

  axios.get(url).then((reponse) => {

    let api_results = reponse.data.results;
    let api_filters = reponse.data.filters;

    //crear objeto respuesta
    let results = { author: { name: "Tania", lastname: "Forero" }, categories: [], items: [] };

    //recorro los item obtenidos desde la API y lo agrego a los items de mi respuesta
    api_results.slice(0, 4).map(api_item => {

      let item = {
        id: api_item.id,
        title: api_item.title,
        price: {
          currency: api_item.currency_id === "ARS" ? "$" : api_item.currency_id,//fix para que aparezca el caracter $ en vez de ARS
          amount: api_item.price,
          decimals: 0.0 //fix decimals, no se encuentra en la respuesta de la API
        },
        picture: api_item.thumbnail,
        condition: api_item.condition === "new" ? "Nuevo" : "Usado",
        free_shipping: api_item.shipping.free_shipping,
        address: api_item.address
      };
      //agrego el item al array
      results.items.push(item);
    })

    if (api_filters && api_filters.length > 0) {
      //recorro los filtros y lo agrego a la categorias de mi respuesta
      api_filters[0].values[0].path_from_root.map(api_filter => {

        let filter = api_filter.name;
        results.categories.push(filter)
      })
    }
    //devolvemos la respuesta
    res.json(results);
  }).catch(error => {
    console.log("Error", error);
  })
})
const getItemAPI = async (id) => {
  let url = `https://api.mercadolibre.com/items/${id}`;

  try {
    return axios.get(url);
  } catch (error) {
    console.log("Error", error);

  }
}

const getItemDescriptionAPI = async (id) => {
  let url = `https://api.mercadolibre.com/items/${id}/description`;

  try {
    return axios.get(url);
  } catch (error) {
    console.log("Error", error);

  }
}


app.get("/api/items/:id", async (req, res) => {
  const api_response = await getItemAPI(req.params.id);
  const api_response_description = await getItemDescriptionAPI(req.params.id);
  //crear objeto respuesta
  let result = { author: { name: "Tania", lastname: "Forero" }, item: {} };

  //verificamos si se obtuvo el item de la API
  if (api_response.data && api_response_description.data) {

    let api_item = api_response.data;
    let description_api = api_response_description.data;

    let item = {
      id: api_item.id,
      title: api_item.title,
      price: {
        currency: api_item.currency_id === "ARS" ? "$" : api_item.currency_id,//fix para que aparezca el caracter $ en vez de ARS
        amount: api_item.price,
        decimals: 0.0 //fix decimals, no se encuentra en la respuesta de la API
      },
      picture: api_item.pictures[0].url,
      condition: api_item.condition === "new" ? "Nuevo" : "Usado",
      free_shipping: api_item.shipping.free_shipping,
      address: api_item.address,
      sold_quantity: api_item.sold_quantity,
      description: description_api.plain_text
    };
    res.json(item);
  } else {
    result.error = true;
    res.json(result);
  }


})

//poner el servidor a escuchar
app.listen(5000, () => {
  console.log("Escuchando en puerto 5000");
});