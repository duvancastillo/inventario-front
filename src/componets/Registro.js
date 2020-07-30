import React, { useState } from 'react';



function Registro() {
    /** variables de estado */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, serPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [capture, setCapture] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email': 
                setEmail(value);
                break;
            case 'password':
                serPassword(value);
                break;
            default:
                setConfirmPassword(value);
                break;
        }
      
    }

    async function addUser(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            setCapture(true);

        } else {
            alert('la contraseña no coinciden')

        }
       
        if (capture) {
            const body = {
                name,
                password,
                email

            }
            try {
                const response = await fetch('http://localhost:4000/user',{
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
                
            }


        }
    }
    return (
        <div className="Registro">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card mt-4 text.center">
                            <div className="card-herder">
                                <h1>register account</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={addUser}>
                                    <div className="form-group">
                                        <input name="name" placeholder="nombre" value={name} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" onChange={handleChange} placeholder="email" value={email}  />
                                    </div>
                                   
                                    <div className="form-group">
                                        <input type="password" name="password" value={password} onChange={handleChange} placeholder="password" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="confirPassword" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Registro;