import { z } from "zod";

export const severityEnum = z.enum(["Low", "Moderate", "High", "Critical"]);

export const reportSchema = z.object({
  what: z.string().min(1, "What happened is required"),
  where: z.string().min(1, "Where it occurred is required"),
  severity: severityEnum,
  when: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "Invalid date",
  }),
});

export type ReportForm = z.infer<typeof reportSchema>;
