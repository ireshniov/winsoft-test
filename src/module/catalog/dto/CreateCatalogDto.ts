import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCatalogFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  value: string;
}

export class CreateCatalogDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateCatalogFieldDto)
  fields: CreateCatalogFieldDto[];
}

export class CreateCatalogDto {
  @IsUUID(4)
  @IsNotEmpty()
  catalogTemplateUuid: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateCatalogDocumentDto)
  documents: CreateCatalogDocumentDto[];
}
