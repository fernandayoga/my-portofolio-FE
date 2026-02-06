import { navigationTranslations } from './navigation';
import { homeTranslations } from './home';
import { aboutTranslations } from './about';
import { achievementsTranslations } from './achievements';
import { projectsTranslations } from './projects';
import { contactTranslations } from './contact';
import { smartTalkTranslations } from './smartTalk';
import { chatRoomTranslations } from './chatRoom';
import { dashboardTranslations } from './dashboard';
import { projectDetailsTranslations } from './projectDetails';

// Merge all translations
export const translations = {
  en: {
    ...navigationTranslations.en,
    ...homeTranslations.en,
    ...aboutTranslations.en,
    ...achievementsTranslations.en,
    ...projectsTranslations.en,
    ...contactTranslations.en,
    ...smartTalkTranslations.en,
    ...chatRoomTranslations.en,
    ...dashboardTranslations.en,
    ...projectDetailsTranslations.en
  },
  id: {
    ...navigationTranslations.id,
    ...homeTranslations.id,
    ...aboutTranslations.id,
    ...achievementsTranslations.id,
    ...projectsTranslations.id,
    ...contactTranslations.id,
    ...smartTalkTranslations.id,
    ...chatRoomTranslations.id,
    ...dashboardTranslations.id,  
    ...projectDetailsTranslations.id
  },
};