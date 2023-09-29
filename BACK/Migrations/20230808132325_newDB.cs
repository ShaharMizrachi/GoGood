using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoGoodServer.Migrations
{
    /// <inheritdoc />
    public partial class newDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "updatedTimestamp",
                table: "Post",
                type: "datetime",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "updatedTimestamp",
                table: "Post");
        }
    }
}
