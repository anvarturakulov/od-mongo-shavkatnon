import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocHamir, Hamir } from './models/hamir.model';
import { Model } from 'mongoose';
import { CreateHamirDto } from './dto/hamir.create.dto';

@Injectable()
export class HamirService {
  constructor(
    @InjectModel(Hamir.name) private hamirModel: Model<DocHamir>
  ) { }

  async createHamir(dto: CreateHamirDto): Promise<Hamir> {
    const newHamir = new this.hamirModel(dto);
    return newHamir.save()
  }

  async getAllHamirs(): Promise<Hamir[]> {
    return this.hamirModel.find().exec()
  }

  async getHamirsForDate(date: string): Promise<Hamir[]> {
    
    let dateStartInNumber = Date.parse(date)
    let dateEndInNumber = Date.parse(date) + 86399999

    let hamirs = this.hamirModel.find().exec()
    return (await hamirs).filter((item: Hamir) => {
      return (item.date >= dateStartInNumber && item.date <= dateEndInNumber)
    })
  }

  async findById(id: string) {
    return this.hamirModel.findById(id).exec();
  }

  async setProvodka(id: string) {
    const hamir: CreateHamirDto = await this.hamirModel.findOne({ _id: id })
    if (hamir.proveden) {
      throw new NotFoundException('Проведен булган хамирни узгартириш');
    }
    return this.hamirModel.updateOne({ _id: id }, { $set: { proveden: true } })
  }

  async updateById(id: string, dto: CreateHamirDto) {
    return this.hamirModel.updateOne({ _id: id }, { $set: dto })
  }
}
