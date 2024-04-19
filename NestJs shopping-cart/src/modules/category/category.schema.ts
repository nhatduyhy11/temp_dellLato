import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { cleanAccents } from 'src/utils/handle-string';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

//Class Decorator
@Schema({
  timestamps: true,
})
export class Category {
  @Prop()
  name: string;

  @Prop()
  slug: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', function() {
  // const cate: any = this;

  _.get(this, 'name');

  // C1:
  // const slug = cleanAccents(cate.name)
  //   .toLowerCase()
  //   .split(' ')
  //   .join('-');
  // console.log(slug);

  //C2: lodash
  const slug = _.chain(this)
    .get('name')
    .thru(name => cleanAccents(name))
    .toLower()
    .split(' ')
    .concat(Date.now())
    .join('-')
    .value();
  //this.slug = slug
  _.set(this, 'slug', slug);
});

export { CategorySchema };
