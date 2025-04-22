export const up = (knex) => {
    return knex.schema.createTable('public_scripture', (table) => {
      table.increments('publicScriptureID').primary();
      table.string('psNumber').notNullable();
      table.string('psDate').notNullable();
      table.string('notaryName').notNullable();
      table.string('city').notNullable();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('public_scripture');
  };
  