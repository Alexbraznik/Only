import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./SwiperComponent.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { circlesData } from "../../constants";

export function SwiperComponent() {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedCategory = useSelector(
    (state: RootState) => state.switch.selectedCategory
  );
  const currentTitle = useSelector(
    (state: RootState) =>
      circlesData.find((circle) => circle.id === state.switch.currentParentId)
        ?.title
  );

  useEffect(() => {
    const match = window.matchMedia("(max-width: 320px)").matches;

    if (match) {
      gsap.fromTo(
        `.gsap_item`,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.3,
        }
      );
    }
  }, [selectedCategory]);

  return (
    <>
      <div className={`${styles.center_title} gsap_item`}>
        <span>{currentTitle}</span>
        <div></div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={25}
        slidesPerView={3}
        loop
        navigation={{
          prevEl: ".item_prev",
          nextEl: ".item_next",
        }}
        pagination={{
          type: "bullets",
          clickable: true,
          el: ".swiper-pagination",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },
          399: {
            slidesPerView: 1.5,
            spaceBetween: 25,
            pagination: {
              type: "bullets",
              clickable: true,
            },
          },
          400: {
            slidesPerView: 3,
            spaceBetween: 80,
            pagination: false,
          },
        }}
      >
        {selectedCategory.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div
              className={`${styles.item} gsap_item ${
                activeIndex === index ? styles.active : styles.inactive
              }`}
            >
              <span>{item.date}</span>
              <p>{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
