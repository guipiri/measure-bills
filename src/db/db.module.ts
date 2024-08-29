import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>('DB_HOST') + 'IAUHIAUHiAUHAIuAH');

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST') || 'db',
          port: parseInt(configService.get<string>('DB_PORT'), 10) || 5432,
          username: configService.get<string>('DB_USERNAME') || 'user',
          password: configService.get<string>('DB_PASSWORD') || 'password',
          database: configService.get<string>('DB_NAME') || 'measures-bills',
          entities: [__dirname + '/../**/*.entity{.ts.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
