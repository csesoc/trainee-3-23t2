import { ThemeType } from "../schema/theme.schema";
import getLogger from "../utils/logger";
import prisma from "../utils/prisma";

const logger = getLogger();

export const getAllThemes = async (): Promise<{ themes: ThemeType }> => {
  const themes = await prisma.theme.findMany({
    select: {
      themeId: true,
      name: true,
      textColor: true,
      backgroundColor: true,
      image: true
    },
    orderBy: {
      name: 'asc'
    }
  });
  logger.info(
    `All themes retrieved with total of ${themes.length} element(s).`
  );
  return { themes };
};
