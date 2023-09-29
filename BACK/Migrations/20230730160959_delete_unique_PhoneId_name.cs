using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoGoodServer.Migrations
{
    /// <inheritdoc />
    public partial class deleteuniquePhoneIdname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameIndex(
                name: "UQ__UserGoGo__B43B145F09FC50A2",
                table: "UserGoGood",
                newName: "IX_UserGoGood_phone");

            migrationBuilder.AddColumn<int>(
                name: "isActive",
                table: "UserGoGood",
                type: "int",
                nullable: false,
                defaultValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "UserGoGood");

            migrationBuilder.RenameIndex(
                name: "IX_UserGoGood_phone",
                table: "UserGoGood",
                newName: "UQ__UserGoGo__B43B145F09FC50A2");
        }
    }
}
