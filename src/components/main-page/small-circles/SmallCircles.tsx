import styles from "./SmallCircles.module.scss";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { circlesData } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentParentId } from "../store/switchSlice";
import { setMaxDate, setMinDate } from "../store/dateSlice";
import { animateDateChange } from "../utils/animationUtils";

export function SmallCircles({
  minDateRef,
  maxDateRef,
  rotateCentralCircle,
  rotation,
}): JSX.Element {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const numCircles = 6; // количество кругов
  const angleIncrement = 360 / numCircles;

  const circlesRefs = useRef<HTMLDivElement[]>([]);
  const minDate = useSelector((state: RootState) => state.date.minDate);
  const maxDate = useSelector((state: RootState) => state.date.maxDate);
  const dispatch = useDispatch();

  // Текущий parentId
  const activeId = useSelector(
    (state: RootState) => state.switch.currentParentId
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.switch.selectedCategory
  );

  useEffect(() => {
    dispatch(setMinDate(selectedCategory));
    dispatch(setMaxDate(selectedCategory));
  }, [selectedCategory]);

  // Меняем parentId по клику на кружок
  const handleCircleClick = (circleId: number) => {
    dispatch(setCurrentParentId(circleId));
    animateDateChange(minDateRef, minDate);
    animateDateChange(maxDateRef, maxDate);
    rotateCentralCircle();
  };

  useEffect(() => {
    circlesRefs.current.forEach((circleRef, index) => {
      const circleId = circlesData[index].id;
      const isActive = circleId === activeId || circleId === hoveredId;
      const size = isActive ? 56 : 6;
      const background = isActive ? "#e5e5e5" : "#303e58";

      gsap.to(circleRef, {
        width: size,
        height: size,
        background,
        duration: 1,
      });
    });
  }, [activeId, hoveredId]);

  const smallCircles = circlesData.map((circle, index) => {
    const angle = index * angleIncrement;
    const rotateTransform = `rotate(${angle}deg)`;
    const translateTransform = `translate(265px)`;

    const inverseRotateTransform = `rotate(-${angle + rotation}deg)`;

    const circleClassName =
      circle.id === activeId || circle.id === hoveredId
        ? `${styles.circle_active} ${"circle_active"}`
        : `${styles.circle_inactive} ${"circle_inactive"}`;

    return (
      <div
        key={circle.id}
        ref={(el) => {
          circlesRefs.current[index] = el;
        }}
        className={circleClassName}
        style={{ transform: `${rotateTransform} ${translateTransform}` }}
        onClick={() => handleCircleClick(circle.id)}
        onMouseEnter={() => setHoveredId(circle.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {(circle.id === activeId || circle.id === hoveredId) && (
          <div style={{ transform: inverseRotateTransform }}>
            <span className={`${styles.circle_title}`}>{circle.id}</span>
            {circle.id === activeId && <p>{circle.title}</p>}
          </div>
        )}
      </div>
    );
  });

  return <div>{smallCircles}</div>;
}
