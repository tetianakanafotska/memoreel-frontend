import React, { useState } from 'react';
import { Pen, CheckLg, Trash, XLg } from 'react-bootstrap-icons';
import classNames from 'classnames';

import styles from './index.module.sass';

const EditButtons = ({
	handleSave,
	validateContent,
	newAssetContent,
	isEditing,
	setIsEditing,
	deleteAsset,
	touched,
	assetType,
	assetId,
	setOpenMediaForm,
}) => {
	return (
		<div className={styles.editButtons}>
			<SaveButton
				handleSave={handleSave}
				isEditing={isEditing}
				validateContent={validateContent}
				newAssetContent={newAssetContent}
			/>
			<CancelButton
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				setOpenMediaForm={setOpenMediaForm}
			/>
			<DeleteButton
				assetId={assetId}
				deleteAsset={deleteAsset}
				setOpenMediaForm={setOpenMediaForm}
			/>
			{touched && !validateContent(newAssetContent) && <p>Invalid content</p>}
		</div>
	);
};

export default EditButtons;

export const SaveButton = ({
	handleSave,
	isEditing,
	assetType,
	validateContent,
	newAssetContent,
	className,
	bgcolor,
}) => {
	return (
		<button
			onClick={handleSave}
			disabled={!validateContent(newAssetContent)}
			className={classNames(styles.editButtons_button, className)}
			style={{
				display: isEditing && assetType === 'camImage' ? 'none' : 'flex',
				backgroundColor: bgcolor || '#FFF791',
			}}>
			<CheckLg size='20' />
		</button>
	);
};

export const CancelButton = ({
	isEditing,
	setIsEditing,
	setOpenMediaForm,
	className,
	bgcolor,
}) => {
	return (
		<button
			onClick={() => {
				setIsEditing ? setIsEditing(false) : setOpenMediaForm(false);
			}}
			style={{
				backgroundColor: bgcolor || '#FFF791',
			}}
			className={classNames({
				[styles.editButtons_button]: isEditing,
				[styles.editButtons_button_close]: !isEditing,
				className,
			})}>
			<XLg />
		</button>
	);
};

export const DeleteButton = ({
	assetId,
	deleteAsset,
	setOpenMediaForm,
	className,
	bgcolor,
}) => {
	return (
		<button
			onClick={() => (assetId ? deleteAsset(assetId) : setOpenMediaForm(false))}
			className={classNames(styles.editButtons_button, className)}
			style={{
				backgroundColor: bgcolor || '#FFF791',
			}}>
			<Trash />
		</button>
	);
};

export const EditButton = ({ setIsEditing, className, bgcolor }) => {
	return (
		<button
			className={classNames(styles.editButtons_button, className)}
			onClick={() => {
				setIsEditing((prev) => !prev);
			}}
			style={{
				backgroundColor: bgcolor || '#FFF791'
			}}>
			<Pen size={16} />
		</button>
	);
};
