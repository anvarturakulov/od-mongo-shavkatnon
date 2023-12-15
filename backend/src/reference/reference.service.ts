import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reference, ReferenceDocument, ReferenceType } from './models/referense.model';
import { Model } from 'mongoose';
import { CreateReferenceDto } from './dto/create-reference.dto';

@Injectable()
export class ReferenceService {
  constructor(@InjectModel(Reference.name) private referenceModel: Model<ReferenceDocument>) { }

  async createReference(dto: CreateReferenceDto): Promise<Reference> {
    const newReference = new this.referenceModel(dto);
    return newReference.save()
  }

  async getByTypeReference(referenceType: ReferenceType): Promise<Reference[]> {
    return this.referenceModel.find({ referenceType }).exec()
  }


}
