import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto } from './dto/contact.dto';
import * as nodemailer from 'nodemailer';
import DOMPurify from 'isomorphic-dompurify';

@Injectable()
export class ContactService {
    private transporter;

    constructor(private prisma: PrismaService) {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.example.com',
            port: parseInt(process.env.SMTP_PORT || '587') || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER || 'user',
                pass: process.env.SMTP_PASS || 'pass',
            },
        });
    }

    async create(dto: CreateContactDto) {
        // 1. Save to DB
        const message = await this.prisma.contactMessage.create({
            data: dto,
        });

        // 2. Send Email with sanitized HTML
        try {
            // Sanitize all user inputs to prevent XSS
            const sanitizedName = DOMPurify.sanitize(dto.name);
            const sanitizedEmail = DOMPurify.sanitize(dto.email);
            const sanitizedMessage = DOMPurify.sanitize(dto.message);

            await this.transporter.sendMail({
                from: '"Buruuj System" <no-reply@buruuj.com>',
                to: process.env.CONTACT_EMAIL || 'info@buruuj.com',
                subject: `New Contact Message: ${dto.subject}`,
                text: `From: ${dto.name} (${dto.email})\n\nMessage:\n${dto.message}`,
                html: DOMPurify.sanitize(`<p><strong>From:</strong> ${sanitizedName} (${sanitizedEmail})</p><p><strong>Message:</strong><br>${sanitizedMessage}</p>`),
            });
        } catch (error) {
            console.error('Failed to send email:', error);
            // Optionally throw error or just log it
        }

        return message;
    }

    async findAll() {
        return this.prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.contactMessage.findUnique({ where: { id } });
    }
}
