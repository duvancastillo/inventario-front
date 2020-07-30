import React, { useState } from 'react';
function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      default:
        setPassword(value);
        break;
    }
  }
  async function login(e) {
    e.preventDefault();
    const body = {
    
      password,
      email

  }
  try {
      const response = await fetch('http://localhost:4000/authentic',{
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'

        }
      });
      const json = await response.json();
      console.log(json);
  } catch (error) {
      console.log(error)
  }


}
  


  return (

    <div className="Home">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="card mt-4 text.center">
              <div className="card-herder">
                <h1>account login</h1>
              </div>
              <div className="card-body">
                <form onSubmit = {login}>
                  <div className="form-group">
                    <input type="email" value = {email} name="email" onChange={handleChange} placeholder="email" />
                  </div>
                  <div className="form-group">
                    <input type="pasword" value = {password} name="password" onChange={handleChange} placeholder="password" />
                  </div>
                  <button type="submit" className="btn btn-primary">login</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;