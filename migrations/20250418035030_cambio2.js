export const up = (knex) => {
    return knex.schema.alterTable('groups', (table) => {
      // Agregar la columna 'parentsTableAmmount' como tipo integer
      table.integer('parentsTableAmmount').nullable();
    });
  };
  
  export const down = (knex) => {
    return knex.schema.alterTable('groups', (table) => {
      // Si necesitas revertir, eliminamos la columna
      table.dropColumn('parentsTableAmmount');
    });
  };
  