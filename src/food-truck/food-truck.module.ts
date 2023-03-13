import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodTruck } from './entity/food-truck.entity';
import { FoodTruckController } from './food-truck.controller';
import { FoodTruckService } from './services/food-truck.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodTruck])],
  providers: [FoodTruckService],
  controllers: [FoodTruckController],
  exports: [TypeOrmModule],
})
export class FoodTruckModule {}
