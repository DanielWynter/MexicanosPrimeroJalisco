export async function up(knex) {
    return knex.schema.alterTable('format_school', (table) => {
      table.integer('schoolID').unsigned().references('schoolID').inTable('schools').onDelete('CASCADE');
    });
  }
  
  export async function down(knex) {
    return knex.schema.alterTable('format_school', (table) => {
      table.dropColumn('schoolID');
    });
  }
  