import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Pen } from 'react-bootstrap-icons';

import MediaForm from '@components/MediaForm';
import boardStyles from '../Board/index.module.sass';
import styles from './index.module.sass';

export default function MediaItem({ asset, editAsset, deleteAsset, enableEditing }) {
	const [isEditing, setIsEditing] = useState(false);
	const [assetContent, setAssetContent] = useState(asset.content);

	const saveEdit = (newContent) => {
		editAsset(asset._id, newContent);
		setIsEditing(false);
		setAssetContent(newContent);
	};

	const renderContent = () => {
		switch (asset.type) {
			case 'text':
				return <Text assetContent={assetContent} />;
			case 'image':
				return <Image assetContent={assetContent} />;
			case 'youtubeURL':
				return <YoutubeURL assetContent={assetContent} />;
			case 'camImage':
				return <Polaroid assetContent={assetContent} />;
			case 'audio':
				return <VoiceNote assetContent={assetContent} />;
			default:
				return null;
		}
	};

	return (
		<div className={styles.mediaItem}>
			{isEditing ? (
				<MediaForm
					assetType={asset.type}
					initialContent={assetContent}
					saveEdit={saveEdit}
					setIsEditing={setIsEditing}
					isEditing={isEditing}
					assetId={asset._id}
					deleteAsset={deleteAsset}
				/>
			) : (
				<div className={styles.mediaItem_body}>{renderContent()}</div>
			)}
			{enableEditing && (
				<div
					className={boardStyles.editButtons}
					style={{ display: isEditing ? 'none' : 'flex' }}>
					<button
						onClick={() => {
							setIsEditing((prev) => !prev);
						}}>
						<Pen size={16} />
					</button>
				</div>
			)}
		</div>
	);
}

export const Text = ({ assetContent }) => {
	return (
		<div className={styles.mediaItem_note}>
			<div>
				<p>{assetContent || ''}</p>
			</div>
		</div>
	);
};

export const Image = ({ assetContent }) => {
	return (
		<div className={styles.mediaItem_image}>
			<img
				src={assetContent || ''}
				alt='Uploaded content'
			/>
		</div>
	);
};

export const Polaroid = ({ children, assetContent }) => {
	return children ? (
		<div className={styles.mediaItem_polaroid}>{children}</div>
	) : (
		<div className={styles.mediaItem_polaroid}>
			<img
				src={assetContent || ''}
				alt='Uploaded content'
				style={{ width: '400px' }}
			/>
		</div>
	);
};

export const VoiceNote = ({ assetContent }) => {
	return (
		<div className={styles.mediaItem_audio}>
			<p>
				voice <br /> note
			</p>
			<audio
				controls
				src={assetContent}
			/>
		</div>
	);
};

export const YoutubeURL = ({ assetContent }) => {
	return (
		<div className={styles.mediaItem_video}>
			<ReactPlayer
				url={assetContent || ''}
				width={550}
				height={350}
				controls
			/>
		</div>
	);
};