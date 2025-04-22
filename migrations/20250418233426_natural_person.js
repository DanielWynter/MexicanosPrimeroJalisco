export const up = (knex) => {
    return knex.schema.createTable('natural_person', (table) => {
      table.increments('naturalPersonID').primary();
      table.string('npName').notNullable();
      table.string('npEmail').notNullable();
      table.string('npPhone').notNullable();
      table.string('npCURP').notNullable();
      table.string('npInstitution').notNullable();
      table.string('npReason').notNullable();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('natural_person');
  };
  