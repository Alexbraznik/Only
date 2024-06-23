import styles from "./MainPage.module.scss";
import { LeftArrow, RightArrow } from "./assets";
import { SliderList, СentralСircle } from "./";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "./store/switchSlice";
import { RootState } from "./store";
import { useLayoutEffect, useRef } from "react";
import { animateDateChange } from "./utils/animationUtils";
import { circlesData } from "./constants";

export function MainPage(): JSX.Element {
  const dispatch = useDispatch();
  const minDate = useSelector((state: RootState) => state.date.minDate);
  const maxDate = useSelector((state: RootState) => state.date.maxDate);
  const minDateRef = useRef<HTMLSpanElement>(null);
  const maxDateRef = useRef<HTMLSpanElement>(null);

  const parentId = useSelector(
    (state: RootState) => state.switch.currentParentId
  );

  const currentParentId = parentId < 10 ? `0${parentId}` : parentId;
  const circlesLength =
    circlesData.length < 10 ? `0${circlesData.length}` : circlesData.length;

  // Плавно меняются цифры на дате
  // БАГ(возможно date не успевает прийти)
  useLayoutEffect(() => {
    animateDateChange(minDateRef, minDate);
    animateDateChange(maxDateRef, maxDate);
  }, [minDate, maxDate]);

  // Перелистывание списка
  const handleArrowClick = (direction: number): void => {
    dispatch(setSelectedCategory(direction));
  };

  return (
    <div className={styles.main}>
      <div className={styles.containter}>
        <div className={styles.title}>
          <div></div>
          <h1>
            Исторические <br />
            даты
          </h1>
        </div>

        <div className={styles.vertical_line}></div>
        <div className={styles.horizontal_line}></div>
        <СentralСircle minDateRef={minDateRef} maxDateRef={maxDateRef} />

        <div className={styles.center_date}>
          <span ref={minDateRef}>{minDate}</span>
          <span ref={maxDateRef}>{maxDate}</span>
        </div>

        <div className={styles.slider}>
          <div className={styles.slider_date}>
            <span>{currentParentId}/</span>
            <span>{circlesLength}</span>
            <div className={styles.slider_turn}>
              <button onClick={() => handleArrowClick(-1)}>
                <LeftArrow className={styles.slider_prev} />
              </button>
              <button onClick={() => handleArrowClick(1)}>
                <RightArrow className={styles.slider_next} />
              </button>
            </div>
          </div>
          <SliderList />
        </div>
      </div>
    </div>
  );
}
