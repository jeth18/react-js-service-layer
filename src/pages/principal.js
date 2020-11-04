import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class principal extends Component {
    
verifyRoute = () => {
        if (!sessionStorage.getItem('token')) {
            return this.props.history.push('/');  
        }
        //let headers = {"Content-Type": "application/json"};
        //headers["Authorization"] = "Bearer " + sessionStorage.getItem('token')
        console.log("entro", 'token', sessionStorage.getItem('token'));
};


constructor(props) {
    super(props)
    this.state = {
          values:[]
    }
};

getValuesData = async () => {
  const getValuesCall = "https://192.168.1.5:50000/b1s/v1/Items";
  

  const response = await fetch(getValuesCall,
     {
        method: "GET",
        credentials: 'include',
        headers: 
      {
        'Content-Type': 'application/json',
        "accept": "application/json",
        "Authorization": "Basic " + sessionStorage.getItem('token'),

      }, 
  });

  return await response.json();
}

componentDidMount() {
    // get all entities - GET
    this.getValuesData().then(response =>
      this.setState({
        values: response.value
      }),
      console.log(this.state.values)
    )

}

logout() {
  sessionStorage.clear();
  window.location.href = '/';
}


  render() {
    this.verifyRoute();
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Options</th>
                    
                </tr>
            </thead>
            <tbody>
                {this.state.values && this.state.values.map((user, index) => {
                    return( <tr key={user.ItemCode}> 
                        <td>{user.ItemName}</td>
                        <td>{user.BarCode}</td>
                        <td>
                            <button  type="button" className="btn btn-primary">Editar</button>
                            <button type="button" className="btn btn-alert">Eliminar</button>
                        </td>
                    </tr>
                    )                    
                })}
            </tbody>
            <br></br>
            <button onClick={this.logout} type="button" className="btn btn-primary">Salir</button>
        </table>


    );
  }
}

export default withRouter(principal);

