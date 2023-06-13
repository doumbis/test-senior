import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { error } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        
        const result = errors.map(error => {
          const errorMessages: any = {};
          const keys = Object.keys(error.constraints ? error.constraints: {});
          if(keys.length){
            errorMessages[error.property] = error.constraints ? error.constraints[keys[0]] : null;
          }
          return errorMessages;
        });
        let output: any = {};
        for(let i = 0; i < result.length; i++){
          const item = result[i];
          const keys = Object.keys(item);
          output[keys[0]] = item[keys[0]];
        }
        return new BadRequestException(output);
      },
      stopAtFirstError: true
      
    }),
  );
  app.enableCors({
    origin: '*'
  })
  await app.listen(3000);
}
bootstrap();
