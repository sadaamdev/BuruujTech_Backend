import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
    private supabase: SupabaseClient;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.warn('Supabase credentials not found in environment variables');
        }

        this.supabase = createClient(supabaseUrl || '', supabaseKey || '');
    }

    async uploadImage(file: Express.Multer.File): Promise<{ url: string }> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        try {
            // 1. Optimize image (resize to max 1920px width, uncompressed png/jpg to webp)
            const optimizedBuffer = await sharp(file.buffer)
                .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();

            // 2. Generate unique filename
            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
            const filePath = `uploads/${filename}`;

            // 3. Upload to Supabase
            const { data, error } = await this.supabase.storage
                .from('buruuj-images')
                .upload(filePath, optimizedBuffer, {
                    contentType: 'image/webp',
                    upsert: false,
                });

            if (error) {
                throw new Error(`Supabase upload error: ${error.message}`);
            }

            // 4. Get public URL
            const { data: { publicUrl } } = this.supabase.storage
                .from('buruuj-images')
                .getPublicUrl(filePath);

            return { url: publicUrl };
        } catch (error) {
            console.error('Upload error:', error);
            throw new BadRequestException('Failed to upload image');
        }
    }
}
