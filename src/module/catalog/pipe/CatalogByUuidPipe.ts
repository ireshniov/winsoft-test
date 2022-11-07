import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { Catalog } from '../model/Catalog';
import { CatalogRepository } from '../repository/CatalogRepository';

@Injectable()
export class CatalogByUuidPipe
  implements PipeTransform<string, Promise<DocumentType<Catalog>>>
{
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async transform(uuid: string): Promise<DocumentType<Catalog>> {
    const catalog = await this.catalogRepository.findOneByUuid(uuid);

    if (!catalog) {
      throw new NotFoundException('Catalog not found');
    }

    return catalog;
  }
}
