import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { getValidationPipeOf } from '../../common/pipe/ValidationPipe';
import { CatalogTemplateService } from '../service/CatalogTemplateService';
import { CreateCatalogTemplateDto } from '../dto/CreateCatalogTemplateDto';
import { CatalogTemplate } from '../model/CatalogTemplate';
import { CatalogTemplateByUuidPipe } from '../pipe/CatalogTemplateByUuidPipe';
import { DocumentType } from '@typegoose/typegoose';
import { UpdateCatalogTemplateDto } from '../dto/UpdateCatalogTemplateDto';

@Controller('catalog-templates')
export class CatalogTemplateController {
  constructor(
    private readonly catalogTemplateService: CatalogTemplateService,
  ) {}

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('uuid', CatalogTemplateByUuidPipe)
    catalogTemplate: DocumentType<CatalogTemplate>,
  ): Promise<DocumentType<CatalogTemplate>> {
    return catalogTemplate;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(getValidationPipeOf(CreateCatalogTemplateDto))
    dto: CreateCatalogTemplateDto,
  ): Promise<DocumentType<CatalogTemplate>> {
    return this.catalogTemplateService.create(dto);
  }

  @Put(':uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', CatalogTemplateByUuidPipe)
    catalogTemplate: DocumentType<CatalogTemplate>,
    @Body(getValidationPipeOf(UpdateCatalogTemplateDto))
    dto: UpdateCatalogTemplateDto,
  ): Promise<CatalogTemplate> {
    return this.catalogTemplateService.update(catalogTemplate, dto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', CatalogTemplateByUuidPipe)
    catalogTemplate: DocumentType<CatalogTemplate>,
  ): Promise<void> {
    return this.catalogTemplateService.delete(catalogTemplate);
  }
}