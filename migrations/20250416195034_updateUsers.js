export const up = (knex) => {
    return knex.schema.alterTable('users', (table) => {
      table.string('userName');
      table.integer('allyID').unsigned().nullable().references('allyID').inTable('ally');
    });
  };
  
  export const down = (knex) => {
    return knex.schema.alterTable('users', (table) => {
      table.dropColumn('userName');
      table.dropColumn('allyID');
    });
  };
  