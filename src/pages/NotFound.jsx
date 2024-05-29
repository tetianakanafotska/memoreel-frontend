import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/NotFound.module.sass'
import classNames from 'classnames'

export default function NotFound () {
	return (
		<main className={classNames(styles.notFound, 'main')}>	
			<Container fluid>
				<Row>
					<Col>
						<p>Oops. Page not found.</p>
					</Col>
				</Row>
			</Container>
		</main>
	)
}
