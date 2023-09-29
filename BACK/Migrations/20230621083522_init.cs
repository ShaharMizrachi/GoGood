using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoGoodServer.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EnumProfession",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    category = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    icon = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnumProfession", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Log",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    description = table.Column<string>(type: "varchar(3000)", maxLength: 3000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Log", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StatusType",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    statusType = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    icon = table.Column<string>(type: "varchar(1500)", maxLength: 1500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusType", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "traslator",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    he = table.Column<string>(type: "varchar(70)", maxLength: 70, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    en = table.Column<string>(type: "varchar(70)", maxLength: 70, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_traslator", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserGoGood",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fullName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    phone = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    imgURL = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    imei = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    userType = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGoGood", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GivingHelpPerProfession",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    categoryId = table.Column<int>(type: "int", nullable: true),
                    GivingHelpId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GivingHelpPerProfession", x => x.id);
                    table.ForeignKey(
                        name: "FK__GivingHel__Givin__08B54D69",
                        column: x => x.GivingHelpId,
                        principalTable: "UserGoGood",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__GivingHel__categ__07C12930",
                        column: x => x.categoryId,
                        principalTable: "EnumProfession",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    categoryId = table.Column<int>(type: "int", nullable: true),
                    GettingHelpId = table.Column<int>(type: "int", nullable: true),
                    problemTitle = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    problemDescription = table.Column<string>(type: "varchar(4000)", maxLength: 4000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    problemPic = table.Column<string>(type: "varchar(3500)", maxLength: 3500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StatusTypeId = table.Column<int>(type: "int", nullable: true),
                    dateUpdete = table.Column<DateTime>(type: "date", nullable: false),
                    latitude = table.Column<double>(type: "double", nullable: true),
                    longitude = table.Column<double>(type: "double", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.id);
                    table.ForeignKey(
                        name: "FK__Post__GettingHel__0E6E26BF",
                        column: x => x.GettingHelpId,
                        principalTable: "UserGoGood",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Post__StatusType__0F624AF8",
                        column: x => x.StatusTypeId,
                        principalTable: "StatusType",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Post__categoryId__0D7A0286",
                        column: x => x.categoryId,
                        principalTable: "EnumProfession",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GivingHelpOwnerPost",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    postId = table.Column<int>(type: "int", nullable: true),
                    GivingHelpId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GivingHelpOwnerPost", x => x.id);
                    table.ForeignKey(
                        name: "FK__GivingHel__Givin__14270015",
                        column: x => x.GivingHelpId,
                        principalTable: "UserGoGood",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__GivingHel__postI__1332DBDC",
                        column: x => x.postId,
                        principalTable: "Post",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "recommendation",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    postId = table.Column<int>(type: "int", nullable: true),
                    review = table.Column<string>(type: "varchar(3500)", maxLength: 3500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    rate = table.Column<double>(type: "double", nullable: true),
                    WhoGaveItId = table.Column<int>(type: "int", nullable: true),
                    WhoGotItId = table.Column<int>(type: "int", nullable: true),
                    reviewDate = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recommendation", x => x.id);
                    table.ForeignKey(
                        name: "FK__Post__WhoGotIt__CustomName",
                        column: x => x.WhoGotItId,
                        principalTable: "UserGoGood",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_recommendation_Post_postId",
                        column: x => x.postId,
                        principalTable: "Post",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_GivingHelpOwnerPost_GivingHelpId",
                table: "GivingHelpOwnerPost",
                column: "GivingHelpId");

            migrationBuilder.CreateIndex(
                name: "IX_GivingHelpOwnerPost_postId",
                table: "GivingHelpOwnerPost",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_GivingHelpPerProfession_categoryId",
                table: "GivingHelpPerProfession",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_GivingHelpPerProfession_GivingHelpId",
                table: "GivingHelpPerProfession",
                column: "GivingHelpId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_categoryId",
                table: "Post",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_GettingHelpId",
                table: "Post",
                column: "GettingHelpId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_StatusTypeId",
                table: "Post",
                column: "StatusTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_recommendation_postId",
                table: "recommendation",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_recommendation_WhoGotItId",
                table: "recommendation",
                column: "WhoGotItId");

            migrationBuilder.CreateIndex(
                name: "UQ__UserGoGo__B43B145F09FC50A2",
                table: "UserGoGood",
                column: "phone",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GivingHelpOwnerPost");

            migrationBuilder.DropTable(
                name: "GivingHelpPerProfession");

            migrationBuilder.DropTable(
                name: "Log");

            migrationBuilder.DropTable(
                name: "recommendation");

            migrationBuilder.DropTable(
                name: "traslator");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "UserGoGood");

            migrationBuilder.DropTable(
                name: "StatusType");

            migrationBuilder.DropTable(
                name: "EnumProfession");
        }
    }
}
