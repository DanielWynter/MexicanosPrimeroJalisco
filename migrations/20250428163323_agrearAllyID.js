// migrations/20250428103000_add_allyid_to_allyformat.js
export async function up(knex) {
    await knex.schema.alterTable('ally_format', (table) => {
      table
        .integer('allyID')
        .unsigned()
        .references('allyID')
        .inTable('ally')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable('ally_format', (table) => {
      table.dropColumn('allyID');
    });
  }
  