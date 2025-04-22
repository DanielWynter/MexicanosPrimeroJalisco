export const up = (knex) => {
    return knex.schema.createTable('users', (table) => {
      table.increments('userID').primary();
      table.string('userEmail').notNullable().unique();
      table.string('userPassword').notNullable();
      table.string('userRol').notNullable();
      table.integer('schoolID').unsigned().nullable().references('schoolID').inTable('schools'); // Relación con School
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('users');
  };
  