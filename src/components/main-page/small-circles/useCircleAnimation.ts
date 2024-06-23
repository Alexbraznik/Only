import { MutableRefObject, useEffect } from "react";
import { circlesData } from "../constants";
import gsap from "gsap";

type CircleAnimationProps = {
  currentParentId: number | null;
  hoveredId: number | null;
  circlesRefs: MutableRefObject<HTMLDivElement[]>;
};

// Функция анимации
export const useCircleAnimation = ({
  currentParentId,
  hoveredId,
  circlesRefs,
}: CircleAnimationProps) => {
  useEffect(() => {
    circlesRefs.current.forEach((circleRef, index) => {
      const circleId = circlesData[index].id;
      const isActive = circleId === currentParentId || circleId === hoveredId;
      const size = isActive ? 56 : 6;
      const background = isActive ? "#e5e5e5" : "#303e58";

      gsap.to(circleRef, {
        width: size,
        height: size,
        background,
        duration: 1,
      });
    });
  }, [currentParentId, hoveredId]);
};
