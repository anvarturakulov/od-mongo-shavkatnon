import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
  return {
    // uri: getMongoString(configService),
    uri: 'mongodb + srv://anvar:SWSMFL5TDk3Jq9xg@cluster0.uoe1t.mongodb.net/?retryWrites=true&w=majority',
    // uri: 'mongodb://localhost:27017',
    ...getMongoOptions()
  };
}; 

const getMongoString = (configService: ConfigService) => 
  'mongodb://'+
  configService.get('MONGO_LOGIN')+
  ':'+
  configService.get('MONGO_PASSWORD')+
  '@'+
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT');
  // '/'+
  // configService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})