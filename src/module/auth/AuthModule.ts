import { Module, ModuleMetadata } from '@nestjs/common';
import { JwtStrategy } from './strategy/JwtStrategy';
import { PassportModule } from '@nestjs/passport';

export const authModuleMetadata: ModuleMetadata = {
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy],
  exports: [PassportModule],
};

@Module(authModuleMetadata)
export class AuthModule {}
