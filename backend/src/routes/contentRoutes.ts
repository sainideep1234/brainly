import { Router, type Request, type Response } from "express";
import { AddContent } from "../schemas";
import userMiddleware from "./middleware";
import { db } from "../db";
import {
  contentRelations,
  contentTable,
  contentTagsTable,
  tagsTable,
  usersTable,
} from "../db/model";
import { eq, ilike, inArray, like } from "drizzle-orm";

const contentRoutes = Router();

contentRoutes.post("/", userMiddleware, async (req: Request, res: Response) => {
  try {
    const { success, data, error } = AddContent.safeParse(req.body);
    if (!success) {
      console.log(`[ERROR] , ${error}`);

      return res.status(401).json({
        success: false,
        message: "please provide valid inputs",
      });
    }

    const { title, description, link, tags, type } = data;
    const userId = req.userId;

    await db.transaction(async (tx) => {
      const [newContent] = await tx
        .insert(contentTable)
        .values({
          title,
          descriptions: description,
          links: link,
          type,
          userId: userId,
        })
        .returning({ id: contentTable.id });

      const contentId = newContent?.id;

      if (tags && tags.length > 0) {
        await tx
          .insert(tagsTable)
          .values(tags.map((t) => ({ tagName: t })))
          .onConflictDoNothing({ target: tagsTable.tagName });

        const existingTags = await tx
          .select({ id: tagsTable.id })
          .from(tagsTable)
          .where(inArray(tagsTable.tagName, tags));

        if (existingTags.length > 0) {
          const links = existingTags.map((tag) => ({
            contentId: contentId,
            tagsId: tag.id,
          }));
          await tx.insert(contentTagsTable).values(links);
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: "Content added successfully",
    });
  } catch (error) {
    console.error("Error adding content:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

contentRoutes.get("/", userMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;

  const content = await db.query.contentTable.findMany({
    where: eq(contentTable.userId, userId),
  });
  if (!content) {
    return res.status(201).json({
      success: false,
      message: "no content existed",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Content fetched successfully",
    data: content,
  });
});

contentRoutes.get(
  "/search",
  userMiddleware,
  async (req: Request, res: Response) => {
    console.info(`[INFO] entered in like query `);
    const { q } = req.query;
    console.log(`[INFO] query is fetched ${q}`);

    if (!q || (q as string).length === 0) {
      res.status(400).json({
        success: false,
        message: "query is empty",
      });
      return;
    }
    try {
      const data = await db
        .select()
        .from(contentTable)
        .where(ilike(contentTable.descriptions, `%${q}%`));
      if (!data) {
        return res.status(401).json({
          success: false,
          messsage: "no data fetched",
        });
      }
      res.status(201).json({
        success: true,
        message: "data fetched succesfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        messsage: "Internal server error",
      });
    }
  },
);

contentRoutes.delete(
  "/:id",
  userMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const contentId = Number(id);
    console.log(`[INFO] change to number ${contentId}`);

    try {
      const [deleteContent] = await db
        .delete(contentTable)
        .where(eq(contentTable.id, contentId))
        .returning({ id: contentTable.id });

      res.status(201).json({
        success: true,
        messsage: "content deleted successfully",
        data: {
          id: deleteContent?.id,
        },
      });
    } catch (error) {
      console.log(`[ERROR] , ${error}`);

      res.status(500).json({
        success: false,
        messsage: "Internal server error",
      });
    }
  },
);

contentRoutes.post("/share", userMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const { share } = req.body;

  try {
    if (share) {
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, userId),
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      let hash = user.shareHash;
      if (!hash) {
        hash = crypto.randomUUID();
        await db
          .update(usersTable)
          .set({ shareHash: hash })
          .where(eq(usersTable.id, userId));
      }

      return res.status(200).json({
        success: true,
        hash,
      });
    } else {
      await db
        .update(usersTable)
        .set({ shareHash: null })
        .where(eq(usersTable.id, userId));

      return res.status(200).json({
        success: true,
        message: "Shared link disabled successfully",
      });
    }
  } catch (error) {
    console.error("Error in share route:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

contentRoutes.get("/share/:shareHash", async (req: Request, res: Response) => {
  const { shareHash } = req.params;

  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.shareHash, shareHash),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or disabled share link",
      });
    }

    const content = await db.query.contentTable.findMany({
      where: eq(contentTable.userId, user.id),
    });

    return res.status(200).json({
      success: true,
      username: user.name,
      data: content,
    });
  } catch (error) {
    console.error("Error fetching shared content:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default contentRoutes;
