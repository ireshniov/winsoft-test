import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { Catalog } from '../model/Catalog';

@Injectable()
export class CatalogRepository {
  constructor(
    @InjectModel(Catalog.name)
    private readonly model: ReturnModelType<typeof Catalog>,
  ) {}

  async findOneByUuid(uuid: string): Promise<DocumentType<Catalog> | null> {
    return this.model.findOne({ uuid });
  }

  async isUserOwns(userId: string, uuid: string): Promise<boolean> {
    return (await this.model.count({ userId, uuid })) === 1;
  }

  async save(catalog: Partial<Catalog>): Promise<DocumentType<Catalog>> {
    const doc: DocumentType<Catalog> = new this.model(catalog);
    return await doc.save();
  }

  async upsertByUuid(
    uuid: string,
    catalog: Partial<Catalog>,
  ): Promise<DocumentType<Catalog>> {
    return this.model.findOneAndUpdate({ uuid }, catalog, {
      new: true,
      upsert: true,
    });
  }

  async delete(doc: DocumentType<Catalog>): Promise<void> {
    await doc.remove();
  }

  async deleteByUuid(uuid: string): Promise<void> {
    await this.model.findOneAndRemove({ uuid });
  }
}
