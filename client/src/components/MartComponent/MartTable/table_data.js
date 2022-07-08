import { faker } from "@faker-js/faker";

export function generate_promotion(number = 10) {
  let promotions = [];
  for (let i = 0; i < number; i++) {
    let promotion = {
      id: "",
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    };
    promotion.id = faker.database.mongodbObjectId();
    promotion.name = faker.name.findName();
    promotion.category = faker.vehicle.type();
    promotion.price = faker.commerce.price(1000, 5000, 2, "¥");
    promotion.description = faker.lorem.paragraph(3);
    promotion.image = faker.image.food(100, 80, true);
    promotions.push(promotion);
  }
  return promotions;
}
