import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@context';
import axios from 'axios';
import authService from '../services/auth.service';
import { Board, MediaItem } from '@components';
import boardStyles from '../components/styles/Board.module.sass';
import { X } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function History() {
	const { user } = useContext(AuthContext);
	const [allBoards, setAllboards] = useState([]);
	const [allAssets, setAllAssets] = useState([]);
	const [boardId, setBoardId] = useState(null);
	const token = localStorage.getItem('authToken');

	useEffect(() => {
		if (user) {
			axios
				.get(`http://localhost:5005/users/${user._id}/boards`, {
					headers: { Authorization: ` Bearer ${token}` },
				})
				.then((res) => {
					if (res.data.length !== 0) {
						setAllboards(res.data);
						setAllAssets(res.data[0].assets);
						// setBoardId(res.data[0]._id);
						// console.log(
						// 	'Existing board found. BoardID:',
						// 	res.data[0]._id
						// );
					}
				})
				.catch((error) => console.log('Error fetching boards' + error));
		}
	}, [user]);

	return (
		<>
			<div className='closeBtn'>
				<Link to='/dashboard'>{<X size='40' />}</Link>
			</div>

			{allBoards &&
				allBoards.length >= 0 &&
				(allBoards.length === 0
					? 'No board to show yet!'
					: allBoards.map((board, i) => {
							return (
								<>
									<div key={board._id}>
										<h3>Board {i}</h3>

										<div className={boardStyles.board}>
											{allAssets.length > 0 &&
												allAssets.reverse().map((asset) => (
													<div key={asset._id}>
														<MediaItem
															asset={asset}
														/>
													</div>
												))}
										</div>
									</div>
								</>
							);
					  }))}
		</>
	);
}

export default History;
