
-- finished
--drop proc ProffesionsMixLanguages
CREATE PROC ProffesionsMixLanguages
AS Begin
	SELECT EnumProfession.id,EnumProfession.category,EnumProfession.icon,traslator.he 
	FROM EnumProfession
	LEFT JOIN traslator
	ON EnumProfession.category=traslator.en
end
GO
-- execProffesionsMixLanguages 
----------------------------------------------------------------
USE [GoGood]
GO
--drop proc AllPostFromCategoryPending
--All Posts From Category like profesional person in gettingHelp Pending (all post does not beloge to someone except himselfcin cavse of both)   
CREATE PROC AllPostFromCategoryPending 
@idGivingHelp INT
AS Begin
	select * from Post where  Post.StatusTypeId=1 and Post.GettingHelpId!=@idGivingHelp and  Post.categoryId 
		in (select categoryId from GivingHelpPerProfession where GivingHelpPerProfession.GivingHelpId=@idGivingHelp )
end
GO
-- execAllPostFromCategoryPending 1

----------------------------------------------------------------
USE [GoGood] 
GO
--getting all post belong to pro in status 2 and 3 
--drop proc Getting_GivingHelpOwnerPost
Create Proc Getting_GivingHelpOwnerPost
@idGivingHelp INT
AS Begin
	Select Post.*  from Post join GivingHelpOwnerPost   on Post.id=GivingHelpOwnerPost.postId AND @idGivingHelp=GivingHelpOwnerPost.GivingHelpId where Post.StatusTypeId in (2,3,4) 
end
Go
---- execGetting_GivingHelpOwnerPost 7
------------------------------------------------------------------------

------------------------------------------------------------------------

USE [GoGood]
GO
--drop proc GetUserByNumber
Create Proc GetUserByNumber
@number nvarchar(50)
AS Begin
	select * from UserGoGood where phone=@number
end
Go
---- execGetUserByNumber '050444'


-------------------------------------------------
-- detaching post from GivingHelp by removing row from table 


USE [GoGood]
GO
--drop proc detachingPostByPostId
Create Proc detachingPostByPostId
@postId INT
AS Begin
	DELETE FROM GivingHelpOwnerPost where @postId=GivingHelpOwnerPost.postId 
end
Go
-- execdetachingPostByPostId 28

----------------------------------------------------------------
-- getting all post that belongs to gettingHelp person by id and found in status 3 or 4 
-- the id in cul 2 id is the post id 
USE [GoGood]
GO
--drop proc ApplicationsApprovedByGettingHelp

Create Proc ApplicationsApprovedByGettingHelp
@idGettingHelp INT
AS Begin
	select  GivingHelpOwnerPost.GivingHelpId ,GivingHelpOwnerPost.id as IdGivingHelpOwnerPost, Post.* from GivingHelpOwnerPost inner join Post on  Post.id=GivingHelpOwnerPost.postId and (Post.StatusTypeId=3 or Post.StatusTypeId=4) where Post.GettingHelpId=@idGettingHelp 
end
Go
-- execApplicationsApprovedByGettingHelp 1
------------------------------------------------------------------------
-- getting all post that belongs to gettingHelp person by id and found in status 1 or 2 
USE [GoGood]
GO
--drop proc ApplicationsPannding
Create Proc ApplicationsPannding
@idGettingHelp INT
AS Begin
	select ISNULL(GivingHelpOwnerPost.GivingHelpId,0) as GivingHelpId, Post.*
	from Post Left Join GivingHelpOwnerPost on Post.id = GivingHelpOwnerPost.postId
	Where (Post.StatusTypeId = 1 Or Post.StatusTypeId = 2) And Post.GettingHelpId = @idGettingHelp;
end
Go
-- execApplicationsPannding 1
------------------------------------------------------------------------

USE [GoGood]
GO

-- getting all categories of givingHelp person working with
--drop proc GivingHelpcategories 
Create Proc GivingHelpcategories 
@idGivingHelp INT
AS Begin
	Select categoryId from GivingHelpPerProfession where GivingHelpPerProfession.GivingHelpId = @idGivingHelp 
end
Go
-- execGivingHelpcategories 7
------------------------------------------------------------------------
USE [GoGood]
GO
--updating GivingHelp categories 
--drop Proc UpdateCategoriesForGivingHelp 
Create Proc UpdateCategoriesForGivingHelp 
@idGivingHelp INT,
@remove_List_categories nvarchar(200),
@add_List_categories nvarchar(200)
AS Begin
	IF @remove_List_categories!=''
		Begin
			Delete from GivingHelpPerProfession 
			Where GivingHelpPerProfession.givingHelpId = @idGivingHelp And GivingHelpPerProfession.categoryId in (SELECT Value FROM STRING_SPLIT(@remove_List_categories, ','))
		end
	IF @add_List_categories!=''
		Begin
			INSERT INTO GivingHelpPerProfession(givingHelpId,categoryId) SELECT @idGivingHelp,Value FROM STRING_SPLIT(@add_List_categories, ',')
		end
end
-- execUpdateCategoriesForGivingHelp 7, "5", "8" --(GivingHelpId,Remove Categories Id,Add Categories Id) 
-------------------------------------------------------------------------------------------------------------------------

GO
-- getting recommendtion for post about givinghelp by postId  

Create Proc getRecommendationsForPost
@idPost INT
AS Begin
	Select recommendation.* from recommendation join GivingHelpOwnerPost on recommendation.GivingHelpOwnerPostId = GivingHelpOwnerPost.id and @idPost=GivingHelpOwnerPost.postId
end
Go
-- execgetRecommendationsForPost 32
 
 ---------------------------------------------------------------------------------------------------------------------------------
 USE [GoGood]
GO
 --getting the avarege rate of givingHelp by his id 
 
Create Proc getAvgRateByGivingHelpId
@idGivingHelpId INT
AS Begin
	 	Select statisticRate = avg(rate) from recommendation join GivingHelpOwnerPost on recommendation.GivingHelpOwnerPostId = GivingHelpOwnerPost.id where  GivingHelpId=@idGivingHelpId
end
Go
-- execgetAvgRateByGivingHelpId 14



-----------------------------------------------------------------------------------------------------------------------------------------

USE [GoGood]
GO
-- getting the amount of requset from gettingHelp group by category find by  GettingHelpId

Create Proc GettingHelpIdAmountOfRequset
@idGettingHelpId INT
AS Begin
SELECT requsts_counterGettingHelp =count(GettingHelpId),categoryId from Post where GettingHelpId=@idGettingHelpId group by categoryId 
end
Go
-- execGettingHelpIdAmountOfRequset 7


------------------------------------------------------------------------------------------------------------------------------
USE [GoGood]
GO
-- getting the amount of work answer by GivingHelp at status 2 and above group by categoryId and filtered by GivingHelpId 

Create Proc AmountOfrequestBelongToPro
@idGivingHelpId INT
AS Begin
SELECT GivingHelp_counterWork=count(GivingHelpId),categoryId from GivingHelpOwnerPost join Post on GivingHelpOwnerPost.postId=Post.id where GivingHelpId=@idGivingHelpId group by categoryId 
end
Go
-- execAmountOfrequestBelongToPro 7

------------------------------------------------------------------------------------------------------------------------------------
USE [GoGood]
GO
--getting the amount of request by  GettingHelpId vs the general amount 
		
Create Proc GettingHelpIdAmountOfrequestNumber
@idGettingHelpId INT
AS Begin
SELECT requsts_counterGettingHelp =count(GettingHelpId) from Post   
UNION
SELECT requsts_counterGettingHelp =count(GettingHelpId)from Post where GettingHelpId=@idGettingHelpId end
Go
-- execGettingHelpIdAmountOfrequestNumber 7

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
USE [GoGood]
GO
--getting the amount of request belong to   gevingHelp vs the general amount 

Create Proc GivingHelpIdAmountOfrequestNumber
@IdGivingHelp INT
AS Begin
SELECT GivingHelp_counterWork=count(GivingHelpId) from GivingHelpOwnerPost
UNION
SELECT GivingHelp_counterWork=count(GivingHelpId) from GivingHelpOwnerPost where GivingHelpId=@IdGivingHelp
end
Go
-- execGivingHelpIdAmountOfrequestNumber 7








