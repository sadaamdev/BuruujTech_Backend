import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateContactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1),
});

export class CreateContactDto extends createZodDto(CreateContactSchema) { }
