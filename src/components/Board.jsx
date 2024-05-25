import React, { useState } from 'react';
import styles from './styles/Board.module.sass';

function Board({ board }) {
	const { id, createdAt } = board;
	return (
		<div className={styles.board}>
			{board &&
				board.boardContent &&
				Object.entries(board.boardContent).map(([key, value]) => {
					return (
						<>
							<div key={id}>
								{value.type === 'image' && (
									<div className='boardImage'>
										<img
											src={value.content}
											alt={key}
										/>
									</div>
								)}
								{value.type === 'text' && (
									<div className={styles.boardNote}>
										<div>
											<p>{value.content}</p>
										</div>
									</div>
								)}
							</div>
						</>
					);
				})}
		</div>
	);
}

export default Board;
