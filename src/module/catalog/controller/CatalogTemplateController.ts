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
  UseGuards,
} from '@nestjs/common';
import { getValidationPipeOf } from '../../common/pipe/ValidationPipe';
import { CatalogTemplateService } from '../service/CatalogTemplateService';
import { CreateCatalogTemplateDto } from '../dto/CreateCatalogTemplateDto';
import { CatalogTemplate } from '../model/CatalogTemplate';
import { CatalogTemplateByUuidPipe } from '../pipe/CatalogTemplateByUuidPipe';
import { DocumentType } from '@typegoose/typegoose';
import { UpdateCatalogTemplateDto } from '../dto/UpdateCatalogTemplateDto';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../../auth/decorator/Permissions';
import { PermissionsGuard } from '../../auth/guard/PermissionsGuard';
import { PermissionEnum } from '../interface/PermissionEnum';

@Controller('catalog-templates')
export class CatalogTemplateController {
  constructor(
    private readonly catalogTemplateService: CatalogTemplateService,
  ) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':uuid')
  @Permissions(PermissionEnum.READ_CATALOG_TEMPLATE)
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('uuid', CatalogTemplateByUuidPipe)
    catalogTemplate: DocumentType<CatalogTemplate>,
  ): Promise<DocumentType<CatalogTemplate>> {
    return catalogTemplate;
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions(PermissionEnum.CREATE_CATALOG_TEMPLATE)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(getValidationPipeOf(CreateCatalogTemplateDto))
    dto: CreateCatalogTemplateDto,
  ): Promise<DocumentType<CatalogTemplate>> {
    return this.catalogTemplateService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Put(':uuid')
  @Permissions(PermissionEnum.UPDATE_CATALOG_TEMPLATE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', CatalogTemplateByUuidPipe)
    catalogTemplate: DocumentType<CatalogTemplate>,
    @Body(getValidationPipeOf(UpdateCatalogTemplateDto))
    dto: UpdateCatalogTemplateDto,
  ): Promise<DocumentType<CatalogTemplate>> {
    return this.catalogTemplateService.update(catalogTemplate, dto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':uuid')
  @Permissions(PermissionEnum.DELETE_CATALOG_TEMPLATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', CatalogTemplateByUuidPipe)
    catalogTemplate: DocumentType<CatalogTemplate>,
  ): Promise<void> {
    return this.catalogTemplateService.delete(catalogTemplate);
  }
}
