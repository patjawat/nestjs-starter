import { Controller, Get, Post, UseGuards,Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserRequestDto, CreateUserResponseDto } from './users/dtos/create-user.dto';
import { SignInRequestDto, SignInResponseDto } from './users/dtos/sign-in.dto';

import { UsersService } from './users/users.service';
// import { AuthService } from './auth/auth.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly userService: UsersService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('signup')
  signUp(@Body() data: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.userService.signUp(data);
  }

  @Post('/signin')
  signIn(@Body() data: SignInRequestDto): Promise<SignInResponseDto> {
    return this.userService.signIn(data);
  }

  // @Get('/me')
  // @Role(['Any'])
  // // @UseGuards(AuthGuard)
  // getMe(@AuthUser() user: User): User {
  //   return user;
  // }

  // @Get('/admin')
  // @Role(['Admin'])
  // // @UseGuards(AuthGuard)
  // getAdminInfo(@AuthUser() user: User) {
  //   return `Admin : ${user.username}`;
  // }
  

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
function Public() {
  throw new Error('Function not implemented.');
}

