// Corrected migration for dropping the 'groups' table with foreign key constraints
export const up = function(knex) {
    return knex.schema
      .table('formatSchool', function(table) {
        table.dropForeign('groupid'); // Drop the foreign key reference to the 'groups' table
      })
      .then(() => {
        return knex.schema.dropTableIfExists('groups'); // Now drop the table
      });
  };
  
  export const down = async (knex) => {
    return knex.schema.createTable('groups', function(table) {
      table.increments('id').primary(); // Esto asume que deseas tener un campo ID autoincremental
      table.json('groupAPositions');  // Correspondiente a las posiciones del grupo A
      table.json('groupBComplete');   // Correspondiente a las posiciones del grupo B
      table.json('groupCComplete');   // Correspondiente a las posiciones del grupo C
      table.integer('teachers');      // Número de docentes frente a grupo
      table.integer('specialTeachers'); // Número de docentes para asignaturas especiales
      table.boolean('usaer');          // Si tienen USAER
      table.string('usaerTeachers');  // Docentes de USAER
      table.boolean('parentsTable');  // Si tienen mesa de padres
      table.integer('tableAmmount');  // Número de personas en la mesa de padres
      table.timestamps(true, true);   // Tiempos de creación y actualización
    });
  };
  