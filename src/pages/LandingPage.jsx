import styles from './styles/LandingPage.module.sass';
import { AuthContext } from '@context';
import Button from '../components/Button.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import landingslide1 from '@img/landingpage-slideshow/landingslide1.jpg';
import landingslide2 from '@img/landingpage-slideshow/landingslide2.jpg';
import landingslide3 from '@img/landingpage-slideshow/landingslide3.jpg';
import landingslide4 from '@img/landingpage-slideshow/landingslide4.jpg';
import landingslide5 from '@img/landingpage-slideshow/landingslide5.jpg';
import landingslide6 from '@img/landingpage-slideshow/landingslide6.jpg';
import landingslide7 from '@img/landingpage-slideshow/landingslide7.jpg';
import { Marquee } from '@components';
import React, { useContext } from 'react';

export default function LandingPage() {
	const { user, isLoggedIn } = useContext(AuthContext);

	const images = [];
	for (let i = 1; i <= 6; i++) {
		images.push(
			import(
				`@img/landingpage-slideshow/landingpage-slideshow/landingslide${i}.png`
			)
		);
	}

	return (
		<section className={styles.landingPage}>
			<div className={styles.landingPage_slideshow}>
				<Marquee
					phrases={[
						'For days worth remembering',
						"What's on your mind today?",
						'What made you laugh today?',
					]}
					className={styles.marquee1}
				/>

				<div className={styles.landingPage_slideshow_track}>
					<div className={styles.landingPage_slideshow_item}>
						<img
							src={landingslide1}
							alt='MemoReel'
						/>
					</div>
					<div className={styles.landingPage_slideshow_item}>
						<img
							src={landingslide3}
							alt='MemoReel'
						/>
					</div>
					<div className={styles.landingPage_slideshow_item}>
						<img
							src={landingslide4}
							alt='MemoReel'
						/>
					</div>
					<div className={styles.landingPage_slideshow_item}>
						<img
							src={landingslide6}
							alt='MemoReel'
						/>
					</div>
					<div className={styles.landingPage_slideshow_item}>
						<img
							src={landingslide6}
							alt='MemoReel'
						/>
					</div>
				</div>

				<Marquee
					phrases={[
						'What made you laugh today?',
						'For days worth remembering',
						"What's on your mind today?",
					]}
					className={styles.marquee2}
				/>

        <Container fluid>
          <div className={styles.landingPage_cta}>
            <Button to={isLoggedIn ? '/dashboard' : '/login'}>
              Highlight Your Day!
            </Button>
          </div>
        </Container>
			</div>
		</section>
	);
}
