export const up = (knex) => {
    return knex.schema.alterTable('schools', (table) => {
      table.integer('formatSchoolID').unsigned().nullable().references('formatSchoolID').inTable('format_school');
    });
  };
  
  export const down = (knex) => {
    return knex.schema.alterTable('schools', (table) => {
      table.dropColumn('formatSchoolID');
    });
  };
  