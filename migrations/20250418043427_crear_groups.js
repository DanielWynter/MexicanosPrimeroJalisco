// migrations/20250418043427_crear_groups.js

export const up = function(knex) {
    return knex.schema.createTable('groups', function(table) {
      table.increments('groupsID').primary();
      table.string('groupAPositions');    // <- ahora string
      table.string('groupBComplete');     // <- ahora string
      table.string('groupCComplete');     // <- ahora string
      table.integer('teachers');
      table.integer('specialTeachers');
      table.boolean('usaer');
      table.string('usaerTeachers');
      table.boolean('parentsTable');
      table.integer('tableAmmount');
      table.timestamps(true, true);
    });
  };
  
  export const down = function(knex) {
    return knex.schema.dropTableIfExists('groups');
  };
  