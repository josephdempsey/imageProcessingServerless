import * as z from 'zod';

export const uploadPayloadSchema = z.object({
  imageBase64: z.string(),
  name: z.string(),
});

export type uploadPayloadSchemaType = z.infer<typeof uploadPayloadSchema>;
