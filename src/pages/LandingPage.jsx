import styles from './styles/LandingPage.module.sass';
import { Button } from '@components';
import { Heart, EmojiSmile } from 'react-bootstrap-icons'; // see https://icons.getbootstrap.com/
import { Container, Row, Col } from 'react-bootstrap';

export default function LandingPage() {
	return (
		<div className={styles.landingpage}>
			<Container fluid>
				<Row className='my-5'>
					<Col>
						<h1>Hello!</h1>
					</Col>
				</Row>

				<Row>
					<Col
						md='6'
						lg='4'>
						<Button
							to='/'
							type='primary'>
							Here are buttons!
						</Button>
					</Col>

					<Col
						md='6'
						lg='4'>
						<Button
							to='/'
							type='primary-outline'
							fullWidth>
							They can be full-width
						</Button>
					</Col>

					<Col
						md='6'
						lg='4'>
						<Button
							to='/'
							type='secondary'
							iconRight={<Heart />}>
							They can have icons
						</Button>
					</Col>

					<Col
						md='6'
						lg='4'>
						<Button
							to='/'
							type='secondary-outline'
							iconLeft={<EmojiSmile />}>
							And be outlined
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
