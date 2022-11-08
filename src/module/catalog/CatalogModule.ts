import { Module, ModuleMetadata } from '@nestjs/common';
import { CatalogTemplateService } from './service/CatalogTemplateService';
import { CatalogTemplateByUuidPipe } from './pipe/CatalogTemplateByUuidPipe';
import { CatalogTemplateController } from './controller/CatalogTemplateController';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogTemplateRepository } from './repository/CatalogTemplateRepository';
import { CatalogTemplate } from './model/CatalogTemplate';
import { buildSchema } from '@typegoose/typegoose';
import { CatalogController } from './controller/CatalogController';
import { CatalogRepository } from './repository/CatalogRepository';
import { CatalogByUuidPipe } from './pipe/CatalogByUuidPipe';
import { CatalogService } from './service/CatalogService';
import { CatalogValidationPipe } from './pipe/CatalogValidationPipe';
import { Catalog } from './model/Catalog';
import { SchemaOptions } from 'mongoose';
import { AuthModule } from '../auth/AuthModule';

const schemaOptions: SchemaOptions = {
  autoCreate: process.env.NODE_ENV === 'development',
  autoIndex: process.env.NODE_ENV === 'development',
};

export const catalogModuleMetadata: ModuleMetadata = {
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      {
        name: CatalogTemplate.name,
        schema: buildSchema(CatalogTemplate, schemaOptions),
      },
      {
        name: Catalog.name,
        schema: buildSchema(Catalog, schemaOptions),
      },
    ]),
  ],
  controllers: [CatalogTemplateController, CatalogController],
  providers: [
    CatalogTemplateRepository,
    CatalogRepository,
    CatalogTemplateByUuidPipe,
    CatalogByUuidPipe,
    CatalogValidationPipe,
    CatalogTemplateService,
    CatalogService,
  ],
};

@Module(catalogModuleMetadata)
export class CatalogModule {}
