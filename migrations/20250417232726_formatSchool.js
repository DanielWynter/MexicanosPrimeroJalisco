export const up = (knex) => {
    return knex.schema.createTable('format_school', (table) => {
      table.increments('formatSchoolID').primary();
      table.string('schoolName').notNullable();
      table.string('schoolSector').notNullable();
      table.string('educationLevel').notNullable();
      table.string('street').notNullable();
      table.string('colony').notNullable();
      table.string('municipality').notNullable();
      table.integer('zip').notNullable();
      table.string('module').notNullable();
      table.string('sustenance').notNullable();
      table.integer('principalID').unsigned().nullable().references('principalID').inTable('principal');
      table.integer('supervisorID').unsigned().nullable().references('supervisorID').inTable('supervisor');
      table.integer('groupID').unsigned().nullable().references('groupID').inTable('groups'); // Relación con School
      table.integer('shoolDataID').unsigned().nullable().references('schoolDataID').inTable('school_data'); // Relación con School
      table.timestamps(true, true);
    });
  };  
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('format_school');
  };
  