import { z } from "zod";

export const AIFeedbackSchema = z.object({
    score: z.number().min(0).max(10),
    strengths: z.string(),
    improvements: z.string(),
});

export type AIFeedback = z.infer<typeof AIFeedbackSchema>;