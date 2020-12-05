import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { UnitRepository } from './repositories/unit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, UnitRepository])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
