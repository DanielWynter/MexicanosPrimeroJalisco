export const up = (knex) => {
    return knex.schema.createTable('representative', (table) => {
      table.increments('representativeID').primary();
      table.string('representativeName').notNullable();
      table.string('representativeAddress').notNullable();
      table.string('representativePhone').notNullable();
      table.string('area').notNullable();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('representative');
  };
  