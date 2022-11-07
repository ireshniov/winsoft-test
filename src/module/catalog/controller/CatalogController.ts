import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { getValidationPipeOf } from '../../common/pipe/ValidationPipe';
import { DocumentType } from '@typegoose/typegoose';
import { CreateCatalogDto } from '../dto/CreateCatalogDto';
import { Catalog } from '../model/Catalog';
import { CatalogService } from '../service/CatalogService';
import { CatalogValidationPipe } from '../pipe/CatalogValidationPipe';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(getValidationPipeOf(CreateCatalogDto), CatalogValidationPipe)
    dto: CreateCatalogDto,
  ): Promise<DocumentType<Catalog>> {
    return this.catalogService.create(dto);
  }
}
