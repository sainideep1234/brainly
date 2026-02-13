import { password } from "bun";
import { NewLineKind } from "typescript";
import z from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const AddContent = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string().optional(),
  tags: z.array(z.string()),
  type: z.enum(["youtube", "document", "twitter"]),
});
