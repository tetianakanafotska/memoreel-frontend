import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

function AudioCapture({ handleUploadFile, setLoading }) {
  const [audioURL, setAudioURL] = useState("");

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
    <div>
      <AudioRecorder
        onRecordingComplete={uploadAudio}
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
  );
}

export default AudioCapture;
