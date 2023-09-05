import { PrismaClient } from "@prisma/client";
import { ThemeType } from "../schema/theme.schema";
import getLogger from "../utils/logger";

const logger = getLogger();
const prisma = new PrismaClient();

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
