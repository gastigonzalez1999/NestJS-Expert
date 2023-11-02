import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from 'src/guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, 'description': 'User was created', type: User })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @Post('register')
  create(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @ApiResponse({ status: 200, 'description': 'User was logged in', type: User })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      ok: true,
      user,
      userEmail,
      rawHeaders,
    }
  }

  @Get('private2')
  @RoleProtected(ValidRoles.SUPER_USER, ValidRoles.ADMIN, ValidRoles.USER)
  //@SetMetadata('roles',  ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }

  @Get('private3')
  @Auth()
  privateRout32(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }

  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @ApiResponse({ status: 403, 'description': 'Forbidden - Token' })
  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User,
  ) {
    return this.authService.checkAuthStatus(user);
  }
}
