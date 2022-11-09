import {
  BadRequestException,
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
import { DocumentType } from '@typegoose/typegoose';
import { CreateCatalogDto } from '../dto/CreateCatalogDto';
import { Catalog, CatalogDocument } from '../model/Catalog';
import { CatalogService } from '../service/CatalogService';
import { CatalogValidationPipe } from '../pipe/CatalogValidationPipe';
import { CatalogByUuidPipe } from '../pipe/CatalogByUuidPipe';
import { AuthGuard } from '@nestjs/passport';
import {
  VerificationCatalogDocumentDto,
  VerificationCatalogDto,
} from '../dto/VerificationCatalogDocumentDto';
import { DocumentStatusEnum } from '../interface/DocumentStatusEnum';
import * as _ from 'lodash';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('uuid', CatalogByUuidPipe)
    catalog: DocumentType<Catalog>,
  ): Promise<DocumentType<Catalog>> {
    return catalog;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(getValidationPipeOf(CreateCatalogDto), CatalogValidationPipe)
    dto: CreateCatalogDto,
  ): Promise<DocumentType<Catalog>> {
    return this.catalogService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':uuid/verification')
  @HttpCode(HttpStatus.OK)
  async verification(
    @Param('uuid', CatalogByUuidPipe) catalog: DocumentType<Catalog>,
    @Body(getValidationPipeOf(VerificationCatalogDto))
    dto: VerificationCatalogDto,
  ): Promise<DocumentType<Catalog>> {
    this.validateVerification(catalog, dto);

    const uuids: Record<string, DocumentStatusEnum> = dto.documents.reduce(
      (result: Record<string, DocumentStatusEnum>, { uuid, status }) => {
        result[uuid] = status;
        return result;
      },
      {},
    );

    return this.catalogService.verification(catalog, uuids);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', CatalogByUuidPipe)
    catalog: DocumentType<Catalog>,
  ): Promise<void> {
    return this.catalogService.delete(catalog);
  }

  // @todo move it somewhere in pipe (combine body and params in custom decorator)
  private validateVerification(
    catalog: DocumentType<Catalog>,
    dto: VerificationCatalogDto,
  ): void {
    const uuids: string[] = dto.documents.map(
      (value: VerificationCatalogDocumentDto) => value.uuid,
    );

    const catalogDocumentUuids: string[] = catalog.documents.map(
      (value: CatalogDocument) => value.uuid,
    );

    const diff: string[] = _.difference<string>(uuids, catalogDocumentUuids);

    if (diff.length) {
      throw new BadRequestException(
        `Documents with uuids (${uuids.join(',')}) not exists in catalog ${
          catalog.name
        }`,
      );
    }
  }
}
