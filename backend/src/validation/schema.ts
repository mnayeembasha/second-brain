import { boolean, z } from "zod";

export const validateSignUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(10, "Name must be at most 10 characters long")
    .regex(/^[a-zA-Z]+$/, "Name can only contain letters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[a-z]/, "Password must have at least one lowercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must have at least one special character (@, $, !, %, *, ?, &)"
    ),
});

export const validateSignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[a-z]/, "Password must have at least one lowercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must have at least one special character (@, $, !, %, *, ?, &)"
    ),
});

export const ContentType = {
  NOTES: "notes",
  TWEET: "tweet",
  YOUTUBE: "youtube",
  LINK: "link",
} as const;

export const validateContentSchema = z.object({
  link: z.string().url("Link must be a valid URL").min(1, "Link is required"),
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  type: z.nativeEnum(ContentType, { errorMap: () => ({ message: "Invalid content type" }) }),
  tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid tag ID")).optional(),
});

export const validateShareBrainRequest = z.object({
  share:z.boolean({ errorMap: () => ({ message: "Invalid request body || Cant share the brain" }) }),
});
export type SignUpRequestBody = z.infer<typeof validateSignUpSchema>;
export type SignInRequestBody = z.infer<typeof validateSignInSchema>;
export type ContentRequestBody = z.infer<typeof validateContentSchema>;
export type ShareBrainRequestBody = z.infer<typeof validateShareBrainRequest>;
