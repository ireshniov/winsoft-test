import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { CatalogTemplate } from '../model/CatalogTemplate';

@Injectable()
export class CatalogTemplateRepository {
  constructor(
    @InjectModel(CatalogTemplate.name)
    private readonly model: ReturnModelType<typeof CatalogTemplate>,
  ) {}

  async findOneByUuid(
    uuid: string,
  ): Promise<DocumentType<CatalogTemplate> | null> {
    return this.model.findOne({ uuid });
  }

  async save(
    catalogTemplate: Partial<CatalogTemplate>,
  ): Promise<DocumentType<CatalogTemplate>> {
    const doc: DocumentType<CatalogTemplate> = new this.model(catalogTemplate);
    return await doc.save();
  }

  async upsertByUuid(
    uuid: string,
    catalogTemplate: Partial<CatalogTemplate>,
  ): Promise<DocumentType<CatalogTemplate>> {
    return this.model.findOneAndUpdate({ uuid }, catalogTemplate, {
      new: true,
      upsert: true,
    });
  }

  async delete(doc: DocumentType<CatalogTemplate>): Promise<void> {
    await doc.remove();
  }

  async deleteByUuid(uuid: string): Promise<void> {
    await this.model.findOneAndRemove({ uuid });
  }
}
