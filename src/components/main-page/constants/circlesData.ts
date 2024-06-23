import { ICirclesData, ISlidersData } from "./";
import { airplaneList } from "./factsList/airplaneList";
import { cinemaList } from "./factsList/cinemaList";
import { foodList } from "./factsList/foodList";
import { gameList } from "./factsList/gameList";
import { literatureList } from "./factsList/literatureList";
import { scienceList } from "./factsList/scienceList";

// Категории
export const circlesData: ICirclesData[] = [
  { id: 1, title: "Самолеты" },
  { id: 2, title: "Кино" },
  { id: 3, title: "Литература" },
  { id: 4, title: "Еда" },
  { id: 5, title: "Игры" },
  { id: 6, title: "Наука" },
];

// Объединение всех фактов
export const allFacts: ISlidersData[] = [
  ...cinemaList,
  ...gameList,
  ...foodList,
  ...airplaneList,
  ...literatureList,
  ...scienceList,
];
