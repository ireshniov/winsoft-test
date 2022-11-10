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
import { CatalogOwnershipGuard } from './guard/CatalogOwnershipGuard';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { MongoMemoryServer } from 'mongodb-memory-server';

const schemaOptions: SchemaOptions = {
  autoCreate: process.env.NODE_ENV === 'development',
  autoIndex: process.env.NODE_ENV === 'development',
};

const mongoOptions: MongooseModuleFactoryOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const catalogModuleMetadata: ModuleMetadata = {
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async (): Promise<MongooseModuleFactoryOptions> => {
        if ('test' !== process.env.NODE_ENV) {
          return {
            uri: process.env.MONGO_URL,
            ...mongoOptions,
          };
        }

        const mongodb: MongoMemoryServer = await MongoMemoryServer.create();
        const uri = mongodb.getUri();

        return {
          ...mongoOptions,
          uri,
          keepConnectionAlive: true,
        };
      },
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
    CatalogOwnershipGuard,
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
