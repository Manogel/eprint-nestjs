import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitRepository } from './repositories/unit.repository';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitRepository)
    private readonly unitRepository: UnitRepository,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    const { name } = createUnitDto;

    const nameIsExists = await this.unitRepository.findByName(name.trim());

    if (nameIsExists)
      throw new BadRequestException(`A unidade com o nome ${name} já existe`);

    const unit = await this.unitRepository.createUnit(createUnitDto);

    return unit;
  }

  findAll() {
    return this.unitRepository.findAll();
  }

  async findOne(unitId: string) {
    const unit = await this.unitRepository.findById(unitId);

    if (!unit) {
      throw new BadRequestException('Unidade não encontrada');
    }

    return unit;
  }

  async update(unitId: string, updateUnitDto: UpdateUnitDto) {
    const { name } = updateUnitDto;
    const unit = await this.findOne(unitId);

    if (unit.deleted_at) throw new BadRequestException('Unidade deletada');

    if (name) {
      const nameIsExists = await this.unitRepository.findByName(name.trim());

      if (nameIsExists && unit.id !== nameIsExists.id)
        throw new BadRequestException(`A unidade com o nome ${name} já existe`);
    }

    Object.assign(unit, updateUnitDto);

    await this.unitRepository.save(unit);

    return unit;
  }

  async remove(unitId: string) {
    const unit = await this.findOne(unitId);

    if (unit.deleted_at) {
      throw new BadRequestException('Unidade já foi excluída');
    }

    unit.deleted_at = new Date();
    unit.is_active = false;

    await this.unitRepository.save(unit);

    return unit;
  }
}
