import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateNewsSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    content: z.string().min(1),
    excerpt: z.string(),
    image: z.string().optional(),
    published: z.boolean().default(false),
});

export class CreateNewsDto extends createZodDto(CreateNewsSchema) { }

export const UpdateNewsSchema = CreateNewsSchema.partial();
export class UpdateNewsDto extends createZodDto(UpdateNewsSchema) { }
