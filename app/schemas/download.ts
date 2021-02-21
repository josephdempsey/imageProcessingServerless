import * as z from 'zod';

export const downloadPayloadSchema = z.object({
  fileName: z.string(),
});

export const downloadPayloadSchema2 = z.object({
  fileName: z.string(),
  ext: z.enum(['png', 'jpeg', 'tiff']), // Limited for now but sharp offers much more conversion types
});

export type downloadPayloadSchemaType = z.infer<typeof downloadPayloadSchema>;
export type downloadPayloadSchemaType2 = z.infer<typeof downloadPayloadSchema2>;
