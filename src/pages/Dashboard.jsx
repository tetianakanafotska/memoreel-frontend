import React, { useState, useContext, useEffect } from 'react';
import PopUpButtons from '../components/PopUpButtons';
import MediaForm from '../components/MediaForm';
import MediaItem from '../components/MediaItem';
import { AuthContext } from '@context';
import axios from 'axios';
import placeholder from '@img/placeholder.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './styles/Dashboard.module.sass';
import popUpButtonStyles from '@components/styles/PopUpButtons.module.sass';
import boardStyles from '../components/styles/Board.module.sass';
import classNames from 'classnames';
import { PlusLg } from 'react-bootstrap-icons';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [boardId, setBoardId] = useState(null);
	const [openPopUp, setOpenPopUp] = useState(false);
	const [openMediaForm, setOpenMediaForm] = useState(false);
	const [assetType, setAssetType] = useState(null);
	const [allAssets, setAllAssets] = useState([]);
	const [addButton, setAddButton] = useState(false);
	const token = localStorage.getItem('authToken');

	const handleDeleteAsset = (assetId) => {
		console.log('asset to be deleted', assetId);
		axios
			.delete(`http://localhost:5005/assets/${assetId}`)
			.then((res) => {
				console.log('resp from deleting', res);
				setAllAssets((prevAssets) =>
					prevAssets.filter((asset) => asset._id !== assetId)
				);
			})
			.catch((err) => {
				console.error('Error deleting asset', err);
			});
	};

	const handleEditAsset = (assetId, editedContent) => {
		console.log('editedContent', editedContent);
		axios
			.put(
				`http://localhost:5005/assets/${assetId}`,
				{
					content: editedContent,
				},
				{
					headers: { Authorization: token },
				}
			)
			.then((res) => {
				const updatedAsset = res.data;
				console.log('updated res', res);
				setAllAssets((prevAssets) =>
					prevAssets.map((asset) =>
						asset._id === assetId ? updatedAsset : asset
					)
				);
			})
			.catch((err) => {
				console.error('Error updating asset', err);
			});
	};

	useEffect(() => {
		const currentDate = new Date().toISOString().slice(0, 10);
		console.log('THE DATE', currentDate);
		if (user) {
			axios
				.get(
					`http://localhost:5005/users/${user._id}/boards?start=${currentDate}`,
					{
						headers: { Authorization: ` Bearer ${token}` },
					}
				)
				.then((res) => {
					if (res.data.length !== 0) {
						setAllAssets(res.data[0].assets);
						setBoardId(res.data[0]._id);
						console.log(
							'Existing board found. BoardID:',
							res.data[0]._id
						);
					} else {
						setAllAssets([]);
						setBoardId(null);
					}
				});
		}
	}, [user]);

	return (
		<section className={styles.dashboard}>
			<Container fluid>
				<Row>
					<Col className='d-flex flex-column align-items-center justify-content-center my-5'>
						{user && (
							<div className='profilePic mb-2'>
								<img
									src={user.profileImg || placeholder}
									onError={(e) => {
										e.target.src = placeholder;
									}}
									alt={user.name}
								/>
							</div>
						)}
						<h2>{user ? `Hello, ${user.name}!` : 'Hello!'}</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<h3>What's on your mind today?</h3>
					</Col>
				</Row>

				<Row>
					<Col>
						<div className={styles.dashboard_addContent}>
							<button
								onClick={() => {
									setOpenPopUp(!openPopUp);
									setAddButton((prev) =>
										!prev ? true : false
									);
								}}
								className={classNames(
									popUpButtonStyles.popUpButton_addButton,
									{
										[popUpButtonStyles.popUpButton_addButton_on]:
											addButton,
									}
								)}>
								{<PlusLg size='40' />}
							</button>

							{openPopUp && (
								<PopUpButtons
									setAssetType={setAssetType}
									setOpenMediaForm={setOpenMediaForm}
									setOpenPopUp={setOpenPopUp}
								/>
							)}
						</div>
					</Col>
				</Row>

				{openMediaForm && (
					<Row>
						<Col md="8" lg="6" className="mx-auto">
							<div className={styles.dashboard_mediaForm}>
								<MediaForm
									assetType={assetType}
									setOpenPopUp={setOpenPopUp}
									setOpenMediaForm={setOpenMediaForm}
									setAllAssets={setAllAssets}
									boardId={boardId}
									userId={user._id}
								/>
							</div>
						</Col>
					</Row>
				)}
			</Container>

			<div className={boardStyles.board}>
				{allAssets.length > 0 ? (
					allAssets.reverse().map((asset) => (
						<div key={asset._id}>
							<MediaItem
								asset={asset}
								handleDeleteAsset={handleDeleteAsset}
								handleEditAsset={handleEditAsset}
							/>
						</div>
					))
				) : (
					<p>Create content for today</p>
				)}
			</div>
		</section>
	);
};

export default Dashboard;
