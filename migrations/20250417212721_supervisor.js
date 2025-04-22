export const up = (knex) => {
    return knex.schema.createTable('supervisor', (table) => {
      table.increments('supervisorID').primary();
      table.string('supervisorName').notNullable();
      table.string('supervisorEmail').notNullable();
      table.string('supervisorNumber').notNullable();
      table.bool('supervisorJubilation').notNullable();
      table.string('supervisorJubilationYears').notNullable();
      table.string('yearsInZone').notNullable();
      table.bool('zoneChange').notNullable();
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('supervisor');
  };
  