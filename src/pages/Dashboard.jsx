import React, { useState, useContext, useEffect } from 'react';
import PopUpButtons from '../components/PopUpButtons';
import MediaForm from '../components/MediaForm';
import MediaItem from '../components/MediaItem';
import { AuthContext } from '@context';
import axios from 'axios';
import placeholder from '@img/placeholder.jpg';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [boardId, setBoardId] = useState(null);
	const [openPopUp, setOpenPopUp] = useState(false);
	const [openMediaForm, setOpenMediaForm] = useState(false);
	const [assetType, setAssetType] = useState(null);
	const [allAssets, setAllAssets] = useState([]);

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
			.put(`http://localhost:5005/assets/${assetId}`, {
				content: editedContent,
			})
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
					`http://localhost:5005/users/${user._id}/boards?start=${currentDate}`
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
		<>
			<h2>{user ? `Hello, ${user.name}!` : 'Hello!'}</h2>
			{user && (
				<div className='profilePic'>
					<img
						src={user.profileImg || placeholder}
						onError={(e) => {
							e.target.src = placeholder;
						}}
						alt={user.name}
					/>
				</div>
			)}
			<div className='dashboard-container'>
				<button onClick={() => setOpenPopUp(!openPopUp)}>+</button>
				{openPopUp && (
					<PopUpButtons
						setAssetType={setAssetType}
						setOpenMediaForm={setOpenMediaForm}
						setOpenPopUp={setOpenPopUp}
					/>
				)}
				{openMediaForm && (
					<MediaForm
						assetType={assetType}
						setOpenPopUp={setOpenPopUp}
						setOpenMediaForm={setOpenMediaForm}
						setAllAssets={setAllAssets}
						boardId={boardId}
						userId={user._id}
					/>
				)}
				{allAssets.length > 0 ? (
					allAssets.map((asset) => (
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
		</>
	);
};

export default Dashboard;
