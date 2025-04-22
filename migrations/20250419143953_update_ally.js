export const up = (knex) => {
    return knex.schema.alterTable('ally', (table) => {
      table
        .integer('allyFormatID')
        .unsigned()
        .nullable()
        .references('allyFormatID')
        .inTable('ally_format');
    });
  };
  
  export const down = (knex) => {
    return knex.schema.alterTable('ally', (table) => {
      table.dropColumn('allyFormatID');
    });
  };
  