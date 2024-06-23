import { useEffect } from "react";

export function useSliderBullets() {
  useEffect(() => {
    const updateBulletsStyle = () => {
      const swipers = document.querySelectorAll(".swiper-pagination");
      swipers.forEach((swiper) => {
        (swiper as HTMLElement).style.paddingLeft = "117px";
      });

      const bullets = document.querySelectorAll(".swiper-pagination-bullet");
      bullets.forEach((bullet) => {
        (bullet as HTMLElement).style.background = "#42567A";
        (bullet as HTMLElement).style.opacity = "0.4";
      });

      const activeBullet = document.querySelector(
        ".swiper-pagination-bullet-active"
      );
      if (activeBullet) {
        (activeBullet as HTMLElement).style.background = "#42567A";
        (activeBullet as HTMLElement).style.opacity = "1";
      }
    };

    updateBulletsStyle();

    const swiperInstance = (document.querySelector(".swiper") as any).swiper;
    swiperInstance.on("slideChange", updateBulletsStyle);
  }, []);
}
