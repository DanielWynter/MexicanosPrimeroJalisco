export async function up(knex) {
    return knex.schema.alterTable('groups', (table) => {
      table.integer('schoolID').unsigned().references('schoolID').inTable('schools').onDelete('CASCADE');
    });
  }
  
  export async function down(knex) {
    return knex.schema.alterTable('groups', (table) => {
      table.dropColumn('schoolID');
    });
  }
  