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

export class UpdateCatalogTemplateFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FieldEnum)
  @IsNotEmpty()
  type: FieldEnum;
}

export class UpdateCatalogTemplateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UpdateCatalogTemplateFieldDto)
  fields: UpdateCatalogTemplateFieldDto[];
}

export class UpdateCatalogTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UpdateCatalogTemplateDocumentDto)
  documents: UpdateCatalogTemplateDocumentDto[];
}
