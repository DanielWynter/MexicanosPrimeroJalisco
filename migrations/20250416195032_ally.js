export const up = (knex) => {
    return knex.schema.createTable('ally', (table) => {
      table.increments('allyID').primary();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('ally');
  };
  