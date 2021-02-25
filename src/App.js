import React, { useState, useEffect } from 'react';
import './App.css';
import { Auth } from "@aws-amplify/auth";
import { API, Storage } from 'aws-amplify';import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
//  Legend,
  Line
} from "recharts";
import jsonData from './HRVdata.json';
//import jsonDataH from './HRD.json';



const json = JSON.parse(JSON.stringify(jsonData));
//const jsonH = JSON.parse(JSON.stringify(jsonDataH));
const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [user, setUser] = useState("");
  useEffect(() => {
    fetchNotes();
    getUsername();
  }, []);

  async function getUsername(){
    await Auth.currentAuthenticatedUser()
    .then(user => {
      setUser(user.username);
    });
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

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
    console.log(createNoteMutation);
    console.log(formData);
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
      <h1> {user} Dashboard</h1>
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
      <ResponsiveContainer width={700} height="80%">
      <LineChart
          width={730}
          height={250}
          data={json}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis  />
          <YAxis />
          <Tooltip/>
          <Line dot={false} type="monotone" dataKey="Samples" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
        <br/>

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);