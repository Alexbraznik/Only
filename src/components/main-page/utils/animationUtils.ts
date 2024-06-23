import gsap from "gsap";

export const animateDateChange = (
  ref: React.RefObject<HTMLSpanElement>,
  newDate: number
): void => {
  gsap.to(ref.current, {
    duration: 2,
    textContent: newDate,
    ease: "power2.out",
    roundProps: "textContent",
  });
};
