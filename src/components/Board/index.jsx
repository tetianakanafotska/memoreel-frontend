import React, { useState } from "react";
import styles from "./index.module.sass";
import classNames from "classnames";

function Board({ board }) {
	const { id, createdAt } = board;

	const renderContent = (key, value) => {
		if (!value) return null;
		switch (value.type) {
			case 'image':
				return (
					<div
						className={classNames(
							styles.boardImage,
							styles.boardElement
						)}>
						<img
							src={value.content}
							alt={key}
						/>
					</div>
				);
			case 'text':
				return (
					<div
						className={classNames(
							styles.boardNote,
							styles.boardElement
						)}>
						<div>
							<p>{value.content}</p>
						</div>
					</div>
				);
			case 'videoURL':
				return (
					<div
						className={classNames(
							styles.boardNote,
							styles.boardElement
						)}>
						<div>
							<p>Still to implement {value.content}</p>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className={styles.board}>
			{board &&
				board.assets &&
				Object.entries(board.assets).map(([key, value]) => {
					return (
						<>{<div key={id}>{renderContent(key, value)}</div>}</>
					);
				})}
		</div>
	);
}

export default Board;
