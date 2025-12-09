import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@buruujtech.com' },
        update: {},
        create: {
            email: 'admin@buruujtech.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // Create programs
    const programs = await Promise.all([
        prisma.program.upsert({
            where: { slug: 'full-stack-web-development' },
            update: {},
            create: {
                title: 'Full Stack Web Development',
                slug: 'full-stack-web-development',
                shortDescription: 'Master modern web technologies including React, Node.js, and Cloud Computing.',
                fullDescription: 'A comprehensive program covering frontend and backend development with modern frameworks and tools.',
                requirements: ['Basic computer skills', 'High school diploma', 'Laptop with 8GB RAM'],
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            },
        }),
        prisma.program.upsert({
            where: { slug: 'data-science-analytics' },
            update: {},
            create: {
                title: 'Data Science & Analytics',
                slug: 'data-science-analytics',
                shortDescription: 'Learn to analyze data, build ML models, and visualize insights.',
                fullDescription: 'Comprehensive data science program covering Python, machine learning, and data visualization.',
                requirements: ['Basic programming knowledge', 'Mathematics background', 'Personal laptop'],
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            },
        }),
        prisma.program.upsert({
            where: { slug: 'cybersecurity-fundamentals' },
            update: {},
            create: {
                title: 'Cybersecurity Fundamentals',
                slug: 'cybersecurity-fundamentals',
                shortDescription: 'Protect systems and networks from digital attacks.',
                fullDescription: 'Learn the fundamentals of cybersecurity including network security, ethical hacking, and security protocols.',
                requirements: ['Basic IT knowledge', 'Understanding of networks', 'Commitment to ethical practices'],
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
            },
        }),
    ]);
    console.log(`✅ Created ${programs.length} programs`);

    // Create blog posts
    const posts = await Promise.all([
        prisma.blogPost.upsert({
            where: { slug: 'welcome-to-buruuj-tech' },
            update: {},
            create: {
                title: 'Welcome to Buruuj Tech',
                slug: 'welcome-to-buruuj-tech',
                excerpt: 'Introducing our mission to empower the next generation with world-class technology education.',
                content: 'We are excited to announce the launch of Buruuj Tech, a premier educational institution dedicated to providing cutting-edge technology training...',
                published: true,
                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
            },
        }),
        prisma.blogPost.upsert({
            where: { slug: 'new-partnership-announcement' },
            update: {},
            create: {
                title: 'New Partnership with Leading Tech Companies',
                slug: 'new-partnership-announcement',
                excerpt: 'We are proud to announce partnerships with industry leaders to provide real-world experience.',
                content: 'Buruuj Tech has formed strategic partnerships with leading technology companies to ensure our students get hands-on experience...',
                published: true,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
            },
        }),
        prisma.blogPost.upsert({
            where: { slug: 'student-success-stories' },
            update: {},
            create: {
                title: 'Student Success Stories',
                slug: 'student-success-stories',
                excerpt: 'Read about our graduates who have landed amazing jobs in the tech industry.',
                content: 'Our students have gone on to work at top companies including Google, Microsoft, and Amazon. Here are their stories...',
                published: true,
                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
            },
        }),
    ]);
    console.log(`✅ Created ${posts.length} blog posts`);

    // Create gallery items
    const galleryItems = await Promise.all([
        prisma.galleryItem.create({
            data: {
                title: 'Graduation Ceremony 2024',
                imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
                category: 'Events',
            },
        }),
        prisma.galleryItem.create({
            data: {
                title: 'Coding Bootcamp',
                imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
                category: 'Classes',
            },
        }),
        prisma.galleryItem.create({
            data: {
                title: 'Tech Workshop',
                imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
                category: 'Workshops',
            },
        }),
        prisma.galleryItem.create({
            data: {
                title: 'Student Projects Showcase',
                imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
                category: 'Projects',
            },
        }),
        prisma.galleryItem.create({
            data: {
                title: 'Campus Tour',
                imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585',
                category: 'Campus',
            },
        }),
        prisma.galleryItem.create({
            data: {
                title: 'Hackathon 2024',
                imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
                category: 'Events',
            },
        }),
    ]);
    console.log(`✅ Created ${galleryItems.length} gallery items`);

    // Create partners
    const partners = await Promise.all([
        prisma.partner.create({
            data: {
                name: 'Tech Corp',
                logoUrl: 'https://placehold.co/200x80/1E4DD8/FFFFFF?text=TechCorp',
                website: 'https://techcorp.example.com',
            },
        }),
        prisma.partner.create({
            data: {
                name: 'Innovation Labs',
                logoUrl: 'https://placehold.co/200x80/1E4DD8/FFFFFF?text=InnovationLabs',
                website: 'https://innovationlabs.example.com',
            },
        }),
        prisma.partner.create({
            data: {
                name: 'Digital Solutions',
                logoUrl: 'https://placehold.co/200x80/1E4DD8/FFFFFF?text=DigitalSolutions',
                website: 'https://digitalsolutions.example.com',
            },
        }),
        prisma.partner.create({
            data: {
                name: 'Cloud Systems',
                logoUrl: 'https://placehold.co/200x80/1E4DD8/FFFFFF?text=CloudSystems',
                website: 'https://cloudsystems.example.com',
            },
        }),
    ]);
    console.log(`✅ Created ${partners.length} partners`);

    console.log('🎉 Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
