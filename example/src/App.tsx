import React from 'react'

import { ExampleComponent } from 'clone-server-api'
import 'clone-server-api/dist/index.css'
import axios from 'axios';


setTimeout(()=>{
  // fetch('https://reqres.in/api/users?page=2')
  //   .then(res => console.log('fetch done',res))
  // axios.get('https://reqres.in/api/users?page=2')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  axios.post('https://reqre.in/api/use',{
    "name": "morpheus",
    "job": "leader"
  })
  .then(function (response) {
    console.log("AXIOS RESPONSE",response);
  })
  .catch(function (error) {
    console.log(error);
  });

},5000)

const App = () => {
  return <ExampleComponent axios={axios} text="Create React Library Example 😄" />
}


export default App
