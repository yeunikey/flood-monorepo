import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { MailModule } from './mailer/mail.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { Image } from './image/entities/image.entity';
import { User } from './users/models/user.entity';
import { SiteModule } from './site/site.module';
import { Site } from './site/models/site';
import { SiteType } from './site/models/site_type';
import { File } from './file/entities/file.entity';
import { FileModule } from './file/file.module';
import { LayerModule } from './layers/layer.module';
import { Layer } from './layers/entities/layer.entity';

@Module({
  imports: [

    UserModule,
    MailModule,
    AuthModule,
    ImageModule,
    SiteModule,
    FileModule,
    LayerModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.89.141.175',
      port: 2025,
      username: 'yeunikey',
      password: 'Yerassyl0107',
      database: 'new-flood',
      entities: [User, Image, Site, SiteType, File, Layer],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
