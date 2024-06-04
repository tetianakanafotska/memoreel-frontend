import React from "react";
import styles from "./Loading.module.sass";
import brandmark from "@img/brandmark.svg";
import classNames from "classnames";

function Loading() {
  return (
    <div className={styles.loading}>
      <img
        src={brandmark}
        alt="Loading..."
        className={classNames(styles.loading_image, "mb-3")}
      />
      {/* Loading... */}
    </div>
  );
}

export default Loading;
