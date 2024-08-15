import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseConfig } from './config/configuration.types';
import { User } from './repositories/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './repositories/entities/post.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password, database } =
          configService.get<DatabaseConfig>('database');

        return {
          type: 'postgres',
          host,
          port,
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
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
