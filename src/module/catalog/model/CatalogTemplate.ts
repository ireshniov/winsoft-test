import { FieldEnum } from '../interface/FieldEnum';
import { index, ModelOptions, pre, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

@ModelOptions({ schemaOptions: { _id: false } })
export class CatalogTemplateField {
  @prop({ type: () => String, required: true })
  name: string;

  @prop({ type: () => String, enum: FieldEnum, required: true, _id: false })
  type: FieldEnum;
}

@ModelOptions({ schemaOptions: { _id: false } })
export class CatalogTemplateDocument {
  @prop({ type: () => String, required: true })
  name: string;

  @prop({ type: () => [CatalogTemplateField], required: true })
  fields: CatalogTemplateField[];
}

@pre<CatalogTemplate>('validate', function (this: CatalogTemplate, next) {
  this.uuid = this.uuid ?? uuidv4();
  next();
})
@ModelOptions({
  schemaOptions: {
    collection: 'catalog-templates',
    versionKey: false,
    timestamps: false,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  },
})
@index(
  { uuid: 1 },
  {
    name: 'UX_uuid',
    unique: true,
    background: true,
  },
)
export class CatalogTemplate {
  @prop({ type: () => String, required: true })
  uuid: string;

  @prop({ type: () => String, required: true })
  name: string;

  @prop({ type: () => [CatalogTemplateDocument], required: true })
  documents: CatalogTemplateDocument[];
}
