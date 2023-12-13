import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';

@Controller('review')
export class ReviewController {

  constructor(private readonly reviewService: ReviewService) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    this.reviewService.createReview(dto)
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deleteDoc = await this.reviewService.delete(id)
    if (!deleteDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProductId(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.findByProductId(productId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllReviews(@UserEmail() email: string) {
    console.log(email);
    return this.reviewService.getAllReviews()
  }
}
