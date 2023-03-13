import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { FoodTruck } from '../entity/food-truck.entity';
import { FoodTruckResponse } from '../food-truck.dto/food-truck-filtered.dto';
import { FoodTruck_SaveRequest } from '../food-truck.dto/food-truck-save-request.dto';
import { SortOrder } from '../shared/enums';

@Injectable()
export class FoodTruckService {
  constructor(
    @InjectRepository(FoodTruck)
    private foodTruckRepository: Repository<FoodTruck>,
  ) {}

  saveOne(foodTruck: FoodTruck_SaveRequest): Promise<FoodTruck> {
    return this.foodTruckRepository.save(foodTruck);
  }

  findAll(): Promise<FoodTruck[]> {
    return this.foodTruckRepository.find();
  }

  async findFiltered(
    name: string,
    sortOrder: SortOrder,
    take: number,
    skip: number,
  ): Promise<FoodTruckResponse> {
    const [result, total] = await this.foodTruckRepository.findAndCount({
      where: { truckName: Like('%' + name + '%') },
      order: { updatedTs: sortOrder },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findByDate(
    date: Date,
    take: number,
    skip: number,
  ): Promise<FoodTruckResponse> {
    const [result, total] = await this.foodTruckRepository.findAndCount({
      where: { date },
      order: { truckName: SortOrder.ASC },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async remove(id: string): Promise<any> {
    return await this.foodTruckRepository.delete(id);
  }
}
