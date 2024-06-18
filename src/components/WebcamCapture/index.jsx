import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'react-bootstrap-icons';
import { ImagePreviewer } from '@components';

import { Polaroid } from '@components/MediaItem';

import styles from './index.module.sass';

function WebcamCapture({ handleUploadFile, loading, setLoading }) {
	const camRef = useRef();
	const [previewURL, setPreviewURL] = useState('');
	const [photoTaken, setPhotoTaken] = useState(false);

	const captureAndUpload = async () => {
		const dataUrl = camRef.current.getScreenshot();
		if (dataUrl) {
			try {
				setLoading(true);
				const imageURL = await handleUploadFile(dataUrl);
				setPreviewURL(imageURL);
				setPhotoTaken(true);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		}
	};

	return (
		<div className='main'>
			<div className={styles.photoContainer}>
				{photoTaken ? (
					<ImagePreviewer
						url={previewURL}
						deleteImage={() => {
							setPreviewURL('');
							setPhotoTaken(false);
						}}
					/>
				) : (
					<Polaroid>
						<Webcam
							ref={camRef}
							videoConstraints={{
								width: 400,
								height: 400,
								facingMode: 'user',
								aspectRatio: 1 / 1,
							}}
							screenshotFormat='image/jpeg'
						/>
					</Polaroid>
				)}

				{photoTaken ? (
					<button
						onClick={() => {
							setPreviewURL('');
							setPhotoTaken(false);
						}}>
						<Camera
							size='30'
							className='me-2'
						/>
						Retake
					</button>
				) : (
					<button
						disabled={loading}
						onClick={captureAndUpload}>
						<Camera
							size='30'
							className='me-2'
						/>
						Snap!
					</button>
				)}
			</div>
		</div>
	);
}

export default WebcamCapture;