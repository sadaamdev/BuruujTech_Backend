import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateGallerySchema = z.object({
    title: z.string().optional(),
    imageUrl: z.string().url(),
    category: z.string().optional(),
});

export class CreateGalleryDto extends createZodDto(CreateGallerySchema) { }
export const UpdateGallerySchema = CreateGallerySchema.partial();
export class UpdateGalleryDto extends createZodDto(UpdateGallerySchema) { }
