import React, { useState, useEffect } from 'react';

import { Images, PlayBtn, Camera, Stickies, Mic, PlusLg } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';

export function AddMediaButton({onClick, addMediaIsOpen}) {
	return (
		<button
      onClick={onClick}
			className={classNames(styles.addMediaButton_addButton, {
				[styles.addMediaButton_addButton_on]: addMediaIsOpen,
			})}>
			<PlusLg
				size='20'
				className='mx-1'
			/>
			<span
				className={classNames('mx-1', {
					[styles.hideText]: addMediaIsOpen,
				})}>
				Add Media
			</span>
		</button>
	);
}

export default function PopUpButtons({
	assetType,
	setAssetType,
	setOpenMediaForm,
	openMediaForm,
}) {
	const [activeButton, setActiveButton] = useState(null);

	const handleOnClick = (type) => {
		setOpenMediaForm((prev) => {
			if (prev && assetType === type) {
				return false;
			} else {
				setAssetType(type);
				return true;
			}
		});
		setActiveButton((prev) => (prev === type ? null : type));
	};

	useEffect(() => {
		if (!openMediaForm) {
			setActiveButton(null);
		}
	}, [openMediaForm]);

	return (
		<>
			<button
				onClick={() => handleOnClick('image')}
				className={`${styles.addMediaButton_assetTypeButton} ${
					activeButton === 'image' ? styles.active : ''
				}`}>
				<Images size='30' />
				<span>add image</span>
			</button>
			<button
				onClick={() => handleOnClick('text')}
				className={`${styles.addMediaButton_assetTypeButton} ${
					activeButton === 'text' ? styles.active : ''
				}`}>
				<Stickies size='30' />
				<span>add text</span>
			</button>
			<button
				onClick={() => handleOnClick('youtubeURL')}
				className={`${styles.addMediaButton_assetTypeButton} ${
					activeButton === 'youtubeURL' ? styles.active : ''
				}`}>
				<PlayBtn size='30' />
				<span>add Youtube video</span>
			</button>
			<button
				onClick={() => handleOnClick('camImage')}
				className={`${styles.addMediaButton_assetTypeButton} ${
					activeButton === 'camImage' ? styles.active : ''
				}`}>
				<Camera size='30' />
				<span>take selfie</span>
			</button>
			<button
				onClick={() => handleOnClick('audio')}
				className={`${styles.addMediaButton_assetTypeButton} ${
					activeButton === 'audio' ? styles.active : ''
				}`}>
				<Mic size='28' />
				<span>add audio</span>
			</button>
		</>
	);
}
