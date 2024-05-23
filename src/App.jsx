import '@styles/App.sass';
import { HomePage, NotFound, Login, Signup } from '@pages';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
				<Routes>
					<Route
						path='/'
						element={<HomePage />}
					/>

					<Route
						path='/login'
						element={<Login />}
					/>

					<Route
						path='/signup'
						element={<Signup />}
					/>

					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
		</div>
	);
}

export default App;
