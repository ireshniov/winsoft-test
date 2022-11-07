import { Module, ModuleMetadata } from '@nestjs/common';
import { CatalogTemplateService } from './service/CatalogTemplateService';
import { CatalogTemplateByUuidPipe } from './pipe/CatalogTemplateByUuidPipe';
import { CatalogTemplateController } from './controller/CatalogTemplateController';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogTemplateRepository } from './repository/CatalogTemplateRepository';
import { CatalogTemplate } from './model/CatalogTemplate';
import { buildSchema } from '@typegoose/typegoose';

export const catalogModuleMetadata: ModuleMetadata = {
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      {
        name: CatalogTemplate.name,
        schema: buildSchema(CatalogTemplate),
      },
    ]),
  ],
  controllers: [CatalogTemplateController],
  providers: [
    CatalogTemplateRepository,
    CatalogTemplateByUuidPipe,
    CatalogTemplateService,
  ],
};

@Module(catalogModuleMetadata)
export class CatalogModule {}
