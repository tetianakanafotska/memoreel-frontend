import { Link } from 'react-router-dom';
import styles from './styles/Button.module.sass';
import classNames from 'classnames';

export default function Button({ to, label, style = 'primary', fullWidth = false, iconRight, iconLeft, onClick, children, type }) {
    const typeStyles = {
        primary: styles['btn-primary'],
        secondary: styles['btn-secondary'],
        tertiary: styles['btn-tertiary'],
        'primary-outline': styles['btn-primary-outline'],
        'secondary-outline': styles['btn-secondary-outline'],
        'tertiary-outline': styles['btn-tertiary-outline'],
    };

    const buttonStyle = typeStyles[type] || typeStyles.primary;

    const buttonClasses = classNames(
        buttonStyle,
        { [styles['full-width']]: fullWidth },
        { [styles['icon-left']]: iconLeft },
        { [styles['icon-right']]: iconRight }
    );

    return (
        <Link to={to} className={buttonClasses} onClick={onClick} type={type}>
            {iconLeft}
            {children}
            {iconRight}
        </Link>
    );
}
