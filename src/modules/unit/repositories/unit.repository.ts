import { EntityRepository, Repository } from 'typeorm';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { Unit } from '../entities/unit.entity';

@EntityRepository(Unit)
export class UnitRepository extends Repository<Unit> {
  createUnit(createUnitDto: CreateUnitDto) {
    const unit = this.create(createUnitDto);

    return this.save(unit);
  }

  async findAll() {
    const units = await this.find();

    return units;
  }

  async findById(unitId: string) {
    const unit = await this.findOne(unitId);

    return unit;
  }

  async findByName(name: string) {
    const unit = await this.findOne({
      where: {
        name,
      },
    });

    return unit;
  }
}
