export const up = (knex) => {
    return knex.schema.createTable('principal', (table) => {
      table.increments('principalID').primary();
      table.string('principalName').notNullable();
      table.string('principalEmail').notNullable();
      table.string('principalNumber').notNullable();
      table.bool('principalJubilation').notNullable();
      table.string('jubilationYears').notNullable();
      table.string('yearsInSchool').notNullable();
      table.bool('schoolChange').notNullable();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('principal');
  };
  