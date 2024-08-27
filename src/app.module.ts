import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { MeasuresModule } from './measures/measures.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, MeasuresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
