import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { retry } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService, 
    ) {}

    async register({name, email, password}:RegisterDto) {
        
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }
        
        await this.usersService.create({
            name, 
            email, 
            password: await bcrypt.hash(password, 10)
        });

        return {
            message: 'User registered successfully',
            name,
            email,
        };
    }

    async login({email, password}: LoginDto) {
        
        const user = await this.usersService.findOneByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('Email is wrong');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is wrong');
        }

        const payload = { email: user.email, role:user.role};

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email,
        };
    }
    async profile({email,role}: {email: string, role: string}) {

        //if(role !== 'admin') {
        //   throw new UnauthorizedException('You are not authorized to access this resource');  
        //}
        return await this.usersService.findOneByEmail(email);
    }
}
