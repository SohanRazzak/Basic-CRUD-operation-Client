
import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [users, setUsers] = useState([])
  const [foundUser, setFoundUser] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  console.log(users);

  const handleSubmit = e =>{
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const fullName = form.get("full-name");
    const user = {
      email,
      password,
      fullName
    }
    console.log(user)
    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {console.log(data)
      data.acknowledged ? alert("Success") : alert("Error")
    }
    )
  }

  const handleFind = e => {
    e.preventDefault();
    const id = e.target.id.value;
    console.log(id);
    fetch(`http://localhost:5000/user/${id}`)
    .then(res => res.json())
    .then(data => setFoundUser(data))
  }

  return (
    <>
      <h1>Database Practise</h1>

      <hr />
      <h2>Post Method</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="full-name" />
        <br /> <br />
        <input type="text" name="email" />
        <br /> <br />
        <input type="text" name="password" />
        <br /> <br />
        <button type='submit'> submit</button>
      </form>
      <br />
      <hr />
      <h2>Get Method</h2>
      <div>
        {users.map(user => <p key={user._id}>{user?.fullName} : {user?.email} : {user?.password} : {user._id}</p>)}
      </div>
      <br />
      <hr />
      <h2>Get Single Data</h2>
      <form onSubmit={handleFind}>
      <input type="text" name="id"/>
      <br /><br />
      <button type='submit'>Find</button>
      </form>
      <div>
        <p>{foundUser.fullName}</p>
      </div>
      <br />
      <hr />
    </>
  )
}

export default App
