import styles from './styles/HomePage.module.sass';
import { Button } from '@components';
import { Heart, EmojiSmile } from 'react-bootstrap-icons'; // see https://icons.getbootstrap.com/
import { Container, Row, Col } from 'react-bootstrap';

export default function HomePage() {
	return (
		<div className={styles.homepage}>
			<Container fluid>
				<Row className="my-5">
					<Col>
						<h1>Hello!</h1>
					</Col>
				</Row>

				<Row>
					<Col md='6' lg='4'>
						<Button
							to='/'
							label='Here are buttons!'
							type='primary'
						/>
					</Col>

					<Col md='6' lg='4'>
						<Button
							to='/'
							label='They can be full-width'
							type='primary-outline'
							fullWidth
						/>
					</Col>

					<Col md='6' lg='4'>
						<Button
							to='/'
							label='They can have icons'
							type='secondary'
							iconRight={<Heart />}
						/>
					</Col>

					<Col md='6' lg='4'>
						<Button
							to='/'
							label='And be outlined'
							type='secondary-outline'
							iconLeft={<EmojiSmile />}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
