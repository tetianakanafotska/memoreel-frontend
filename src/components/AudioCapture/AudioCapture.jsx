import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import './AudioCapture.sass';
import boardStyles from '../styles/Board.module.sass';

function AudioCapture({ handleUploadFile, setLoading }) {
	const [audioURL, setAudioURL] = useState('');

	const uploadAudio = async (blob) => {
		try {
			setLoading(true);
			const audioURL = await handleUploadFile(blob);
			setAudioURL(audioURL);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<div className={boardStyles.board_item_audio}>
			<p>Voice note</p>

      <div>
			  <AudioRecorder
          onRecordingComplete={uploadAudio}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          onNotAllowedOrFound={(err) => console.error(err)}
          downloadOnSavePress={false}
          downloadFileExtension='webm'
          mediaRecorderOptions={{
            audioBitsPerSecond: 128000,
          }}
          className='audio-recorder'
			/>
      </div>

			{audioURL && (
				<div className='audio-player-container'>
					<div className='audio-player-wrapper'>
						<div className='board_item_audio'>
							<audio
								controls
								className='audio-player'>
								<source
									src={audioURL}
									type='audio/webm'
								/>
								Your browser does not support the audio element.
							</audio>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default AudioCapture;
