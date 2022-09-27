import { createDatabase } from './database';
import { sleep } from './sleep';

interface Food {
  id: string;
  name: string;
  calories: number;
}

(async () => {
  const FoodDb = createDatabase<Food>();

  FoodDb.instance.set({ id: '1', name: 'Pizza', calories: 1000 });
  FoodDb.instance.set({ id: '2', name: 'Salad', calories: 200 });

  console.log('Getting food 1');
  await sleep(2000);
  console.log(FoodDb.instance.get('1'));
})();
