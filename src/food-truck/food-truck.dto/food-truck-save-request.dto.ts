import { IsDate, IsNotEmpty } from 'class-validator';

export class FoodTruck_SaveRequest {
  @IsNotEmpty()
  truckName: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}
