import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import boardStyles from './styles/Board.module.sass';
import { Pen, XLg, Trash, CheckLg } from 'react-bootstrap-icons';

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
						<div className={boardStyles.board_item_note}>
							<div>
								<p>{assetContent}</p>
							</div>
						</div>
						{isEditing && (
							<input
								type='text'
								placeholder="What is on your mind?"
								onChange={(e) =>
									setAssetContent(e.target.value)
								}
								className={boardStyles.editButtons_input}
							/>
						)}
					</>
				);
			case 'image':
				return (
					<>
						<div className={boardStyles.board_item_image}>
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
								className={boardStyles.editButtons_input}
							/>
						)}
					</>
				);

			case 'youtubeURL':
				return (
					<>
						<div className={boardStyles.board_item_video}>
							<ReactPlayer
								url={assetContent}
								controls
							/>
						</div>

						{isEditing && (
							<>
								<input
									type='text'
									placeholder='Paste Youtube URL here'
									onChange={(e) =>
										setAssetContent(e.target.value)
									}
									className={boardStyles.editButtons_input}
								/>
							</>
						)}
					</>
				);
			case 'camImage':
				return (
					<>
						<div className={boardStyles.board_item_polaroid}>
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
									setAssetContent(e.target.value)
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
		return (
			<>
			<div className={boardStyles.editButtons_container}>
				<button 
					onClick={() => setIsEditing((prev) => !prev)}
					className={boardStyles.editButtons_button}>
					{isEditing ? <XLg size='20' /> : <Pen />}
				</button>

				{isEditing && (
					<>
						<button 
							onClick={handleSaveEdit} 
							className={boardStyles.editButtons_button}>
							<CheckLg size='20' />
						</button>
						<button
							onClick={() => handleDeleteAsset(asset._id)}
							className={boardStyles.editButtons_button}>
							<Trash />
						</button>
					</>
				)}
				</div>
			</>
		);
	};

	return (
		<div className={boardStyles.board_item}>
			<div className={boardStyles.board_item_body}>
				{renderContent()}
				</div>

			<div className={boardStyles.board_item_buttons}>
				{renderButtons()}
			</div>
		</div>
	);
}

export default MediaItem;
