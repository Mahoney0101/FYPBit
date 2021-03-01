import React from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import './App.scss';
import './bootstrap-4.3.1-dist/css/bootstrap.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import UserForm from './Form';
import Dashboard from './Dashboard';

function App() {
  return(
  <>
  <Layout>
			<Route exact path='/' render={props =>
					<Dashboard {...props}
				/>} />
				<Route path='/form' render={props =>
					<UserForm {...props}/>}
				/>
	</Layout>
      <AmplifySignOut button-color="blue"/>
</>
  );
}

export default withAuthenticator(App);