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
    setOpenMediaForm
}) => {
	return (
		<div className={styles.editButtons}>
			<button
				onClick={handleSave}
				disabled={!validateContent(newAssetContent)}
				className={styles.editButtons_button}
				style={{
					display: isEditing && assetType === 'camImage' ? 'none' : 'flex',
				}}>
				<CheckLg size='20' />
			</button>
			<button
				onClick={() => {
					setIsEditing ? setIsEditing(false) : setOpenMediaForm(false);
				}}
				className={classNames({
					[styles.editButtons_button]: isEditing,
					[styles.editButtons_button_close]: !isEditing,
				})}>
				<XLg />
			</button>
			<button
				onClick={() =>
					assetId ? deleteAsset(assetId) : setOpenMediaForm(false)
				}
				className={styles.editButtons_button}>
				<Trash />
			</button>
			{touched && !validateContent(newAssetContent) && <p>Invalid content</p>}
		</div>
	);
};

export default EditButtons;
