interface ICircleProps {
  circle: {
    id: number;
    title: string;
  };
  index: number;
  angleIncrement: number;
  activeId: number | null;
  hoveredId: number | null;
  currentParentId: number | null;
  rotation: number;
  styles: any;
  circlesRefs: React.MutableRefObject<any[]>;
  setHoveredId: React.Dispatch<React.SetStateAction<number | null>>;
  handleCircleClick: (circleId: number) => void;
}

export function Circle({
  circle,
  index,
  angleIncrement,
  activeId,
  hoveredId,
  currentParentId,
  rotation,
  styles,
  circlesRefs,
  setHoveredId,
  handleCircleClick,
}: ICircleProps) {
  const angle: number = index * angleIncrement;
  const rotateTransform: string = `rotate(${angle}deg)`;
  const translateTransform: string = `translate(265px)`;
  const inverseRotateTransform: string = `rotate(-${angle + rotation}deg)`;

  const isActive: boolean = circle.id === activeId || circle.id === hoveredId;
  const circleClassName = isActive
    ? `${styles.circle_active} circle_active`
    : `${styles.circle_inactive} circle_inactive`;

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
      {(circle.id === currentParentId || circle.id === hoveredId) && (
        <div style={{ transform: inverseRotateTransform }}>
          <span className={styles.circle_title}>{circle.id}</span>
          {circle.id === currentParentId && <p>{circle.title}</p>}
        </div>
      )}
    </div>
  );
}
