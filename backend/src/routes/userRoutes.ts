import { Router, type Response, type Request } from "express";
import { SignInSchema, SignUpSchema } from "../schemas";
import { hash, compare } from "bcrypt";
import { db } from "../db";
import { usersTable } from "../db/model";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const userRouter = Router();

const SALT_ROUNDS = 10;

userRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const { success, data } = SignInSchema.safeParse(req.body);
    if (!success) {
      return res.status(401).json({
        success: false,
        message: "please provide valid inputs",
      });
    }
    const { email, password } = data;
    const isUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!isUser) {
      return res.status(401).json({
        success: false,
        message: "user is not present , go to sign up route",
      });
    }

    const isHashed = await compare(password, isUser.password);

    if (!isHashed) {
      return res.status(401).json({
        success: false,
        message: "password is wrong",
      });
    }

    const jwtToken = jwt.sign({ userId: isUser.id }, process.env.JWT_SECRET!);

    req.userId = isUser.id;

    res.status(201).json({
      success: true,
      message: "sign in successfully",
      data: {
        token: jwtToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " Internal server error",
    });
  }
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { success, data, error } = SignUpSchema.safeParse(req.body);
    if (!success) {
      console.log(`[ERROR] ${error}`);

      res.status(401).json({
        success: false,
        message: "please provide valid inputs",
      });
      return;
    }

    const { email, password, name } = data;

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (user) {
      res.status(401).json({
        success: false,
        message: "user already existed",
      });
      return;
    }

    const hashedPass = await hash(password, SALT_ROUNDS);

    const userEntry = await db
      .insert(usersTable)
      .values({ email, password: hashedPass, name })
      .returning();
    const createdUser = userEntry[0];
    if (!createdUser) {
      res.status(301).json({
        success: false,
        message: "user failed to create",
      });
      return;
    }
    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET!);
    res.status(201).json({
      success: true,
      message: "user created  successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(`[ERROR] ${error}`);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });

    return;
  }
});

export default userRouter;
