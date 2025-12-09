import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramsModule } from './modules/programs/programs.module';
import { NewsModule } from './modules/news/news.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { PartnersModule } from './modules/partners/partners.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { UploadModule } from './modules/upload/upload.module';
import { UtilsModule } from './modules/utils/utils.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ProgramsModule,
    NewsModule,
    GalleryModule,
    PartnersModule,
    ContactModule,
    AuthModule,
    AuthModule,
    UploadModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule { }
