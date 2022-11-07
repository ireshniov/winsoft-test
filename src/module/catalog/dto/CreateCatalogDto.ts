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

export class CreateCatalogFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FieldEnum)
  @IsNotEmpty()
  type: FieldEnum;

  @IsString()
  @IsNotEmpty()
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
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateCatalogDocumentDto)
  documents: CreateCatalogDocumentDto[];
}
