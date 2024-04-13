import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, CategoryDocument } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { ObjectID } from 'mongodb';

// Xử lý logic nên phải có async để lấy đúng res, không sẽ trả về Promise
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async createCategories(data: CreateCategoryDTO): Promise<Category> {
    return await this.categoryModel.create(data);
  }

  async getCategoryById(id: ObjectID): Promise<Category> {
    const foundCategory = await this.categoryModel.findById(id);
    if (!foundCategory) throw new NotFoundException('Category Not Found');
    return foundCategory;
  }

  async updateCategoryById(
    id: ObjectID,
    data: UpdateCategoryDTO,
  ): Promise<Category> {
    const foundCategory = await this.categoryModel.findById(id);
    if (!foundCategory) throw new NotFoundException('Category Not Found');
    foundCategory.name = data.name;
    return await foundCategory.save();
  }
}
