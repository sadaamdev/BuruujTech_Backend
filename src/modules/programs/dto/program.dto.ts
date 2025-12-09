import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateProgramSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    shortDescription: z.string(),
    fullDescription: z.string(),
    requirements: z.array(z.string()).default([]),
    image: z.string().optional(),
});

export class CreateProgramDto extends createZodDto(CreateProgramSchema) { }

export const UpdateProgramSchema = CreateProgramSchema.partial();
export class UpdateProgramDto extends createZodDto(UpdateProgramSchema) { }
