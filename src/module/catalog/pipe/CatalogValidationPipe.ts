import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateCatalogDto } from '../dto/CreateCatalogDto';
import { ValidationError } from 'class-validator';
import { FieldValidator } from '../validator/FieldValidator';

@Injectable()
export class CatalogValidationPipe
  implements PipeTransform<CreateCatalogDto, Promise<CreateCatalogDto>>
{
  async transform(dto: CreateCatalogDto): Promise<CreateCatalogDto> {
    const errors: ValidationError[] = [];

    for (const document of dto.documents) {
      const children: ValidationError[] = [];

      for (const { name, type, value } of document.fields) {
        const constraints: Record<string, string> =
          FieldValidator.validateValueType(name, type, value);

        if (Object.keys(constraints).length) {
          children.push({
            property: name,
            value,
            constraints,
            children: [],
          });
        }
      }

      if (children.length) {
        errors.push({
          property: document.name,
          constraints: {},
          children,
        });
      }
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return dto;
  }
}
