import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FoodTruck } from './entity/food-truck.entity';
import { FilterOptions } from './food-truck.dto/filter-request.dto';
import { FoodTruckResponse } from './food-truck.dto/food-truck-filtered.dto';
import { FoodTruck_SaveRequest } from './food-truck.dto/food-truck-save-request.dto';
import { FoodTruckService } from './services/food-truck.service';
import { SortOrder } from './shared/enums';

@Controller('/food-truck')
export class FoodTruckController {
  constructor(private readonly foodTruckService: FoodTruckService) {}

  @Get()
  getAll(): Promise<FoodTruck[]> {
    return this.foodTruckService.findAll();
  }

  @Get('/filter')
  getFoodTrucksFiltered(
    @Query() filterOptions: FilterOptions,
  ): Promise<FoodTruckResponse> {
    const name = filterOptions.name || '';
    const sortOrder = filterOptions.sortOrder || SortOrder.ASC;
    const take = filterOptions.pageSize || 10;
    const skip =
      Number.parseInt(filterOptions.pageIndex.toString()) *
      filterOptions.pageSize;

    return this.foodTruckService.findFiltered(name, sortOrder, take, skip);
  }

  @Get('/today')
  getFoodTrucksForToday(
    @Query() filterOptions: FilterOptions,
  ): Promise<FoodTruckResponse> {
    const take = filterOptions.pageSize || 10;
    const skip =
      Number.parseInt(filterOptions.pageIndex.toString()) *
      filterOptions.pageSize;

    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);
    return this.foodTruckService.findByDate(curDate, take, skip);
  }

  @Post()
  saveFoodTruck(@Body() foodTruck: FoodTruck_SaveRequest): Promise<FoodTruck> {
    return this.foodTruckService.saveOne(foodTruck);
  }

  @Delete()
  deleteFoodTruck(@Query() id: string): Promise<any> {
    return this.foodTruckService.remove(id);
  }
}
