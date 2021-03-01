import React, { useState, useEffect } from 'react';
import './App.scss';
import { Auth } from "@aws-amplify/auth";
import  { API, graphqlOperation, Storage } from 'aws-amplify';import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes , getHrv, listHrVs, listUserStatss} from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line
} from "recharts";
import jsonData from './HRVdata.json';
import { onCreateHrv } from './graphql/subscriptions';
//import jsonDataH from './HRD.json';



const json = JSON.parse(JSON.stringify(jsonData));
//const jsonH = JSON.parse(JSON.stringify(jsonDataH));
const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [user, setUser] = useState("");
  const [HRVValue, setHRVValue] = useState("");
  const [userDetails, setUserDetails] = useState(JSON.parse(`{"weight":"","age":"","height":""}`));
  const [BMI, setBMI] = useState("");

  useEffect(async() => {
    await fetchNotes();
    await listHRVs()
    await getUsername();
    await subscribeToHrv();
    }, []);
  

  async function getUsername(){
    await Auth.currentAuthenticatedUser()
    .then(user => {
      setUser(user.username);
      listUserDetails(user.username);
    });

  }

  function getBMI(weight, height){
    let BMI = (weight/(height*height))*10000;
    setBMI(Math.round(BMI));
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }  

  async function getHrvValue(hrvId) {
    const apiData = await API.graphql({ query: getHrv,variables: {id: hrvId} });
    const HrvFromAPI = apiData.data.getHRV.value;
    setHRVValue(HrvFromAPI);
  }  

  async function listUserDetails(username) {
    if(user == null){return;}
    let filter = {
              username: {eq:username}
          };
    let apiData = await API.graphql(graphqlOperation(listUserStatss, { filter:filter}));
    apiData = apiData.data.listUserStatss.items[0];
    setUserDetails(apiData);
    getBMI(apiData.weight, apiData.height)
  }  

  async function listHRVs() {
    const apiData = await API.graphql({ query: listHrVs });
    const HRVFromAPI = apiData.data.listHRVs.items;
    let datetime = "0";
    let idd =0;
    await Promise.all(HRVFromAPI.map(async hrv => {
      if(hrv.createdAt>datetime)
      {
        datetime = hrv.createdAt;
        idd = hrv.id;
      }
    }))
    getHrvValue(idd)
  }  
  
  async function subscribeToHrv() {
    await API.graphql(graphqlOperation(onCreateHrv))
    .subscribe({
      next: event => {
        if (event){
          getHrvValue(event.value.data.onCreateHRV.id);
        }
      }
    });
    
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  return (
    <div className="App">
       <div className="container">
        <div className="summary-column">
          <div className="profile-img" id="profileImage"><img src="https://placeimg.com/400/400/face" />
            <div className="name">James <br /> Mahoney</div>
          </div>
          <div className="statistics">
            <h2>summary</h2>
            <div className="age"><span className="title title-age">{userDetails.age}</span></div>
            <div className="weight"><span className="title title-weight">{userDetails.weight}</span></div>
            <div className="float-none" />
            <div className="height">
              <div className="icon" />
              <div className="data"><span>{userDetails.height}cm</span></div>
            </div>
            <div className="bmi"><span className="title title-bmi">{BMI}</span></div>
            <div className="fat"><span className="title title-fat">11<span className="percentage">%</span></span></div>
            <div className="float-none" />
            <h2 className="allergies">allergies</h2>
            <div className="row">peanuts<div className="severity">
                <div className="fill" style={{width: '45%', height: 'inherit'}} />
              </div>
            </div>
            <div className="row">penicilin<div className="severity">
                <div className="fill" style={{width: '80%', height: 'inherit'}} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-column">
          <div className="header-container" id="headerContainer">
            <div className="nav">
              <div className="content">
                <p> hi <span className="name">{user}</span>, it seems you are in</p><span className="shape score">good</span><span className="shape"> shape</span>
              </div>
            </div>
            <div className="select-boxes">
              <div className="content">
                <div className="select-wrapper"><select>
                    <option>Bl. Pressure</option>
                  </select></div>
                <div className="select-wrapper"><select>
                    <option>Today</option>
                  </select></div>
              </div>
            </div>
            <div className="float-none" />
            <div className="graph">      
        <LineChart
          width={730}
          height={250}
          data={json}
          margin={{ top: 2, right: 30, left: 60, bottom: 5 }}
        >
          <XAxis  />
          <YAxis />
          <Tooltip/>
          <Line name="Recent Pulse Wave" dot={false} type="monotone" dataKey="Samples" stroke="#8884d8" />
        </LineChart></div>
          </div>
          <div className="split-container">
            <div className="split">
              <h3>Temperature</h3>
              <div className="temperature">36.7</div>
              <div className="split-graph"><canvas id="temperatureGraph" /></div>
            </div>
            <div className="split">
              <h3>HRV</h3>
              <div className="calories">{HRVValue}</div>
              <div className="split-graph"><canvas id="calorieGraph" /></div>
            </div>
            <div className="split">
              <h3>Resting Heart rate</h3>
              <div className="heart-rate">87</div>
              <div className="split-graph"><canvas id="heartRateGraph" /></div>
            </div>
          </div>
          <div className="sleep">
            <div className="totals">
              <div className="collective"><span className="hours">8</span><span className="minutes">25</span>
                <p>Total sleep time</p>
              </div>
              <div className="split first">6h 12m<p>Deep</p>
              </div>
              <div className="split">2h 13m<p>Light</p>
              </div>
            </div>
            <div className="sleep-graph">
              <div className="sleep-graph-container">
                <h2> Sleep Analytics</h2>
                <div className="sleep-select-wrapper"><select>
                    <option value="today">Today</option>
                  </select></div>
                <div className="chart-container"><canvas id="sleepChart" /></div>
              </div>
            </div>
          </div>
          <div className="float-none" />
          <div className="split-container">
            <div className="split bottom">
              <h2>Appointments</h2>
              <div className="appointments">
                <div className="calendar-container">
                  <div className="calendar">25<span className="date">th</span><span className="month">Jul</span></div>
                  <div className="content">
                    <table className="appointment-table">
                      <tbody><tr>
                          <td id="time">13:00</td>
                        </tr>
                        <tr>
                          <td id="title">Dentist</td>
                        </tr>
                        <tr>
                          <td id="name">Jozef Novotny</td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
            </div>
            <div className="split bottom">
              <h2>Doctors around</h2>
              <table className="doctor-grid">
                <tbody><tr>
                    <td height={65}><img src="https://placeimg.com/65/65/people" /></td>
                    <td><img src="https://placeimg.com/65/65/face" /></td>
                    <td><img src="https://placeimg.com/65/65/people" /></td>
                  </tr>
                  <tr>
                    <td><img src="https://placeimg.com/65/65/face" /></td>
                    <td><img src="https://placeimg.com/65/65/people" /></td>
                    <td id="expand">
                      <div className="background">+8
                      </div>
                    </td>
                  </tr>
                </tbody></table>
            </div>
            <div className="split bottom">
              <div id="map" />
              <div className="map-overlay">
                <h2>Steps today</h2><span className="steps">4578</span><span className="distance">1.7 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <input
  type="file"
  onChange={onChange}
/>
     
      <button onClick={createNote}>Create Note</button>
      
      <div style={{marginBottom: 30}}>
      {
  notes.map(note => (
    <div key={note.id || note.name}>
      <h2>{note.name}</h2>
      <p>{note.description}</p>
      <button onClick={() => deleteNote(note)}>Delete note</button>
      {
        note.image && <img src={note.image} style={{width: 400}} />
      }
    </div>
  ))
}
</div>

      <AmplifySignOut button-color="blue"/>
    </div>
  );
}

export default withAuthenticator(App);