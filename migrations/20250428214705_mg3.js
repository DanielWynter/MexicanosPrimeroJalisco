export async function up(knex) {
    return knex.schema.alterTable('supervisor', (table) => {
      table.integer('schoolID').unsigned().references('schoolID').inTable('schools').onDelete('CASCADE');
    });
  }
  
  export async function down(knex) {
    return knex.schema.alterTable('supervisor', (table) => {
      table.dropColumn('schoolID');
    });
  }
  