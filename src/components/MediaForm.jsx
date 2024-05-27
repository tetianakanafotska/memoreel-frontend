import React, { useState, useRef } from 'react';
import axios from 'axios';
import loadingGif from '../assets/images/loading.gif';
import Webcam from 'react-webcam';
import boardStyles from './styles/Board.module.sass';
import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const cld = new Cloudinary({
	cloud: {
		cloudName,
	},
});

function ImagePreviewer({ url, deleteImage }) {
	return url ? (
		<div className='img_box'>
			<img
				src={url}
				alt='my_image'
			/>
			<button
				className='close_btn'
				onClick={deleteImage}>
				Retake
			</button>
		</div>
	) : null;
}

function MediaForm({
	assetType,
	setAllAssets,
	setOpenPopUp,
	setOpenMediaForm,
	boardId,
	userId,
}) {
	const [newAsset, setNewAsset] = useState({
		type: assetType,
		content: '',
		userId: userId,
		boardId: boardId,
	});

	const [loading, setLoading] = useState(false);
	const [touched, setTouched] = useState(false);
	const camRef = useRef();
	const [prevURL, setPrevURL] = useState('');

	const validateContent = (item) => {
		if (!item.trim()) {
			return false;
		} else if (assetType === 'youtubeURL') {
			const youtubeUrlRegex =
				/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
			return youtubeUrlRegex.test(item);
		} else return true;
	};

	const constraints = {
		width: 500,
		height: 500,
		facingMode: 'user',
		aspectRatio: 9 / 16,
	};

	const uploadImage = async (fileOrDataUrl) => {
		try {
			setLoading(true);
			const imageData = new FormData();

			if (typeof fileOrDataUrl === 'string') {
				// Data URL from webcam
				const response = await fetch(fileOrDataUrl);
				const blob = await response.blob();

				imageData.append('file', blob, 'webcam_image.jpg');
			} else {
				imageData.append('file', fileOrDataUrl);
			}

			imageData.append('upload_preset', uploadPreset);
			const res = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				imageData
			);
			const imageDetails = res.data;
			setPrevURL(imageDetails.url);
			setNewAsset((prevAsset) => ({
				...prevAsset,
				content: imageDetails.url,
			}));
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			uploadImage(file);
		}
	};

	const captureAndUpload = () => {
		const dataUrl = camRef.current.getScreenshot();
		if (dataUrl) {
			uploadImage(dataUrl);
		}
	};

	const deleteImage = () => {
		setPrevURL('');
	};

	const handleAddAsset = async () => {
		try {
			if (!boardId) {
				const boardResp = await axios.post(
					'http://localhost:5005/boards',
					{
						userId: userId,
					}
				);
				const newBoardId = boardResp.data._id;
				const assetResp = await axios.post(
					'http://localhost:5005/assets',
					{
						...newAsset,
						boardId: newBoardId,
					}
				);
				const createdAsset = assetResp.data;
				setAllAssets((prevAssets) => [...prevAssets, createdAsset]);
			} else {
				const response = await axios.post(
					'http://localhost:5005/assets',
					newAsset
				);
				const createdAsset = response.data;
				setAllAssets((prevAssets) => [...prevAssets, createdAsset]);
			}
			setNewAsset({
				type: '',
				content: '',
				userId: '',
				boardId: '',
			});
			setOpenPopUp(false);
			setOpenMediaForm(false);
		} catch (error) {
			console.error('Error adding asset:', error);
		}
	};

	const handleOnChange = (e) => {
		setNewAsset((prevAsset) => ({
			...prevAsset,
			content: e.target.value,
		}));
		setTouched(true);
	};

	return (
		<div>
			{assetType === 'text' && (
				<input
					type='text'
					onChange={handleOnChange}
					value={newAsset.content}
				/>
			)}
			{assetType === 'image' && (
				<input
					type='file'
					accept='image/*'
					onChange={handleFileChange}
				/>
			)}
			{assetType === 'youtubeURL' && (
				<input
					type='text'
					onChange={handleOnChange}
					value={newAsset.content}
				/>
			)}
			{assetType === 'camImage' && (
				<div className='main'>
					<article className='media_box'>
						<div className={boardStyles.boardPolaroid}>
							<Webcam
								ref={camRef}
								videoConstraints={constraints}
								screenshotFormat='image/jpeg'
							/>
						</div>
						<button
							disabled={loading}
							onClick={captureAndUpload}
							className='capture_btn'>
							Snap
						</button>
						<ImagePreviewer
							url={prevURL}
							deleteImage={deleteImage}
						/>
					</article>
				</div>
			)}
			{loading ? (
				<img
					src={loadingGif}
					alt='Loading...'
					style={{ width: '30px', height: '30px' }}
				/>
			) : (
				<div>
					<button
						onClick={handleAddAsset}
						disabled={!validateContent(newAsset.content)}>
						Add
					</button>
					<button onClick={() => setOpenMediaForm(false)}>
						Cancel
					</button>
					{touched && !validateContent(newAsset.content) && (
						<p>Invalid content</p>
					)}
				</div>
			)}
		</div>
	);
}

export default MediaForm;
