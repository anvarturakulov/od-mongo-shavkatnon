import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reference, ReferenceDocument, TypeReference } from './models/referense.model';
import { Model } from 'mongoose';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { REFERENCE_NOT_FOUND_ERROR } from './reference.constants';

@Injectable()
export class ReferenceService {
  constructor(@InjectModel(Reference.name) private referenceModel: Model<ReferenceDocument>) { }

  async createReference(dto: CreateReferenceDto): Promise<Reference> {
    const newReference = new this.referenceModel(dto);
    return newReference.save()
  }

  async getByTypeReference(typeReference: TypeReference): Promise<Reference[]> {
    return this.referenceModel.find({ typeReference }).exec()
  }

  async findById(id: string) {
    return this.referenceModel.findById(id).exec();
  }

  async markToDelete(id: string) {
    // db.movies.findOne({ _id: ObjectId("1") }) - найти фильмы по переданному "id"
    // db.movies.updateOne({ _id: ObjectId('1') }, { $set: { rating: 10, year: 1995 } }) - обновить фильм с переданным id, обновляются поля "rating" И "year"
    const reference: CreateReferenceDto = await this.referenceModel.findOne({_id: id})
    console.log(' ref deleted ',reference.deleted+'  '+reference.name);
    if (!reference.name) {
      throw new NotFoundException(REFERENCE_NOT_FOUND_ERROR);
    }
    const state = reference.deleted ? false : true
    return this.referenceModel.updateOne({ _id: id }, { $set: { deleted: state} })
  }
}
