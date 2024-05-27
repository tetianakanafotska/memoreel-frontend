import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import boardStyles from './styles/Board.module.sass';

function MediaItem({ asset, handleDeleteAsset, handleEditAsset, className }) {
	const [isEditing, setIsEditing] = useState(false);
	const [assetContent, setAssetContent] = useState(asset.content);

	const handleSaveEdit = () => {
		handleEditAsset(asset._id, assetContent);
		setIsEditing(false);
	};

	const renderContent = () => {
		switch (asset.type) {
			case 'text':
				return (
					<>
						<div
							className={classNames(
								boardStyles.board_element,
								boardStyles.board_element_note
							)}>
							<div>
								<p>{assetContent}</p>
							</div>
						</div>
						{isEditing && (
							<input
								type='text'
								value={assetContent}
								onChange={(e) =>
									setAssetContent(e.target.value)
								}
							/>
						)}
					</>
				);
			case 'image':
				return (
					<>
						<div
							className={classNames(
								boardStyles.board_element,
								boardStyles.board_element_image
							)}>
							<img
								src={assetContent}
								alt='Uploaded content'
							/>
						</div>
						{isEditing && (
							<input
								type='text'
								value={assetContent}
								onChange={(e) =>
									setAssetContent(e.target.value)
								}
							/>
						)}
					</>
				);

			case 'youtubeURL':
				return (
					<>
						<div
							className={classNames(
								boardStyles.board_element,
								boardStyles.board_element_video
							)}>
							<ReactPlayer
								url={assetContent}
								controls
							/>
						</div>

						{isEditing && (
							<>
								<input
									type='text'
									value={assetContent}
									onChange={(e) =>
										setAssetContent(e.target.value)
									}
								/>
							</>
						)}
					</>
				);
			case 'camImage':
				return (
					<>
						<div
							className={classNames(
								boardStyles.board_element,
								boardStyles.board_element_polaroid
							)}>
							<img
								src={asset.content}
								alt='Uploaded content'
								style={{ width: '400px' }}
							/>
						</div>
						{isEditing && (
							<input
								type='text'
								value={asset.content}
								onChange={(e) =>
									setEditedContent(e.target.value)
								}
							/>
						)}
					</>
				);
			default:
				return null;
		}
	};

	const renderButtons = () => {
		return isEditing ? (
			<div className='edit-mode-buttons'>
				<button onClick={handleSaveEdit}>Save</button>
				<button onClick={() => setIsEditing(false)}>Cancel</button>
				<button onClick={() => handleDeleteAsset(asset._id)}>
					Delete
				</button>
			</div>
		) : (
			<button onClick={() => setIsEditing(true)}>Edit</button>
		);
	};

	return (
		<div>
			{renderContent()}
			{renderButtons()}
		</div>
	);
}

export default MediaItem;
