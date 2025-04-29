export async function up(knex) {
    await Promise.all([
      knex.schema.alterTable('moral_person', (table) => {
        table.integer('allyID').unsigned();
        table.foreign('allyID').references('allyID').inTable('ally').onDelete('CASCADE');
      }),
      knex.schema.alterTable('natural_person', (table) => {
        table.integer('allyID').unsigned();
        table.foreign('allyID').references('allyID').inTable('ally').onDelete('CASCADE');
      }),
      knex.schema.alterTable('public_scripture', (table) => {
        table.integer('allyID').unsigned();
        table.foreign('allyID').references('allyID').inTable('ally').onDelete('CASCADE');
      }),
      knex.schema.alterTable('representative', (table) => {
        table.integer('allyID').unsigned();
        table.foreign('allyID').references('allyID').inTable('ally').onDelete('CASCADE');
      }),
      knex.schema.alterTable('tax_certificate', (table) => {
        table.integer('allyID').unsigned();
        table.foreign('allyID').references('allyID').inTable('ally').onDelete('CASCADE');
      }),
    ]);
  }
  
  export async function down(knex) {
    await Promise.all([
      knex.schema.alterTable('moral_person', (table) => {
        table.dropForeign('allyID');
        table.dropColumn('allyID');
      }),
      knex.schema.alterTable('natural_person', (table) => {
        table.dropForeign('allyID');
        table.dropColumn('allyID');
      }),
      knex.schema.alterTable('public_scripture', (table) => {
        table.dropForeign('allyID');
        table.dropColumn('allyID');
      }),
      knex.schema.alterTable('representative', (table) => {
        table.dropForeign('allyID');
        table.dropColumn('allyID');
      }),
      knex.schema.alterTable('tax_certificate', (table) => {
        table.dropForeign('allyID');
        table.dropColumn('allyID');
      }),
    ]);
  }
  