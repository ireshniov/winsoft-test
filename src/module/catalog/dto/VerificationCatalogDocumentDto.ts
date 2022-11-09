import { DocumentStatusEnum } from '../interface/DocumentStatusEnum';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VerificationCatalogDocumentDto {
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string;

  @IsEnum(DocumentStatusEnum)
  @IsNotEmpty()
  status: DocumentStatusEnum;
}

export class VerificationCatalogDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VerificationCatalogDocumentDto)
  documents: VerificationCatalogDocumentDto[];
}
