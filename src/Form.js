import React from 'react';
import { useState , useEffect} from 'react';
import './bootstrap-4.3.1-dist/css/bootstrap.css';
import { updateUserStats } from './graphql/mutations';
import { listUserStatss } from './graphql/queries';

import { Auth } from "@aws-amplify/auth";
import  { API, graphqlOperation } from 'aws-amplify';




  function UserForm() {
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [user,setUser] = useState("");
    const [userId, setUserId] = useState("");
    const handleSubmit= (e) => {
      e.preventDefault();
      updateUserDetails(userId);
    }


    useEffect(async() => {
      await getUsername();
      }, []);
    
    
    async function getUsername(){
      await Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user.username);
        listUserDetails(user.username);
      });
    
    }
    
    async function listUserDetails(username) {
      if(user == null){return;}
      let filter = {
                username: {eq:username}
            };
      let apiData = await API.graphql(graphqlOperation(listUserStatss, { filter:filter}));
      apiData = apiData.data.listUserStatss.items[0];
      setUserId(apiData.id);
    }  
    
    async function updateUserDetails() {
      let Input = {
        id: userId,
        height: height,
        weight: weight,
        age: age
    };
    await API.graphql(graphqlOperation(updateUserStats,{input: Input}));
    }  

    return (
      <form onSubmit={e => { handleSubmit(e) }}>
        <label>Age:</label>
        <br />
        <input 
          name='age' 
          type='text'
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <br/>
        <label>Weight:</label>
        <br />
        <input 
          name='weight' 
          type='text' 
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
        <br />
        <label>Height:</label>
        <br />
        <input
          name='height' 
          type='text'
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
        <br/>
        <input 
          type='submit' 
          value='Add Log' 
        />
      </form>
    )
  }

  export default UserForm;