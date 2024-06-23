import styles from "./SmallCircles.module.scss";
import { useEffect, useRef, useState } from "react";
import { circlesData } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentParentId } from "../store/switchSlice";
import { setMaxDate, setMinDate } from "../store/dateSlice";
import { animateDateChange } from "../utils/animationUtils";
import { useCircleAnimation } from "./useCircleAnimation";
import { Circle } from "./circle/Circle";
import { createSelector } from "reselect";

interface ISmallCirclesProps {
  minDateRef: React.RefObject<any>;
  maxDateRef: React.RefObject<any>;
  rotateCentralCircle: () => void;
  rotation: number;
}

export function SmallCircles({
  minDateRef,
  maxDateRef,
  rotateCentralCircle,
  rotation,
}: ISmallCirclesProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null); // id при наведении
  const numCircles: number = 6; // количество кругов
  const angleIncrement: number = 360 / numCircles; // расстояние между кругами
  const circlesRefs = useRef<Array<any>>([]); //  ссылка на круги
  const dispatch = useDispatch();

  const selectDate = (state: RootState) => state.date;
  const selectSwitch = (state: RootState) => state.switch;

  const mySelector = createSelector(
    [selectDate, selectSwitch],
    (date, switchState) => ({
      minDate: date.minDate,
      maxDate: date.maxDate,
      currentParentId: switchState.currentParentId,
      selectedCategory: switchState.selectedCategory,
      activeId: switchState.currentParentId,
    })
  );

  const { minDate, maxDate, currentParentId, selectedCategory, activeId } =
    useSelector(mySelector);

  useCircleAnimation({ currentParentId, hoveredId, circlesRefs }); // функция анимации

  // Хук отправки даты
  useEffect(() => {
    dispatch(setMinDate(selectedCategory));
    dispatch(setMaxDate(selectedCategory));
  }, [selectedCategory, dispatch]);

  // Функция анимации даты и прокрутки
  const handleCircleClick = (circleId: number) => {
    dispatch(setCurrentParentId(circleId));
    animateDateChange(minDateRef, minDate);
    animateDateChange(maxDateRef, maxDate);
    rotateCentralCircle();
  };

  return (
    <div>
      {circlesData.map((circle, index) => (
        <Circle
          key={circle.id}
          circle={circle}
          index={index}
          angleIncrement={angleIncrement}
          activeId={activeId}
          hoveredId={hoveredId}
          currentParentId={currentParentId}
          rotation={rotation}
          styles={styles}
          circlesRefs={circlesRefs}
          setHoveredId={setHoveredId}
          handleCircleClick={handleCircleClick}
        />
      ))}
    </div>
  );
}
