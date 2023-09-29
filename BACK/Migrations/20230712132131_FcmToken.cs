using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoGoodServer.Migrations
{
    /// <inheritdoc />
    public partial class FcmToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserDescription",
                table: "UserGoGood",
                type: "varchar(1500)",
                maxLength: 1500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "FcmToken",
                table: "UserGoGood",
                type: "varchar(1500)",
                maxLength: 1500,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FcmToken",
                table: "UserGoGood");

            migrationBuilder.AlterColumn<string>(
                name: "UserDescription",
                table: "UserGoGood",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1500)",
                oldMaxLength: 1500,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
