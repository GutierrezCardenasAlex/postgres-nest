import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CastService } from './cast.service';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Auth(Role.USER)
@Controller('cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @Post()
  create(@Body() createCastDto: CreateCastDto, @ActiveUser() user:UserActiveInterface) {
    return this.castService.create(createCastDto, user);
  }

  @Get()
  findAll(@ActiveUser() user:UserActiveInterface) {
    return this.castService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number,@ActiveUser() user:UserActiveInterface) {
    return this.castService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updateCastDto: UpdateCastDto, 
    @ActiveUser() 
    user:UserActiveInterface
  ) {
    return this.castService.update(id, updateCastDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number,@ActiveUser() user:UserActiveInterface) {
    return this.castService.remove(id, user);
  }
}
