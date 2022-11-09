import { index, ModelOptions, pre, prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { DocumentStatusEnum } from '../interface/DocumentStatusEnum';
import { FieldEnum } from '../interface/FieldEnum';

@ModelOptions({ schemaOptions: { _id: false } })
export class CatalogField {
  @prop({ type: () => String, required: true })
  name: string;

  @prop({ type: () => String, enum: FieldEnum, required: true })
  type: FieldEnum;

  @prop({ type: () => String })
  value: string;
}

@pre<CatalogDocument>('validate', function (this: CatalogDocument, next) {
  this.uuid = this.uuid ?? uuidv4();
  next();
})
@ModelOptions({ schemaOptions: { _id: false } })
export class CatalogDocument {
  @prop({ type: () => String, required: true })
  name: string;

  @prop({ type: () => [CatalogField], required: true })
  fields: CatalogField[];

  @prop({ type: () => String, required: true })
  uuid: string;

  @prop({
    type: () => String,
    enum: DocumentStatusEnum,
    required: true,
    default: DocumentStatusEnum.PENDING,
  })
  status: DocumentStatusEnum;
}

@pre<Catalog>('validate', function (this: Catalog, next) {
  this.uuid = this.uuid ?? uuidv4();
  next();
})
@ModelOptions({
  schemaOptions: {
    collection: 'catalogs',
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
export class Catalog {
  @prop({ type: () => String, required: true })
  uuid: string;

  @prop({ type: () => String, required: true })
  name: string;

  @prop({ type: () => String, required: true })
  userId: string;

  @prop({ type: () => [CatalogDocument], required: true })
  documents: CatalogDocument[];
}
