import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Unit } from './entities/unit.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';

@ApiTags('units')
@UseGuards(JwtAuthGuard)
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @ApiOkResponse({
    type: Unit,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @ApiOkResponse({
    type: Unit,
  })
  @Get(':id')
  findOne(@Param('id') unitId: string) {
    return this.unitService.findOne(unitId);
  }

  @ApiOkResponse({
    type: Unit,
  })
  @Put(':id')
  update(@Param('id') unitId: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(unitId, updateUnitDto);
  }

  @ApiOkResponse({
    type: Unit,
  })
  @Delete(':id')
  remove(@Param('id') unitId: string) {
    return this.unitService.remove(unitId);
  }
}
