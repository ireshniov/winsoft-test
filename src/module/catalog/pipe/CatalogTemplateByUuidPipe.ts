import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { CatalogTemplateRepository } from '../repository/CatalogTemplateRepository';
import { CatalogTemplate } from '../model/CatalogTemplate';
import { DocumentType } from '@typegoose/typegoose';

@Injectable()
export class CatalogTemplateByUuidPipe
  implements PipeTransform<string, Promise<DocumentType<CatalogTemplate>>>
{
  constructor(
    private readonly catalogTemplateRepository: CatalogTemplateRepository,
  ) {}

  async transform(uuid: string): Promise<DocumentType<CatalogTemplate>> {
    const catalogTemplate = await this.catalogTemplateRepository.findOneByUuid(
      uuid,
    );

    if (!catalogTemplate) {
      throw new NotFoundException('Catalog template not found');
    }

    return catalogTemplate;
  }
}
