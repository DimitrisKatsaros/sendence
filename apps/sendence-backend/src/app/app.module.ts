import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageEntity } from './messages/entities/message.entity';
import { MessagesModule } from './messages/messages-module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT'), 10),
        username: config.get('DB_USER'),
        password: config.get('DB_USER_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [MessageEntity],
        synchronize: true, //TODO: set to false in "production"
      }),
      inject: [ConfigService],
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
