
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import { useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router';

function RemoveUser() {
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
  const [usernameAdmin, setUsernameAdmin] = useState('')
  const [usernamePatient, setUsernamePatient] = useState('')
  const [usernameDoctor, setUsernameDoctor] = useState('')
  const {username} = useParams();



  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    const response = axios.delete(`http://localhost:4000/Admin/deleteEntity/${username}/admin/${usernameAdmin}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
.then(res =>console.log(res.data)).catch(err => console.log(err))
  }

  const handleSubmitPatient = (e) => {
    e.preventDefault();

    const response = axios.delete(`http://localhost:4000/Admin/deleteEntity/${username}/patient/${usernamePatient}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    }).
    then(res =>console.log(res.data)).catch(err => console.log(err))
  }

  const handleSubmitDoctor = (e) => {
    e.preventDefault();

    const response = axios.delete(`http://localhost:4000/Admin/deleteEntity/${username}/doctor/${usernameDoctor}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    }).
    then(res =>console.log(res.data)).catch(err => console.log(err))
  }

  return (
    <div>
      <NavBarAdministrator username={username}/>
      {/* <Form title="Add Administrator" inputArr={inputArr} type="addAdministrator" btnArr={btnArr} /> */}
<form onSubmit={handleSubmitAdmin}>
  <input  title= 'username' required placeholder= 'enter username' type= 'text' onChange={(e) => setUsernameAdmin(e.target.value)} />
  <button type="submit">Remove Admin</button>
</form>

<form onSubmit={handleSubmitPatient}>
  <input  title= 'username' required placeholder= 'enter username' type= 'text' onChange={(e) => setUsernamePatient(e.target.value)} />
  <button type="submit">Remove Patient</button>
</form>

<form onSubmit={handleSubmitDoctor}>
  <input  title= 'username' required placeholder= 'enter username' type= 'text' onChange={(e) => setUsernameDoctor(e.target.value)} />
  <button type="submit">Remove Doctor</button>
</form>

    </div>
  );
}
export default RemoveUser;
