import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import UserTable from './components/AllData';
import Balance from './components/Balance';
// import { CreateAccount } from './components/CreateAccount';
import { Deposit } from './components/Deposit';
import Home from './components/HomePage';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Registration from './components/Register';
import { Withdraw } from './components/Withdraw';
import ProtectedRoute from './util/ProtectedRoute';
function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/create-account' element={<Registration />} />
					<Route path='/login' element={<Login />} />

					<Route
						path='/logout'
						element={
							<ProtectedRoute>
								<Logout />
							</ProtectedRoute>
						}
					/>

					<Route
						path='/all-data'
						element={
							<ProtectedRoute>
								<UserTable />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/withdraw'
						element={
							<ProtectedRoute>
								<Withdraw />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/deposit'
						element={
							<ProtectedRoute>
								<Deposit />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/balance'
						element={
							<ProtectedRoute>
								<Balance />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
