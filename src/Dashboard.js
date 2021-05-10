import React, { useState, useEffect } from 'react';
import './App.scss';
import './bootstrap-4.3.1-dist/css/bootstrap.css';
import { Auth } from "@aws-amplify/auth";
import  { API, graphqlOperation } from 'aws-amplify';
import { getHrv, getRhr, getTemperature, listHrVs, listRhRs, listTemperatures, listUserStatss, getModelPrediction, listModelPredictions} from './graphql/queries';
import { onCreateHrv, onCreateRhr, onCreateTemperature, onCreateModelPrediction } from './graphql/subscriptions';


function Dashboard() {
  const [user, setUser] = useState("");
  const [TemperatureValue, setTemperatureValue] = useState("");
  const [HRVValue, setHRVValue] = useState("");
  const [RHRValue, setRHRValue] = useState("");
  const [PredictionValue, setPredictionValue] = useState("");
  const [userDetails, setUserDetails] = useState(JSON.parse(`{"weight":"","age":"","height":""}`));
  const [BMI, setBMI] = useState("");
  const [healthStatus, setHealth] = useState("Calculating...");
  const [viewStatus, setViewStatus] = useState(false);
  const [issueslist, setIssues] = useState("");


  useEffect(async() => {
    getUsername();
    await listHRVs();
    await listRHRs();
    await listTemps();
    await listPredictions();
    subscribeToHrv();
    subscribeToRhr();
    subscribeToTemperature();
    subscribeToPrediction();
    }, []);


useEffect(() => {
  calculateHeath();
}, [PredictionValue]);

function IssuesBlock() {
  return (
      <div className="floating-block">
      <h1>Results of last session</h1>
      <ul>
        {issueslist}
      </ul>
      <button onClick={() => {setViewStatus(false)}}>Close Window</button>
    </div>
  )
}

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

  async function getHrvValue(hrvId) {
    const apiData = await API.graphql({ query: getHrv,variables: {id: hrvId} });
    const HrvFromAPI = apiData.data.getHRV.value;
    setHRVValue(HrvFromAPI);
  }  

  async function getRhrValue(rhrId) {
    const apiData = await API.graphql({ query: getRhr,variables: {id: rhrId} });
    const RhrFromAPI = apiData.data.getRHR.value;
    setRHRValue(RhrFromAPI);
  }  

  async function getTemperatureValue(tempId) {
    const apiData = await API.graphql({ query: getTemperature,variables: {id: tempId} });
    const TemperatureFromAPI = apiData.data.getTemperature.value;
    setTemperatureValue(TemperatureFromAPI);
  }  

  async function getPrediction(predId) {
    const apiData = await API.graphql({ query: getModelPrediction,variables: {id: predId} });
    const PredFromAPI = apiData.data.getModelPrediction.prediction;
    setPredictionValue(PredFromAPI);
    calculateHeath();
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

  async function listRHRs() {
    const apiData = await API.graphql({ query: listRhRs });
    const RHRFromAPI = apiData.data.listRHRs.items;
    let datetime = "0";
    let idd =0;
    await Promise.all(RHRFromAPI.map(async rhr => {
      if(rhr.createdAt>datetime)
      {
        datetime = rhr.createdAt;
        idd = rhr.id;
      }
    }))
    getRhrValue(idd)
  }  

  async function listTemps() {
    const apiData = await API.graphql({ query: listTemperatures });
    const TemperatureFromAPI = apiData.data.listTemperatures.items;
    let datetime = "0";
    let idd =0;
    await Promise.all(TemperatureFromAPI.map(async temp => {
      if(temp.createdAt>datetime)
      {
        datetime = temp.createdAt;
        idd = temp.id;
      }
    }))
    getTemperatureValue(idd)
  }  

  async function listPredictions() {
    const apiData = await API.graphql({ query: listModelPredictions });
    const PredFromAPI = apiData.data.listModelPredictions.items;
    let datetime = "0";
    let idd = 0;
    await Promise.all(PredFromAPI.map(async pred => {
      if(pred.createdAt>datetime)
      {
        datetime = pred.createdAt;
        idd = pred.id;
      }
    }))
    getPrediction(idd)
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

  async function subscribeToRhr() {
    await API.graphql(graphqlOperation(onCreateRhr))
    .subscribe({
      next: event => {
        if (event){
          getRhrValue(event.value.data.onCreateRHR.id);
        }
      }
    });
  }

  async function subscribeToTemperature() {
    await API.graphql(graphqlOperation(onCreateTemperature))
    .subscribe({
      next: event => {
        if (event){
          getTemperatureValue(event.value.data.onCreateTemperature.id);
        }
      }
    });
  }

  async function subscribeToPrediction() {
    await API.graphql(graphqlOperation(onCreateModelPrediction))
    .subscribe({
      next: event => {
        if (event){
          getPrediction(event.value.data.onCreateModelPrediction.id);
        }
      }
    });
  }

  const tempScore = () => {
    let temp = "";
    let temphigh = 36.9;
    let templow = 34;
    if(TemperatureValue<templow){
      temp = "low";
    }
    else if(TemperatureValue>temphigh){
      temp = "high";
    }
    else{
      temp = "Good";
    }
    return "You have a "+temp+ " temperature. temp is "+ TemperatureValue;
  }

  const BMIScore = () => {
    let BMIScore = "";
    let BMIHigh = 25;
    let BMILow = 19; 
    let BMIObese = 30;

    if(BMI<BMILow){
      BMIScore = "underweight";
    }
    else if(BMI>=BMILow && BMI <= BMIHigh){
      BMIScore = "Healthy";
    }
    else if(BMI>BMIHigh&& BMI<BMIObese){
      BMIScore = "overweight";
    }
    else{
      BMIScore = "obese";
    }
    return "You are "+BMIScore+" with a BMI of "+ BMI 
  }

  const predictionScore = () => {
    let prediction;

    if(PredictionValue != "Healthy"){
      prediction = PredictionValue;
      return "PLease Consult a doctor, This AI model predicts you have "+ prediction;
    }
    else{
      return "The AI model returned a prediction of Healthy"
    }
  } 
  const Between = (num,low, high) =>{
    if(num>=low&&num<=high)
    {
      return true;
    }
    else{
      return false;
    }
  }
  const HRVScore = () => {
    let HRVScore;
    let age = userDetails.age;
    if(age>17&&age<26&&Between(HRVValue,60, 76))
      HRVScore = "Good";
    else if(age>=26&&age<36&&Between(HRVValue,55,72))
      HRVScore = "Good";
    else if(age>=36&&age<46&&Between(HRVValue,52,69))
      HRVScore = "Good";
    else if(age>=46&&age<56&&Between(HRVValue,47,68))
      HRVScore = "Good";
    else if(age>=56&&age<66&&Between(HRVValue,42,64))
      HRVScore = "Good";
    else if(age>=66&&age<76&&Between(HRVValue,40,63))
      HRVScore = "Good";
    else if(age>75&&Between(33,68))
      HRVScore = "HRV is in normal range";
    else
      HRVScore = "HRV not in normal range, this could be normal if you are sick or have recently been stressed or participated in stressful activity. value is "+HRVValue;
    return HRVScore
  } 

  const calculateHeath = () =>{
    if(BMI !== ""){ 
    let score = "";
    let issuesb = [];
    let goodIssues = [];
    let hrv = HRVScore();
    let lung = predictionScore();
    let temp = tempScore();
    let bmi = BMIScore();
    let scores = [hrv, lung, temp, bmi];
    scores.forEach(item => {item === "Good" ? goodIssues.push(item) : score = "Bad"; issuesb.push(item)});
    setHealth(score);   
    setViewStatus(true);
    let issuesc = issuesb.map(item =>  {return <li key={item}>{item}</li>})
    setIssues(issuesc);
    }
  }

  return (
    <div className="App">
      {viewStatus ?  <IssuesBlock/> : null}
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
            <div className="bmi"><button className="healthButton" onClick={() => {setViewStatus(!viewStatus)}}>Session Breakdown</button></div>
            <div className="float-none" />
          </div>
        </div>
        <div className="content-column">
          <div className="header-container" id="headerContainer">
            <div className="nav">
              <div className="content">
                <p> hi <span className="name">{user}</span>, it seems you are in</p><span className="shape score">{healthStatus}</span><span className="shape"> shape</span>
              </div>
            </div>
            <div className="select-boxes">
              <div className="content">
              </div>
            </div>
            <div className="float-none" />
            <div className="graph">      
        </div>
          </div>
          <div className="split-container">
            <div className="split">
              <h3>Temperature</h3>
              <div className="temperature">{TemperatureValue}</div>
              <div className="split-graph"><canvas id="temperatureGraph" /></div>
            </div>
            <div className="split">
              <h3>HRV</h3>
              <div className="calories">{HRVValue}</div>
              <div className="split-graph"><canvas id="calorieGraph" /></div>
            </div>
            <div className="split">
              <h3>Session AVG HR</h3>
              <div className="heart-rate">{RHRValue}</div>
              <div className="split-graph"><canvas id="heartRateGraph" /></div>
            </div>
          </div>
          <div className="float-none" />
          <div className="split-container">
            <div className="split bottom bottomRoomForPrediction">
              <h2>Lung Recording Prediction</h2>
              <div className="appointments">
                {PredictionValue}
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
  );
}

export default Dashboard;