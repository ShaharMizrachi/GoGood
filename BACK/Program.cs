global using GoGoodServer.Services.UserService;
global using GoGoodServer.Services.LoggerService;
using System.Text;
using System.Text.Json.Serialization;
using GoGoodServer.Models;
using Microsoft.AspNetCore.Http.Features;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using GoGoodServer.Services.AwsSettings;
using GoGoodServer.Services.OtpTokenService;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using FirebaseAdmin.Messaging;
using GoGoodServer.Services.FirebaseService;
using GoGoodServer.Services.SpService;
using Amazon.SecretsManager.Model;
using Amazon.SecretsManager;
using Newtonsoft.Json;
using Amazon;
using System.Text.Json.Nodes;
using Newtonsoft.Json.Linq;
using GoGoodServer.Services.ControlerService;
using GoGoodServer.Services.MailerService;
using GoGoodServer.Services.PostsSquaduler;
using GoGoodServer.Monitor;
using Microsoft.Extensions.Options;
using System.Configuration;
using Hangfire;
using Hangfire.MySql;

var webApplicationOptions = new WebApplicationOptions
{
    ContentRootPath = AppContext.BaseDirectory,
    Args = args,

};
var builder = WebApplication.CreateBuilder(webApplicationOptions);


builder.WebHost.UseUrls("http://localhost:8080");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILogger_DB, Logger_DB>();
builder.Services.AddScoped<IFirebaseService, FirebaseService>();
builder.Services.AddScoped<ISpService, SPService>();
builder.Services.AddScoped<IAwsService, AwsService>();
builder.Services.AddScoped<IControlerService, ControlerService>();
builder.Services.AddSingleton<SmtpConfig>();  // for mail configuration 
builder.Services.Configure<SmtpConfig>(builder.Configuration.GetSection("SmtpSettings"));
builder.Services.AddScoped<IMailerService, MailerService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<GoGoodServer.Monitor.Tasks.Posts>();

//var postsSquaduler = new PostsSquaduler();
//Task.Run(() => postsSquaduler);



static async Task SendPushNotification()
{
    try
    {
        var AwsService = new AwsService();
        dynamic secretObjectTask = AwsService.SecretManagerPulldata<dynamic>("FireBase_PushService");
        dynamic secretObject = await secretObjectTask;
        string secretvalue = secretObject.FireBase_PushService;
        var secretvalueObject = JsonConvert.DeserializeObject<FirebasePrivayeKey>(secretvalue);
        string SecretjsonKey = JsonConvert.SerializeObject(secretvalueObject);

        FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromJson(SecretjsonKey),
        });
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.ToString());
    }
}

Task.Run(() => SendPushNotification()).Wait();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    });
});



//Configure.ConfigureServices(builder.Services, builder.Configuration);
//Configure.ConfigureHangfireJobs();


string hangfireConnectionString = builder.Configuration.GetConnectionString("HangfireDBContext");
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseStorage(
        new Hangfire.MySql.MySqlStorage(
            hangfireConnectionString,
            new MySqlStorageOptions
            {
                QueuePollInterval = TimeSpan.FromSeconds(10),
                JobExpirationCheckInterval = TimeSpan.FromHours(1),
                CountersAggregateInterval = TimeSpan.FromMinutes(5),
                PrepareSchemaIfNecessary = true,
                DashboardJobListLimit = 25000,
                TransactionTimeout = TimeSpan.FromMinutes(1),

            }
        )
    ));

builder.Services.AddHangfireServer(options => options.WorkerCount = 1);



//add auth to swagger
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Stadart auth header using Bearer schema",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
////add auth 
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSetting:Token").Value)),
//            ValidateIssuer = false,
//            ValidateAudience = false
//        };
//    });
builder.Services.AddDbContext<GoGoodDBContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("GoGoodDBContext") ?? throw new InvalidOperationException("Connection string 'GoGoodDBContext' not found."), new MySqlServerVersion(new Version(8, 0, 23))));

builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});


builder.Services.Configure<AwsS3Settings>(builder.Configuration.GetSection("AWS:S3"));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();


app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseHangfireDashboard();
app.UseHangfireServer(new BackgroundJobServerOptions
{
    WorkerCount = 1,
    Queues = new[] { "jobqueue" },
    ServerName = "HangfireJobServer",
});
app.ScheduleTasks();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();


app.Run();
