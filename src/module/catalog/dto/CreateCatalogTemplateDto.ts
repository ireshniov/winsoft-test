import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FieldEnum } from '../interface/FieldEnum';

export class CreateCatalogTemplateFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FieldEnum)
  @IsNotEmpty()
  type: FieldEnum;
}

export class CreateCatalogTemplateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateCatalogTemplateFieldDto)
  fields: CreateCatalogTemplateFieldDto[];
}

export class CreateCatalogTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateCatalogTemplateDocumentDto)
  documents: CreateCatalogTemplateDocumentDto[];
}
