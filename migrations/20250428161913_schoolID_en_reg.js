// migrations/20250428161913_schoolID_en_reg.js
export async function up(knex) {
    await knex.schema.alterTable('school_registrations', (table) => {
      table
        .integer('schoolID')
        .unsigned()
        .references('schoolID')
        .inTable('schools')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable('school_registrations', (table) => {
      table.dropColumn('schoolID');
    });
  }
  