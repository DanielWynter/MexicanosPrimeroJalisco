export const up = (knex) => {
    return knex.schema.createTable('group', (table) => {
      table.increments('groupID').primary();      
      table.string('groupAPositions', 10).notNullable().defaultTo('1°,2°,3°,4°,5°,6°');
      table.boolean('groupBComplete').defaultTo(true);
      table.boolean('groupCComplete').defaultTo(true);
      table.integer('teachers').nullable();
      table.integer('specialTeachers').nullable();
      table.boolean('usaer').nullable();
      table.string('usaerTeachers').nullable();
      table.boolean('parentsTable').nullable();
      table.boolean('parentsTableAmmount').nullable();
      table.timestamps(true, true);
    });
  };
  
  export const down = (knex) => {
    return knex.schema.dropTableIfExists('group');
  };