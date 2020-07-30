import React, { useEffect, useState } from 'react';






function Articles() {
  //** varaibles de estado */
  const [articles, setArticles] = useState([]);
  const [name, setName] = useState('');
  const [reference, setReference] = useState('');
  const [price, setPrice] = useState('');
  const [dbid, setId] = useState('');
  const [edit, setEdit] = useState(false);
  const [captura, setCaptura] = useState(false);


  /** 
   * descripcion: recibe id desde button delete
   * funtion: elimina articulo correspondente al id requerido
   * return: nuevo array sin el articulo eliminado
  */
  async function deleteArticle(id) {
    if (window.confirm('desea eliminar el articulo')) {

      try {
        await fetch(`http://localhost:4000/article/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'

          }
        })
        const filter = articles.filter(item => item._id !== id);
        setArticles(filter);

      } catch (error) {
        console.log(error);
      }
    }
  }
  /** 
   * descricion: recibe el artculo desde el boton update
   * funcion : actuliza el estado de las variables
  */
  async function editArticles(article) {
    setName(article.name);
    setReference(article.reference);
    setPrice(article.price);
    setId(article._id);
    setEdit(true);
  }
  /**
   * 
   *  
   */
  async function update(e) {
    e.preventDefault();
    const body = {
      name,
      price,
      reference,
      _id: dbid
    }
    try {
      console.log(dbid);
      await fetch(`http://localhost:4000/article/${dbid}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        }

      }
      )
      //mostrar los articulos despues de actualizar
      const filter = articles.map(item => {
        if (item._id === dbid) {
          item = body;
        }
        return item;

      });
      setArticles(filter);
      

    } catch (error) {
      console.log(error);
    }
    setName('');
    setPrice('');
    setReference('');
    setId('');
  }

  /***
   * funcion: cancela la edicion del articulo
   */
  function cancelEdit() {
    setName('');
    setPrice('');
    setReference('');
    setId('');
  }
  /**
   * descripcion : llegan datos desde el formulario
   * funcion : captura datos desde el formulario 
   * 
   */
  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'reference':
        setReference(value);
        break;
      default:
        setPrice(value);
        break;
    }
    setCaptura(true);
  }

  /**
   * descripcion: recibe los datos agregados desde haldChangue
   * funcion : envia los datos del article al servidor
   */
  async function addArticles(e) {
    e.preventDefault();
    const body = {
      name,
      price,
      reference
    }
    if (captura) {
      try {

        const response = await fetch('http://localhost:4000/article', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'

          }

        });
        const json = await response.json();
        console.log(json);
        setArticles([...articles, json['response']])

      } catch (error) {
        console.log(error);
      }
      setName('');
      setPrice('');
      setReference('');
      setId('');
      setCaptura(false);
    }
  }
  /**
   * funcion mostrar articulo que se ejecuta apenas arranca la app y se renderiza
   * cada vez que hay un cambio de estado
   */

  useEffect(() => {
    async function getData() {

      try {
        const data = await fetch('http://localhost:4000/article');
        const response = await data.json();
        console.log(response);
        setArticles(response);
      } catch (error) {

        console.log(error);
      }
    }
    getData();


  },
    [])





  return (
    <div>
      {/** NAVEGATION */}


      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-heder">
                <h1>add articles</h1>
              </div>
              <div className="card-body">
                <form onSubmit={addArticles}>
                  <div className="form-group">
                    <input type="text" name="reference" value={reference} onChange={handleChange} placeholder="referencia" className="form-control" />
                  </div>
                  <div className="form-group">
                    <input type="text" name="name" value={name} onChange={handleChange} placeholder="name" className="form-control" />
                  </div>
                  <div className="form-group">
                    <input type="text" name="price" value={price} onChange={handleChange} placeholder="price" className="form-control" />
                  </div>
                  {edit === false ?
                    <button type="submit" className="btn btn-primary">create</button>
                    :
                    <div>
                      <button type="submit" onClick={update} className="btn btn-primary">update</button>

                      <button type="button" onClick={cancelEdit} className="btn btn-primary">cancel</button>

                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">ref</th>
                  <th scope="col">neme</th>
                  <th scope="col">price</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {
                  articles.map((article) => {
                    return (

                      <tr key={article._id}>
                        <td> {article.reference}</td>
                        <td> {article.name}</td>
                        <td> {article.price}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => editArticles(article)} style={{ margin: '4px', fontSize: '4px' }}>
                            <i className="material-icons">edit</i>
                          </button>
                          <button className="btn btn-danger" onClick={() => deleteArticle(article._id)} style={{ margin: '4px', fontSize: '4px' }}>
                            <i className="material-icons" >delete</i>
                          </button >
                        </td>
                      </tr>


                    )
                  })
                }
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  )
}


export default Articles;