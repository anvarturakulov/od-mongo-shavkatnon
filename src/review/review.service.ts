import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './models/review.model';
import { Model, Types, Schema } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor( @InjectModel(Review.name) private reviewModel: Model<ReviewDocument> ) {}

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const newReview = new this.reviewModel(dto);
    return newReview.save()
  }

  async delete( id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId: new Schema.Types.ObjectId(productId)}).exec()
  }

  async getAllReviews() {
    return this.reviewModel.find()
  }
}
