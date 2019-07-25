
exports.up = function(knex) {
  return knex.schema.createTable('cars'), cars => {
      cars.increments();
      cars
          .string('make', 128)
          .notNullable()
      cars
            .string('model', 128)
            .notNullable();
      cars
            .string('VIN', 128)
            .unique()
      cars        
            .number('year')
            

  }

 
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
