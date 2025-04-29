// 20250429_add_userStatus_to_users.js
export function up(knex) {
    return knex.schema.alterTable("users", (table) => {
      table.string("userStatus").notNullable().defaultTo("activo");
    });
  }
  
  export function down(knex) {
    return knex.schema.alterTable("users", (table) => {
      table.dropColumn("userStatus");
    });
  }
  