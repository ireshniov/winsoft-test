import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { getValidationPipeOf } from '../../common/pipe/ValidationPipe';
import { DocumentType } from '@typegoose/typegoose';
import { CreateCatalogDto } from '../dto/CreateCatalogDto';
import { Catalog } from '../model/Catalog';
import { CatalogService } from '../service/CatalogService';
import { CatalogValidationPipe } from '../pipe/CatalogValidationPipe';
import { CatalogByUuidPipe } from '../pipe/CatalogByUuidPipe';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('uuid', CatalogByUuidPipe)
    catalog: DocumentType<Catalog>,
  ): Promise<DocumentType<Catalog>> {
    return catalog;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(getValidationPipeOf(CreateCatalogDto), CatalogValidationPipe)
    dto: CreateCatalogDto,
  ): Promise<DocumentType<Catalog>> {
    return this.catalogService.create(dto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', CatalogByUuidPipe)
    catalog: DocumentType<Catalog>,
  ): Promise<void> {
    return this.catalogService.delete(catalog);
  }
}
