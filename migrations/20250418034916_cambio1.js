export const up = async (knex) => {
    return knex.schema.alterTable('groups', (table) => {
      table.dropColumn('parentsTableAmmount');
    });
  };
  
  export const down = async (knex) => {
    return knex.schema.alterTable('groups', (table) => {
      table.dropColumn('parentsTableAmmount');
    })
  };
  