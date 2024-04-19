import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty()
  name: string;

  //slug sẽ tự tạo sau name
  slug: string;
}

export class UpdateCategoryDTO {
  @IsNotEmpty()
  name: string;

  //slug sẽ tự tạo sau name
  slug: string;
}
