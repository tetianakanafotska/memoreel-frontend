import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { AuthContext } from '@context/AuthContext';
import {Button} from '@components';

function InfoMessage() {
	const navigate = useNavigate();
	const { logOutUser } = useContext(AuthContext);

	return (
		<Container fluid>
			<Row>
				<Col
					md={8}
					lg={7}
					xl={6}
					className="infoMessage mx-auto mt-4">
					<p className="mb-3">Your profile has been successfully updated. <br />
					To see the latest changes,
					please login again.</p>
					<div>
						<Button
							onClick={() => {
								logOutUser();
								navigate('/login');
							}}>
							Login
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default InfoMessage;
