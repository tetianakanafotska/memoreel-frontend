import React, { useState, useContext, useEffect } from 'react';
import {
	PopUpButtons,
	MediaForm,
	MediaItem,
	Marquee,
	Loading,
} from '@components';
import { AuthContext } from '@context';
import assetsService from '../services/assets.service';
import usersService from '../services/users.service';
import placeholder from '@img/placeholder.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './styles/Dashboard.module.sass';
import boardStyles from '../components/styles/Board.module.sass';
import popUpButtonStyles from '@components/PopUpButtons/PopUpButtons.module.sass';
import { PlusLg } from 'react-bootstrap-icons';
import classNames from 'classnames';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [boardId, setBoardId] = useState(null);
	const [openPopUp, setOpenPopUp] = useState(false);
	const [openMediaForm, setOpenMediaForm] = useState(false);
	const [assetType, setAssetType] = useState(null);
	const [allAssets, setAllAssets] = useState([]);
	const [addButton, setAddButton] = useState(false);
	const [loading, setLoading] = useState(true);
	const deleteAsset = (assetId) => {
		assetsService
			.delete(assetId)
			.then((res) => {
				setAllAssets((prevAssets) =>
					prevAssets.filter((asset) => asset._id !== assetId)
				);
			})
			.catch((err) => {
				console.error('Error deleting asset', err);
			});
	};

	const editAsset = (assetId, editedContent) => {
		assetsService
			.put(assetId, {
				content: editedContent,
			})
			.then((res) => {
				const updatedAsset = res.data;
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

	const handleOpenPopUp = () => {
		setOpenPopUp(!openPopUp);
		setAddButton((prev) => (!prev ? true : false));
	};

	useEffect(() => {
		const currentDate = new Date().toISOString().slice(0, 10);
		if (user) {
			usersService.getCurrentBoard(user._id, currentDate).then((res) => {
				if (res.data.length !== 0) {
					setAllAssets(res.data[0].assets);
					setBoardId(res.data[0]._id);
					setLoading(false);
					console.log('Existing board found. BoardID:', res.data[0]._id);
				} else {
					setAllAssets([]);
					setBoardId(null);
					setLoading(false);
				}
			});
		}
	}, [user]);

	return loading ? (
		<>
			<Loading />
		</>
	) : (
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
			</Container>

			<Marquee
				phrases={[
					'For days worth remembering',
					"What's on your mind today?",
					'What made you laugh today?',
				]}
				className='mt-3 mb-5'
			/>

			<Container fluid>
				<Row>
					<Col>
						<div className={styles.dashboard_addContent}>
							<button
								onClick={handleOpenPopUp}
								className={classNames(popUpButtonStyles.popUpButton_addButton, {
									[popUpButtonStyles.popUpButton_addButton_on]: addButton,
								})}>
								{<PlusLg size='40' />}
							</button>

							{openPopUp && (
								<PopUpButtons
									setAssetType={setAssetType}
									setOpenMediaForm={setOpenMediaForm}
								/>
							)}
						</div>
					</Col>
				</Row>
			</Container>

			{openMediaForm && (
				<div className={styles.dashboard_mediaForm}>
					<MediaForm
						assetType={assetType}
						setOpenPopUp={setOpenPopUp}
						setOpenMediaForm={setOpenMediaForm}
						setAllAssets={setAllAssets}
						deleteAsset={deleteAsset}
						boardId={boardId}
						userId={user._id}
					/>
				</div>
			)}

			<div className={boardStyles.board}>
				{allAssets.length > 0 ? (
					allAssets.reverse().map((asset) => (
						<div key={asset._id}>
							<MediaItem
								asset={asset}
								editAsset={editAsset}
								deleteAsset={deleteAsset}
								enableEditing={true}
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
