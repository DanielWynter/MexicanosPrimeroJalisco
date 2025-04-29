// 20250429_add_adminID_to_users.js

export function up(knex) {
    return knex.schema.alterTable("users", (table) => {
      table
        .integer("adminID")
        .unsigned()
        .references("adminID")
        .inTable("admins")
        .onDelete("SET NULL")
        .onUpdate("CASCADE");
    });
  }
  
  export function down(knex) {
    return knex.schema.alterTable("users", (table) => {
      table.dropColumn("adminID");
    });
  }
  