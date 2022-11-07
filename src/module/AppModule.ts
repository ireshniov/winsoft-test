import { Module, ModuleMetadata } from '@nestjs/common';
import { CatalogModule } from './catalog/CatalogModule';

export const appModuleMetadata: ModuleMetadata = {
  imports: [CatalogModule],
};

@Module(appModuleMetadata)
export class AppModule {}
