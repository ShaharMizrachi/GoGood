using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using GoGoodServer.Models;
using Microsoft.EntityFrameworkCore;
namespace GoGoodServer.Models
{
    public partial class GoGoodDBContext : DbContext
    {
        public GoGoodDBContext(MySql.Data.MySqlClient.MySqlConnection con)
        {
        }

        public GoGoodDBContext(DbContextOptions<GoGoodDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EnumProfession> EnumProfessions { get; set; }
        public virtual DbSet<GivingHelpOwnerPost> GivingHelpOwnerPosts { get; set; }
        public virtual DbSet<GivingHelpPerProfession> GivingHelpPerProfessions { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Recommendation> Recommendations { get; set; }
        public virtual DbSet<StatusType> StatusTypes { get; set; }
        public virtual DbSet<Traslator> Traslators { get; set; }
        public virtual DbSet<UserGoGood> UserGoGoods { get; set; }

        public virtual DbSet<OTP> OTP { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //    string connectionString = "Server=zigit.cluster-cucyzwcij5qr.eu-west-1.rds.amazonaws.com;Uid=zigit;Pwd=Zigit2023!;Database=GoGood;";
            //    optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 23)));
            //}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EnumProfession>(entity =>
            {
                entity.ToTable("EnumProfession");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Category)
                    .HasMaxLength(50)
                    .HasColumnName("category");

                entity.Property(e => e.Icon)
                    .HasMaxLength(250)
                    .HasColumnName("icon");
            });

            modelBuilder.Entity<GivingHelpOwnerPost>(entity =>
            {
                entity.ToTable("GivingHelpOwnerPost");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.HasOne(d => d.GivingHelp)
                    .WithMany(p => p.GivingHelpOwnerPosts)
                    .HasForeignKey(d => d.GivingHelpId)
                    .HasConstraintName("FK__GivingHel__Givin__14270015");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.GivingHelpOwnerPosts)
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("FK__GivingHel__postI__1332DBDC");
            });

            modelBuilder.Entity<GivingHelpPerProfession>(entity =>
            {
                entity.ToTable("GivingHelpPerProfession");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.GivingHelpPerProfessions)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__GivingHel__categ__07C12930");

                entity.HasOne(d => d.GivingHelp)
                    .WithMany(p => p.GivingHelpPerProfessions)
                    .HasForeignKey(d => d.GivingHelpId)
                    .HasConstraintName("FK__GivingHel__Givin__08B54D69");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("Post");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.Property(e => e.DateUpdete)
                    .HasColumnType("date")
                    .HasColumnName("dateUpdete");
                //.HasDefaultValueSql("(CONVERT([date],getdate(),(105)))");


                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longitude).HasColumnName("longitude");

                entity.Property(e => e.ProblemDescription)
                    .HasMaxLength(4000)
                    .HasColumnName("problemDescription");

                entity.Property(e => e.ProblemPic)
                    .HasMaxLength(3500)
                    .HasColumnName("problemPic");

                entity.Property(e => e.ProblemTitle)
                    .HasMaxLength(2000)
                    .HasColumnName("problemTitle");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Post__categoryId__0D7A0286");

                entity.HasOne(d => d.GettingHelp)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.GettingHelpId)
                    .HasConstraintName("FK__Post__GettingHel__0E6E26BF");

                entity.HasOne(d => d.StatusType)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.StatusTypeId)
                    .HasConstraintName("FK__Post__StatusType__0F624AF8");

                entity.Property(e => e.UpdatedTimestamp)
                    .HasColumnType("datetime")
                    .HasColumnName("updatedTimestamp");

            });
            // shahar
            modelBuilder.Entity<Recommendation>(entity =>
            {
                entity.ToTable("recommendation");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Rate).HasColumnName("rate");

                entity.Property(e => e.Review)
                    .HasMaxLength(3500)
                    .HasColumnName("review");

                entity.Property(e => e.PostId).HasColumnName("postId");


                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Recommendation)
                    .HasForeignKey(d => d.PostId);



                entity.HasOne(d => d.WhoGaveGotIt)
                    .WithMany(p => p.Recommendation)
                    .HasForeignKey(d => d.WhoGaveItId)
                    .HasConstraintName("FK__Post__WhoGaveIt__CustomName");


                entity.HasOne(d => d.WhoGaveGotIt)
                .WithMany(p => p.Recommendation)
                    .HasForeignKey(d => d.WhoGotItId)
                    .HasConstraintName("FK__Post__WhoGotIt__CustomName");

                entity.Property(e => e.reviewDate)
                  .HasColumnType("date")
                  .HasColumnName("reviewDate");

            });

            modelBuilder.Entity<StatusType>(entity =>
            {
                entity.ToTable("StatusType");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Icon)
                    .HasMaxLength(1500)
                    .HasColumnName("icon");

                entity.Property(e => e.StatusType1)
                    .HasMaxLength(50)
                    .HasColumnName("statusType");
            });

            modelBuilder.Entity<Traslator>(entity =>
            {
                entity.ToTable("traslator");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.En)
                    .HasMaxLength(70)
                    .HasColumnName("en");

                entity.Property(e => e.He)
                    .HasMaxLength(70)
                    .HasColumnName("he");
            });


            modelBuilder.Entity<Log>(entity =>
            {
                entity.ToTable("Log");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(3000)
                    .HasColumnName("description");

                entity.Property(e => e.Type).HasColumnName("Type");

                entity.Property(e => e.DateLogged)
                    .HasColumnName("DateLogged")
                    .ValueGeneratedOnAdd();
                entity.Property(e => e.LogLevel).HasColumnName("LogLevel");       
                entity.Property(e => e.StackTrace).HasColumnName("StackTrace");
            });


            modelBuilder.Entity<UserGoGood>(entity =>
            {
                entity.ToTable("UserGoGood");

                entity.HasIndex(e => e.Phone)
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FullName)
                    .HasMaxLength(50)
                    .HasColumnName("fullName");


                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .HasColumnName("phone");

                entity.Property(e => e.Imei)
                    .HasMaxLength(100)
                    .HasColumnName("imei");

                entity.Property(e => e.ImgUrl)
                    .HasMaxLength(250)
                    .HasColumnName("imgURL");


                entity.Property(e => e.UserDescription)
                    .HasMaxLength(1500)
                    .HasColumnName("UserDescription");


                entity.Property(e => e.FcmToken)
                    .HasMaxLength(1500)
                    .HasColumnName("FcmToken");

                entity.Property(e => e.UserType)
                    .HasMaxLength(50)
                    .HasColumnName("userType");

                entity.Property(e => e.IsActive)
                    .HasDefaultValue(1)
                    .HasColumnName("isActive");

            });


            modelBuilder.Entity<OTP>(entity =>
            {
                entity.ToTable("OTP");


                entity.HasIndex(e => e.Phone)
                   .IsUnique();


                entity.Property(e => e.Id).HasColumnName("id");


                entity.Property(e => e.Phone)
                     .HasMaxLength(15)
                    .HasColumnName("phone");

                entity.Property(e => e.OtpNumber)
                .HasMaxLength(15)
                .HasColumnName("otpNumber");

                entity.Property(e => e.RegistrationDateTime)
                    .HasColumnType("date")
                    .HasColumnName("registrationDateTime");

            });

            modelBuilder.Entity<PushNotificationMessages>(entity =>
            {

                entity.ToTable("PushNotificationMessages");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Title)
                    .HasMaxLength(200)
                    .HasColumnName("title");

                entity.Property(e => e.Body)
                     .HasMaxLength(200)
                    .HasColumnName("body");

                entity.Property(e => e.Comment)
                    .HasMaxLength(200)
                    .HasColumnName("comment");
            }

            );



            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<GoGoodServer.Models.Log> Log { get; set; }
    }
}
