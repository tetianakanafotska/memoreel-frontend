import React, { useState } from 'react';
import { MediaItem } from '@components';
import classNames from 'classnames';

import styles from './index.module.sass';

function Board({ board, assets, className }) {
	const formatDate = (inputDate) => {
		const date = new Date(inputDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const formattedDate = `${day}.${month}.${year}`;
		return formattedDate;
	};

	return board ? (
		<div
			key={board._id}
			className={styles.board}>
			
			<p className={styles.board_date}>{formatDate(board.createdAt)}</p>

			<div className={styles.board_content}>
				{board.assets.length > 0 &&
					board.assets
						.slice()
						.reverse()
						.map((asset) => (
							<div key={asset._id}>
								<MediaItem
									asset={asset}
									enableEditing={false}
								/>
							</div>
						))}
			</div>
		</div>
	) : (
		'...'
	);
}

export default Board;
