export const up = (knex) => {
    return knex.schema.createTable('admins', (table) => {
      table.increments('adminID').primary();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('admins');
  };
  