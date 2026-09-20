import { personalPortfolio } from './personalPortfolio';
import { ramadhanApp } from './ramadhanApp';
import { financeTracker } from './financeTracker';
import { aiStudyPlanner } from './aiStudyPlanner';
import { promptLensAi } from './promptLensAi';
import {aiTravelPlanner} from "./aiTravelPlanner"
import { umkmPos } from './umkmPos';

export const projects = [
  { ...personalPortfolio },
  { ...ramadhanApp },
  { ...financeTracker },
  { ...aiStudyPlanner },
  { ...promptLensAi },
  {...aiTravelPlanner},
  { ...umkmPos },
];

export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};
