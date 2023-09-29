﻿// <auto-generated />
using System;
using GoGoodServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GoGoodServer.Migrations
{
    [DbContext(typeof(GoGoodDBContext))]
    [Migration("20230704083339_init_OTP")]
    partial class initOTP
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("GoGoodServer.Models.EnumProfession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Category")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("category");

                    b.Property<string>("Icon")
                        .HasMaxLength(250)
                        .HasColumnType("varchar(250)")
                        .HasColumnName("icon");

                    b.HasKey("Id");

                    b.ToTable("EnumProfession", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.GivingHelpOwnerPost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<int?>("GivingHelpId")
                        .HasColumnType("int");

                    b.Property<int?>("PostId")
                        .HasColumnType("int")
                        .HasColumnName("postId");

                    b.HasKey("Id");

                    b.HasIndex("GivingHelpId");

                    b.HasIndex("PostId");

                    b.ToTable("GivingHelpOwnerPost", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.GivingHelpPerProfession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("categoryId");

                    b.Property<int?>("GivingHelpId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("GivingHelpId");

                    b.ToTable("GivingHelpPerProfession", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.Log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Description")
                        .HasMaxLength(3000)
                        .HasColumnType("varchar(3000)")
                        .HasColumnName("description");

                    b.Property<int?>("Type")
                        .HasColumnType("int")
                        .HasColumnName("Type");

                    b.HasKey("Id");

                    b.ToTable("Log", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.OTP", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("OtpNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)")
                        .HasColumnName("otpNumber");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)")
                        .HasColumnName("phone");

                    b.Property<DateTime>("RegistrationDateTime")
                        .HasColumnType("date")
                        .HasColumnName("registrationDateTime");

                    b.HasKey("Id");

                    b.HasIndex("Phone")
                        .IsUnique();

                    b.ToTable("OTP", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("categoryId");

                    b.Property<DateTime>("DateUpdete")
                        .HasColumnType("date")
                        .HasColumnName("dateUpdete");

                    b.Property<int?>("GettingHelpId")
                        .HasColumnType("int");

                    b.Property<double?>("Latitude")
                        .HasColumnType("double")
                        .HasColumnName("latitude");

                    b.Property<double?>("Longitude")
                        .HasColumnType("double")
                        .HasColumnName("longitude");

                    b.Property<string>("ProblemDescription")
                        .HasMaxLength(4000)
                        .HasColumnType("varchar(4000)")
                        .HasColumnName("problemDescription");

                    b.Property<string>("ProblemPic")
                        .HasMaxLength(3500)
                        .HasColumnType("varchar(3500)")
                        .HasColumnName("problemPic");

                    b.Property<string>("ProblemTitle")
                        .HasMaxLength(2000)
                        .HasColumnType("varchar(2000)")
                        .HasColumnName("problemTitle");

                    b.Property<int?>("StatusTypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("GettingHelpId");

                    b.HasIndex("StatusTypeId");

                    b.ToTable("Post", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.Recommendation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<int?>("PostId")
                        .HasColumnType("int")
                        .HasColumnName("postId");

                    b.Property<double?>("Rate")
                        .HasColumnType("double")
                        .HasColumnName("rate");

                    b.Property<string>("Review")
                        .HasMaxLength(3500)
                        .HasColumnType("varchar(3500)")
                        .HasColumnName("review");

                    b.Property<int?>("WhoGaveItId")
                        .HasColumnType("int");

                    b.Property<int?>("WhoGotItId")
                        .HasColumnType("int");

                    b.Property<DateTime>("reviewDate")
                        .HasColumnType("date")
                        .HasColumnName("reviewDate");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("WhoGotItId");

                    b.ToTable("recommendation", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.StatusType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Icon")
                        .HasMaxLength(1500)
                        .HasColumnType("varchar(1500)")
                        .HasColumnName("icon");

                    b.Property<string>("StatusType1")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("statusType");

                    b.HasKey("Id");

                    b.ToTable("StatusType", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.Traslator", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("En")
                        .HasMaxLength(70)
                        .HasColumnType("varchar(70)")
                        .HasColumnName("en");

                    b.Property<string>("He")
                        .HasMaxLength(70)
                        .HasColumnType("varchar(70)")
                        .HasColumnName("he");

                    b.HasKey("Id");

                    b.ToTable("traslator", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.UserGoGood", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("FullName")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("fullName");

                    b.Property<string>("Imei")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("imei");

                    b.Property<string>("ImgUrl")
                        .HasMaxLength(250)
                        .HasColumnType("varchar(250)")
                        .HasColumnName("imgURL");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)")
                        .HasColumnName("phone");

                    b.Property<string>("UserDescription")
                        .HasColumnType("longtext");

                    b.Property<string>("UserType")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("userType");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "Phone" }, "UQ__UserGoGo__B43B145F09FC50A2")
                        .IsUnique();

                    b.ToTable("UserGoGood", (string)null);
                });

            modelBuilder.Entity("GoGoodServer.Models.GivingHelpOwnerPost", b =>
                {
                    b.HasOne("GoGoodServer.Models.UserGoGood", "GivingHelp")
                        .WithMany("GivingHelpOwnerPosts")
                        .HasForeignKey("GivingHelpId")
                        .HasConstraintName("FK__GivingHel__Givin__14270015");

                    b.HasOne("GoGoodServer.Models.Post", "Post")
                        .WithMany("GivingHelpOwnerPosts")
                        .HasForeignKey("PostId")
                        .HasConstraintName("FK__GivingHel__postI__1332DBDC");

                    b.Navigation("GivingHelp");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("GoGoodServer.Models.GivingHelpPerProfession", b =>
                {
                    b.HasOne("GoGoodServer.Models.EnumProfession", "Category")
                        .WithMany("GivingHelpPerProfessions")
                        .HasForeignKey("CategoryId")
                        .HasConstraintName("FK__GivingHel__categ__07C12930");

                    b.HasOne("GoGoodServer.Models.UserGoGood", "GivingHelp")
                        .WithMany("GivingHelpPerProfessions")
                        .HasForeignKey("GivingHelpId")
                        .HasConstraintName("FK__GivingHel__Givin__08B54D69");

                    b.Navigation("Category");

                    b.Navigation("GivingHelp");
                });

            modelBuilder.Entity("GoGoodServer.Models.Post", b =>
                {
                    b.HasOne("GoGoodServer.Models.EnumProfession", "Category")
                        .WithMany("Posts")
                        .HasForeignKey("CategoryId")
                        .HasConstraintName("FK__Post__categoryId__0D7A0286");

                    b.HasOne("GoGoodServer.Models.UserGoGood", "GettingHelp")
                        .WithMany("Posts")
                        .HasForeignKey("GettingHelpId")
                        .HasConstraintName("FK__Post__GettingHel__0E6E26BF");

                    b.HasOne("GoGoodServer.Models.StatusType", "StatusType")
                        .WithMany("Posts")
                        .HasForeignKey("StatusTypeId")
                        .HasConstraintName("FK__Post__StatusType__0F624AF8");

                    b.Navigation("Category");

                    b.Navigation("GettingHelp");

                    b.Navigation("StatusType");
                });

            modelBuilder.Entity("GoGoodServer.Models.Recommendation", b =>
                {
                    b.HasOne("GoGoodServer.Models.Post", "Post")
                        .WithMany("Recommendation")
                        .HasForeignKey("PostId");

                    b.HasOne("GoGoodServer.Models.UserGoGood", "WhoGaveGotIt")
                        .WithMany("Recommendation")
                        .HasForeignKey("WhoGotItId")
                        .HasConstraintName("FK__Post__WhoGotIt__CustomName");

                    b.Navigation("Post");

                    b.Navigation("WhoGaveGotIt");
                });

            modelBuilder.Entity("GoGoodServer.Models.EnumProfession", b =>
                {
                    b.Navigation("GivingHelpPerProfessions");

                    b.Navigation("Posts");
                });

            modelBuilder.Entity("GoGoodServer.Models.Post", b =>
                {
                    b.Navigation("GivingHelpOwnerPosts");

                    b.Navigation("Recommendation");
                });

            modelBuilder.Entity("GoGoodServer.Models.StatusType", b =>
                {
                    b.Navigation("Posts");
                });

            modelBuilder.Entity("GoGoodServer.Models.UserGoGood", b =>
                {
                    b.Navigation("GivingHelpOwnerPosts");

                    b.Navigation("GivingHelpPerProfessions");

                    b.Navigation("Posts");

                    b.Navigation("Recommendation");
                });
#pragma warning restore 612, 618
        }
    }
}
