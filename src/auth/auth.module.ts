import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    // Configure the JWT module with async options
    // This allows you to use environment variables for JWT configuration
    TypeOrmModule.forFeature([User]), // Import your entities here if needed
    JwtModule.registerAsync({
      // Import ConfigModule to access environment variables
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          global: true, // Optional: if you want to use the same JWT module globally
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string>('JWT_EXPIRATION') },
        };
      },
      inject: [ConfigService], // Inject ConfigService to access environment variables
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
