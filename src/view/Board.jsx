import PropTypes from "prop-types";

import styles from "./Board.module.css";

function Board({ children }) {
  return (
    <div className={styles.root}>{children}</div>
  )
}

Board.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Board;
