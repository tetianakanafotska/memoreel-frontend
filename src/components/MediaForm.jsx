import React, { useState, useRef } from 'react';
import axios from 'axios';
import loadingGif from '../assets/images/loading.gif';
import Webcam from 'react-webcam';
import { Cloudinary } from '@cloudinary/url-gen';
import boardStyles from './styles/Board.module.sass';
import dashboardStyles from '@pages/styles/Dashboard.module.sass';
import { AudioRecorder } from "react-audio-voice-recorder";
import { Camera, Pen, XLg, Trash, CheckLg } from 'react-bootstrap-icons';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
});

function ImagePreviewer({ url, deleteImage }) {
	return url ? (
		<div className={boardStyles.board_item_polaroid}>
			<img
				src={url}
				alt='my_image'
			/>
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
    content: "",
    userId: userId,
    boardId: boardId,
  });

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const camRef = useRef();
  const [prevURL, setPrevURL] = useState("");
  const [audioURL, setAudioURL] = useState("");

  const validateContent = (item) => {
    if (!item.trim()) {
      return false;
    } else if (assetType === "youtubeURL") {
      const youtubeUrlRegex =
        /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
      return youtubeUrlRegex.test(item);
    } else return true;
  };

	const constraints = {
		width: 400,
		height: 400,
		facingMode: 'user',
		aspectRatio: 1 / 1,
	};

  const uploadImage = async (fileOrDataUrl) => {
    try {
      setLoading(true);
      const imageData = new FormData();

      if (typeof fileOrDataUrl === "string") {
        // Data URL from webcam
        const response = await fetch(fileOrDataUrl);
        const blob = await response.blob();

        imageData.append("file", blob, "webcam_image.jpg");
      } else {
        imageData.append("file", fileOrDataUrl);
      }

      imageData.append("upload_preset", uploadPreset);
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

  const uploadAudio = async (blob) => {
    try {
      setLoading(true);
      const audioData = new FormData();
      audioData.append("file", blob, "audio_recording.webm");
      audioData.append("upload_preset", uploadPreset);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        audioData
      );
      const audioDetails = res.data;
      setAudioURL(audioDetails.url);
      setNewAsset((prevAsset) => ({
        ...prevAsset,
        content: audioDetails.url,
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
		setPhotoTaken(false);
	};

  const handleAddAsset = async () => {
    try {
      if (!boardId) {
        const boardResp = await axios.post("http://localhost:5005/boards", {
          userId: userId,
        });
        const newBoardId = boardResp.data._id;
        const assetResp = await axios.post("http://localhost:5005/assets", {
          ...newAsset,
          boardId: newBoardId,
        });
        const createdAsset = assetResp.data;
        setAllAssets((prevAssets) => [...prevAssets, createdAsset]);
      } else {
        const response = await axios.post(
          "http://localhost:5005/assets",
          newAsset
        );
        const createdAsset = response.data;
        setAllAssets((prevAssets) => [...prevAssets, createdAsset]);
      }
      setNewAsset({
        type: "",
        content: "",
        userId: "",
        boardId: "",
      });
      setOpenPopUp(false);
      setOpenMediaForm(false);
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const handleOnChange = (e) => {
    setNewAsset((prevAsset) => ({
      ...prevAsset,
      content: e.target.value,
    }));
    setTouched(true);
  };

  const addAudioElement = (blob) => {
    uploadAudio(blob);
  };


	return (
		<div className={dashboardStyles.dashboard_mediaForm_inputs}>
			{assetType === 'text' && (
				<textarea
					type='text'
					placeholder="What's on your mind today?"
					onChange={handleOnChange}
					value={newAsset.content}
					className={dashboardStyles.editButtons_input}
				/>
			)}
			{assetType === 'image' && (
				<input
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					className={dashboardStyles.editButtons_input}
				/>
			)}
			{assetType === 'youtubeURL' && (
				<input
					type='text'
					placeholder='Paste Youtube URL here'
					onChange={handleOnChange}
					value={newAsset.content}
					className={dashboardStyles.editButtons_input}
				/>
			)}
			{assetType === 'camImage' && (
				<div className='main'>
					<div className={dashboardStyles.editButtons_photoContainer}>
						{photoTaken ? (
							<>
								<ImagePreviewer
									url={prevURL}
									deleteImage={deleteImage}
								/>
							</>
						) : (
							<>
								<div className={boardStyles.board_item_polaroid}>
									<Webcam
										ref={camRef}
										videoConstraints={constraints}
										screenshotFormat='image/jpeg'
									/>
								</div>
							</>
						)}
            
            {assetType === "audio" && (
        <div>
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            onNotAllowedOrFound={(err) => console.error(err)}
            downloadOnSavePress={false}
            downloadFileExtension="webm"
            mediaRecorderOptions={{
              audioBitsPerSecond: 128000,
            }}
          />
          {audioURL && (
            <div>
              <audio controls>
                <source src={audioURL} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}

						{photoTaken ? (
							<button
								className={dashboardStyles.editButtons_webcamBtn}
								onClick={deleteImage}>
								<Camera size="30" className="me-2" /> Retake
							</button>
						) : (
							<button
								disabled={loading}
								onClick={captureAndUpload}
								className={dashboardStyles.editButtons_webcamBtn}>
								<Camera size="30" className="me-2" /> Snap!
							</button>
						)}
					</div>
				</div>
			)}
			{loading ? (
				<img
					src={loadingGif}
					alt='Loading...'
					style={{ width: '30px', height: '30px' }}
				/>
			) : (
				<>
					<div>
						<button
							onClick={handleAddAsset}
							disabled={!validateContent(newAsset.content)}
							className={dashboardStyles.editButtons_button}>
							<CheckLg size='20' />
						</button>

						<button
							onClick={() => setOpenMediaForm(false)}
							className={dashboardStyles.editButtons_button}>
							<XLg />
						</button>

						{touched && !validateContent(newAsset.content) && (
							<p>Invalid content</p>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default MediaForm;
