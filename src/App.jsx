import '@styles/App.sass';
import { HomePage, NotFound } from '@pages';
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
						path='*'
						element={<NotFound />}
					/>
				</Routes>
		</div>
	);
}

export default App;
