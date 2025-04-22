export const up = (knex) => {
    return knex.schema.createTable('moral_person', (table) => {
      table.increments('moralPersonID').primary();
      table.string('orgName').notNullable();
      table.string('giro').notNullable();
      table.string('orgPurpose').notNullable();
      table.string('orgAddress').notNullable();
      table.string('orgPhone').notNullable();
      table.string('orgWeb').notNullable();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('moral_person');
  };
  