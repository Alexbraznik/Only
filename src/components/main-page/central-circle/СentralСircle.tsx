import gsap from "gsap";
import { SmallCircles } from "../";
import styles from "./СentralСircle.module.scss";
import { useState } from "react";

export function СentralСircle({ minDateRef, maxDateRef }): JSX.Element {
  const [rotation, setRotation] = useState(0);

  const rotateCentralCircle = () => {
    const newRotation = rotation + 60;
    setRotation(newRotation);
    gsap.to(".central_circle", {
      duration: 1.5,
      rotation: newRotation,
      ease: "power2.out",
    });
  };
  return (
    <div className={`${styles.central_circle} central_circle`}>
      <SmallCircles
        minDateRef={minDateRef}
        maxDateRef={maxDateRef}
        rotateCentralCircle={rotateCentralCircle}
        rotation={rotation}
      />
    </div>
  );
}
