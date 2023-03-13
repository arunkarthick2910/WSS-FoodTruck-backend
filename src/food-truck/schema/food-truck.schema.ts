import { EntitySchema } from 'typeorm';
import { FoodTruck } from '../entity/food-truck.entity';

export const FoodTruckSchema = new EntitySchema<FoodTruck>({
  name: 'FoodTruck',
  target: FoodTruck,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    truckName: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
});
