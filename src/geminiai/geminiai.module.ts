import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiaiService } from './geminiai.service';

@Module({
  providers: [GeminiaiService, ConfigService],
  exports: [GeminiaiService],
})
export class GeminiaiModule {}
