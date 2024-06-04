import { Link } from "react-router-dom";
import styles from "./styles/Button.module.sass";
import classNames from "classnames";

export default function Button({
  to,
  label,
  style = "",
  fullWidth = false,
  iconRight,
  iconLeft,
  onClick,
  children,
  type,
}) {
  const typeStyles = {
    primary: "button-primary",
    secondary: "button-secondary",
    tertiary: "button-tertiary",
    "primary-outline": "button-primary-outline",
    "secondary-outline": "button-secondary-outline",
    "tertiary-outline": "button-tertiary-outline",
  };

  const buttonStyle = type || typeStyles.primary;

  const buttonClasses = classNames(
    "button",
    buttonStyle,
    { "full-width": fullWidth },
    { "icon-left": iconLeft },
    { "icon-right": iconRight }
  );

  return (
    <Link to={to} className={buttonClasses} onClick={onClick} type={type}>
      {iconLeft}
      {children}
      {iconRight}
    </Link>
  );
}
