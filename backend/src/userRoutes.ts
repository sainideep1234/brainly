import { Router, type Response, type Request } from "express";

const userRouter = Router();

userRouter.post("/signin", (req: Request, res: Response) => {});

userRouter.post("/signup", (req: Request, res: Response) => {});

export default userRouter;
