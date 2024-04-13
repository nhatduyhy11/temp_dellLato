import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

// Controller không cần viết xử lý mà chỉ dùng để chỉ đúng đường dẫn đến service
@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Post()
  createCategories(@Body() data: CreateCategoryDTO) {
    return this.categoryService.createCategories(data);
  }

  @Get('/:id')
  getCategoryById(@Param('id') id) {
    return this.categoryService.getCategoryById(id);
  }

  @Patch('/:id')
  updateCategoryById(@Param('id') id, @Body() data: UpdateCategoryDTO) {
    return this.categoryService.updateCategoryById(id, data);
  }
}
