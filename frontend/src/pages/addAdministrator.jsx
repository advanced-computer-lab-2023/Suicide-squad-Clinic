import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form.jsx';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/login.js';
import Validation from '../validate/validate';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import { useState } from 'react';
import axios from 'axios'

function AddAdministrator() {
  // let { errors, handleSubmit, register } = Validation('username')
  // let c = (data) => {
  //   console.log(data);
  // }
  // let inputArr = [
  //   { title: 'username', placeholder: 'enter username', type: 'username', showErr: errors.username?.message, register: register("username"),  },
  //   { title: 'password', placeholder: 'enter password', type: 'password', showErr: errors.password?.message, register: register("password") },
  // ];
  // let btnArr = [
  //   {
  //     title: 'Add Administrator',
  //     style: 'green-btn',
  //     action: handleSubmit(),
  //   },
  // ];
  const [usernameAd, setUsernameAd] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const {username} = useParams();




  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {Username:usernameAd , Password:password, Email: email}
    console.log(data)
    const response = axios.post(`http://localhost:4000/Admin/createAdmin/${username}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    }).then(res =>console.log(res.data)).catch(err => console.log(err.request))
  }

  return (
    <div>
      <NavBarAdministrator username={username}/>
      {/* <Form title="Add Administrator" inputArr={inputArr} type="addAdministrator" btnArr={btnArr} /> */}
      <form onSubmit={handleSubmit}>
  <input  title= 'username' required placeholder= 'enter username' type= 'text' onChange={(e) => setUsernameAd(e.target.value)} />
  <input type="email" required title="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
  <input type="password" required title="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
  <button type="submit">Submit</button>
</form>

    </div>
  );
}
export default AddAdministrator;
