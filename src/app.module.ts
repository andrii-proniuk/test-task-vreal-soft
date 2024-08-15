import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseConfig } from './config/configuration.types';
import { User } from './repositories/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './repositories/entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { username, password, database } =
          configService.get<DatabaseConfig>('database');

        return {
          type: 'postgres',
          username,
          password,
          database,
          entities: [User, Post],
          synchronize: true, // using only for test purposes
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
