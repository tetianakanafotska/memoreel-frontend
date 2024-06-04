import React from "react";
import styles from "./index.module.sass";
import { Asterisk } from "react-bootstrap-icons";
import classNames from "classnames";

function Marquee({ phrases, className }) {
  const duplicatedPhrases =
    phrases && phrases.length > 0
      ? [...phrases, ...phrases, ...phrases]
      : [[""]]; // empty array if no phrase is provided, because it's still going to display the div

  return (
    <div className={classNames(styles.marquee, className)}>
      <div className={styles.marquee_content}>
        {duplicatedPhrases &&
          duplicatedPhrases.map((phrase, index) => {
            return (
              <div key={index} className={styles.marquee_item}>
                {phrase}
                <div className={styles.asterisk}>
                  <Asterisk size="16" />
                  <Asterisk size="16" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Marquee;
