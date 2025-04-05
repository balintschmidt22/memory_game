import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./Card.module.css";

function Card({ onClick, url, flipped }) {
  return (
    <div className={cn(styles.root, { [styles.flipped]: flipped })} onClick={onClick}>
      <img className={styles.image} width="200" height="200" src={url} alt="" />
    </div>
  )
}

Card.prototypes = {
  flip: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Card;
