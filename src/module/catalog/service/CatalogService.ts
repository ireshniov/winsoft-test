import { Injectable } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { plainToInstance } from 'class-transformer';
import { Catalog } from '../model/Catalog';
import { CreateCatalogDto } from '../dto/CreateCatalogDto';
import { CatalogRepository } from '../repository/CatalogRepository';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async create(catalog: CreateCatalogDto): Promise<DocumentType<Catalog>> {
    const catalogToCreate: Catalog = plainToInstance(Catalog, catalog, {
      ignoreDecorators: true,
    });

    return this.catalogRepository.save(catalogToCreate);
  }
}
