import styles from './styles/LandingPage.module.sass';
import './styles/LandingPage.scss';
import { AuthContext } from '@context';
import Button from '../components/Button.jsx'; // Ensure this path is correct
import { Heart, EmojiSmile } from 'react-bootstrap-icons'; // see https://icons.getbootstrap.com/
import { Container, Row, Col } from 'react-bootstrap';
import landingslide1 from '../assets/images/landingslide1.png';
import landingslide2 from '../assets/images/landingslide2.png';
import landingslide3 from '../assets/images/landingslide3.png';
import landingslide4 from '../assets/images/landingslide4.png';
import landingslide5 from '../assets/images/landingslide5.png';
import landingslide6 from '../assets/images/landingslide6.png';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react'

export default function LandingPage() {
	const { user, isLoggedIn } = useContext(AuthContext);

	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<div className='slider'>
				<div className='slide-track'>
					<div className='slide'>
						<img
							src={landingslide6}
							alt='Slide 6'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide1}
							alt='Slide 1'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide2}
							alt='Slide 2'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide4}
							alt='Slide 4'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide5}
							alt='Slide 5'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide3}
							alt='Slide 3'
						/>
					</div>

					{/* Duplicate slides for continuous effect */}
					<div className='slide'>
						<img
							src={landingslide6}
							alt='Duplicate Slide 6'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide1}
							alt='Duplicate Slide 1'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide2}
							alt='Duplicate Slide 2'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide4}
							alt='Duplicate Slide 4'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide5}
							alt='Duplicate Slide 5'
						/>
					</div>
					<div className='slide'>
						<img
							src={landingslide3}
							alt='Duplicate Slide 3'
						/>
					</div>
				</div>
			</div>
			<Row className="mb-5">
				<Col className="my-5">
					<Button to={isLoggedIn ? '/dashboard' : '/login'}>Highlight Your Day!</Button>
				</Col>
			</Row>
		</div>
	);
}
