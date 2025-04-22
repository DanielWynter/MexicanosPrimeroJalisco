export const up = (knex) => {
    return knex.schema.createTable('schools', (table) => {
      table.increments('schoolID').primary();
      table.string('workCenterKey').notNullable().unique();
      table.string(''); // Puedes agregar más campos según lo necesites
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('schools');
  };
  