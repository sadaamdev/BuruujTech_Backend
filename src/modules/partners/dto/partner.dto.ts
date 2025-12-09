import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePartnerSchema = z.object({
    name: z.string().min(1),
    logoUrl: z.string().url(),
    website: z.string().optional(),
});

export class CreatePartnerDto extends createZodDto(CreatePartnerSchema) { }
export const UpdatePartnerSchema = CreatePartnerSchema.partial();
export class UpdatePartnerDto extends createZodDto(UpdatePartnerSchema) { }
