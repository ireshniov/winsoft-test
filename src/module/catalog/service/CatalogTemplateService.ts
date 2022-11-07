import { Injectable } from '@nestjs/common';
import { CreateCatalogTemplateDto } from '../dto/CreateCatalogTemplateDto';
import { CatalogTemplateRepository } from '../repository/CatalogTemplateRepository';
import { CatalogTemplate } from '../model/CatalogTemplate';
import { DocumentType } from '@typegoose/typegoose';
import { UpdateCatalogTemplateDto } from '../dto/UpdateCatalogTemplateDto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CatalogTemplateService {
  constructor(
    private readonly catalogTemplateRepository: CatalogTemplateRepository,
  ) {}

  async create(
    catalogTemplate: CreateCatalogTemplateDto,
  ): Promise<DocumentType<CatalogTemplate>> {
    const catalogTemplateToCreate: CatalogTemplate = plainToInstance(
      CatalogTemplate,
      catalogTemplate,
      {
        ignoreDecorators: true,
      },
    );

    return this.catalogTemplateRepository.save(catalogTemplateToCreate);
  }

  async update(
    catalogTemplate: DocumentType<CatalogTemplate>,
    data: UpdateCatalogTemplateDto,
  ) {
    const updateCatalogTemplate: CatalogTemplate = plainToInstance(
      CatalogTemplate,
      data,
      { ignoreDecorators: true },
    );
    for (const [key, value] of Object.entries(updateCatalogTemplate)) {
      catalogTemplate[key] = value;
    }

    return this.catalogTemplateRepository.save(catalogTemplate);
  }

  async delete(catalogTemplate: DocumentType<CatalogTemplate>): Promise<void> {
    return this.catalogTemplateRepository.delete(catalogTemplate);
  }
}
