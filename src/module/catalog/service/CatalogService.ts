import { Injectable } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { plainToInstance } from 'class-transformer';
import { Catalog, CatalogDocument } from '../model/Catalog';
import { CreateCatalogDto } from '../dto/CreateCatalogDto';
import { CatalogRepository } from '../repository/CatalogRepository';
import { DocumentStatusEnum } from '../interface/DocumentStatusEnum';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async create(catalog: CreateCatalogDto): Promise<DocumentType<Catalog>> {
    const catalogToCreate: Catalog = plainToInstance(Catalog, catalog, {
      ignoreDecorators: true,
    });

    return this.catalogRepository.save(catalogToCreate);
  }

  async verification(
    catalog: DocumentType<Catalog>,
    uuids: Record<string, DocumentStatusEnum>,
  ): Promise<DocumentType<Catalog>> {
    catalog.documents = catalog.documents.map((value: CatalogDocument) =>
      Object.keys(uuids).includes(value.uuid)
        ? { ...value, status: uuids[value.uuid] }
        : value,
    );

    return this.catalogRepository.save(catalog);
  }

  async delete(catalog: DocumentType<Catalog>): Promise<void> {
    return this.catalogRepository.delete(catalog);
  }
}
