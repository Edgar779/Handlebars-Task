import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnection } from './app.database';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule { }
