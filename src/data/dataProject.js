import { personalPortfolio } from './personalPortfolio';
import { ramadhanApp } from './ramadhanApp';
import { financeTracker } from './financeTracker';
import { aiStudyPlanner } from './aiStudyPlanner';
import { promptLensAi } from './promptLensAi';

export const projects = [
  { ...personalPortfolio },
  { ...ramadhanApp },
  { ...financeTracker },
  { ...aiStudyPlanner },
  { ...promptLensAi }
];

export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};
