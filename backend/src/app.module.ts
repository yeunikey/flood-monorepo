import { AuthModule } from './auth/auth.module';
import { Catalog } from './data/entities/catalog.entity';
import { Category } from './data/entities/category.entity';
import { DataModule } from './data/data.module';
import { DataSource } from './data/entities/data_source.entity';
import { DataValue } from './data/entities/data_value.entity';
import { File } from './file/entities/file.entity';
import { FileModule } from './file/file.module';
import { Image } from './image/entities/image.entity';
import { ImageModule } from './image/image.module';
import { Layer } from './layers/entities/layer.entity';
import { LayerModule } from './layers/layer.module';
import { MailModule } from './mailer/mail.module';
import { MethodType } from './data/entities/method_type.entity';
import { Module } from '@nestjs/common';
import { Qcl } from './data/entities/qcl.entity';
import { Site } from './data/entities/site';
import { SiteType } from './data/entities/site_type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './data/entities/unit.entity';
import { User } from './users/models/user.entity';
import { UserModule } from './users/user.module';
import { Variable } from './data/entities/variable.entity';

@Module({
  imports: [

    UserModule,
    MailModule,
    AuthModule,
    ImageModule,
    FileModule,
    LayerModule,
    DataModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'flood',
      entities: [
        User,
        Image,
        Site,
        SiteType,
        File,
        Layer,
        Catalog,
        Category,
        DataSource,
        DataValue,
        MethodType,
        Qcl,
        SiteType,
        Site,
        Unit,
        Variable
      ],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
