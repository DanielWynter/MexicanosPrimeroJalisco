// migrations/20250428103100_remove_allyformatid_from_ally.js
export async function up(knex) {
    await knex.schema.alterTable('ally', (table) => {
      table.dropColumn('allyFormatID');
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable('ally', (table) => {
      table.integer('allyFormatID'); // Lo vuelve a agregar si haces rollback
    });
  }
  