import styles from "./SliderList.module.scss";
import { LeftArrow, RightArrow } from "../assets";
import { useSliderBullets } from "./useSliderBullets";
import { SwiperComponent } from "./SwiperComponent/SwiperComponent";

export function SliderList(): JSX.Element {
  useSliderBullets();

  return (
    <div className={styles.item_container}>
      <button className={`${styles.item_prev} item_prev`}>
        <LeftArrow className={styles.item_prev_arrow} />
      </button>
      <SwiperComponent />
      <button className={`${styles.item_next} item_next`}>
        <RightArrow className={styles.item_next_arrow} />
      </button>
      <div className="swiper-pagination"></div>
    </div>
  );
}
