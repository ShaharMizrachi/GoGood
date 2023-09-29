#1.
/*SP Description:  getting all post that belongs to gettingHelp person by id and found in status 1,2,3,4
 the id in cul 2 id is the post id */ 
#DROP PROCEDURE IF EXISTS GetAllUserPostsByStatus;
USE GoGood;
DELIMITER $$
Create PROCEDURE GetAllUserPostsByStatus(IN idGettingHelp INT)
Begin
	select * from Post where Post.GettingHelpId=idGettingHelp and Post.StatusTypeId IN (1,2,3,4);
END $$
DELIMITER ;
#call GetAllUserPostsByStatus(37); 


------------------------------------------------------------------------------------------------
#2.
/*SP Description:  getting all requests post  belongs to all giving help except the giving help user that in the system right now.
 the id in cul 2 id is the post id
 get all post from status 1-3
 */ 
#DROP PROCEDURE IF EXISTS getPostsExcludingUser;
USE GoGood;
DELIMITER $$
Create PROCEDURE getPostsExcludingUser(IN idGettingHelp INT)
Begin
	select * from Post where Post.GettingHelpId!=idGettingHelp and Post.StatusTypeId IN (1,2,3);
END $$
DELIMITER ;
#call getPostsExcludingUser(37); 




#------------------------------------------------------------------------------------------
#3.
DROP PROCEDURE IF EXISTS GoGood.ProffesionsMixLanguages;
DELIMITER $$
CREATE PROCEDURE ProffesionsMixLanguages()
BEGIN
	SELECT EnumProfession.id, EnumProfession.category, EnumProfession.icon, traslator.he 
	FROM GoGood.EnumProfession
	LEFT JOIN GoGood.traslator
	ON GoGood.EnumProfession.category = GoGood.traslator.en;
END $$
DELIMITER ;
call ProffesionsMixLanguages(); 


#----------------------------------------------------------------
#4.
#SP Description: All Posts From Category like profesional person in gettingHelp Pending (all post does not beloge to someone except himself in case user from type both)   
USE GoGood;
#DROP PROCEDURE IF EXISTS AllPostFromCategoryPending;
DELIMITER $$
CREATE PROCEDURE AllPostFromCategoryPending(IN idGivingHelp INT) 
Begin
	select * from Post where  Post.StatusTypeId=1 and Post.GettingHelpId!=idGivingHelp and  Post.categoryId 
		in (select categoryId from GivingHelpPerProfession where GivingHelpPerProfession.GivingHelpId=idGivingHelp );
END $$
DELIMITER ;
#call AllPostFromCategoryPending(1);
----------------------------------------------------------------
#5.
#SP Description: getting all post belong to pro in status 2 and 3 
USE GoGood;
#DROP PROCEDURE IF EXISTS Getting_GivingHelpOwnerPost;
DELIMITER $$
Create PROCEDURE Getting_GivingHelpOwnerPost(IN idGivingHelp INT)
Begin
	Select Post.*  from Post join GivingHelpOwnerPost   on Post.id=GivingHelpOwnerPost.postId AND idGivingHelp=GivingHelpOwnerPost.GivingHelpId where Post.StatusTypeId in (2,3,4) ;
END $$
DELIMITER ;
#call Getting_GivingHelpOwnerPost(7);
------------------------------------------------------------------------
#6.
USE GoGood;
#DROP PROCEDURE IF EXISTS GoGood.GetUserByNumber
DELIMITER $$
Create PROCEDURE GetUserByNumber(IN number VARCHAR(50))
Begin
	select * from GoGood.UserGoGood where phone= number;
END $$
DELIMITER ;
USE GoGood;
CALL GetUserByNumber('0526965341');


select * from GoGood.GivingHelpPerProfession where GoGood.GivingHelpPerProfession.GivingHelpId=28;
select * from GoGood.UserGoGood where id=37;

DELETE FROM GoGood.GivingHelpPerProfession where GoGood.GivingHelpPerProfession.GivingHelpId=37;
DELETE FROM GoGood.UserGoGood WHERE id = 37;



#-------------------------------------------------
#7.
#SP Description: detaching post from GivingHelp by removing row from table 
USE GoGood;
#DROP PROCEDURE IF EXISTS  detachingPostByPostId;
DELIMITER $$
Create PROCEDURE detachingPostByPostId(IN postId INT)
 Begin
	DELETE FROM GivingHelpOwnerPost where GivingHelpOwnerPost.postId=postId;
END $$
DELIMITER ;
#call detachingPostByPostId(11);
#----------------------------------------------------------------
#8.
/*SP Description:  getting all post that belongs to gettingHelp person by id and found in status 3 or 4 
 the id in cul 2 id is the post id */ 
USE GoGood;
#DROP PROCEDURE IF EXISTS ApplicationsApprovedByGettingHelp;
DELIMITER $$
Create PROCEDURE ApplicationsApprovedByGettingHelp(IN idGettingHelp INT)
Begin
	select  GivingHelpOwnerPost.GivingHelpId ,GivingHelpOwnerPost.id as IdGivingHelpOwnerPost, Post.* from GivingHelpOwnerPost inner join Post on  Post.id=GivingHelpOwnerPost.postId and (Post.StatusTypeId=3 or Post.StatusTypeId=4) where Post.GettingHelpId=idGettingHelp;
END $$
DELIMITER ;
#call ApplicationsApprovedByGettingHelp(37); 
#------------------------------------------------------------------------
#9.
#SP Description:  getting all post that belongs to gettingHelp person by id and found in status 1 or 2 

#DROP PROCEDURE IF EXISTS ApplicationsPannding;
USE GoGood;
DELIMITER $$
Create PROCEDURE ApplicationsPannding(IN idGettingHelp INT)
Begin
	select DISTINCT IFNULL(GivingHelpOwnerPost.GivingHelpId,0) as GivingHelpId, Post.*
	from Post Left Join GivingHelpOwnerPost on Post.id = GivingHelpOwnerPost.postId
	Where (Post.StatusTypeId = 1 Or Post.StatusTypeId = 2) And Post.GettingHelpId = idGettingHelp;
END $$
DELIMITER ;
#call ApplicationsPannding(37); 

#------------------------------------------------------------------------
#10.
#SP Description:  getting all categories of givingHelp person working with
USE GoGood;
#DROP PROCEDURE IF EXISTS  GivingHelpcategories; 
DELIMITER $$
Create PROCEDURE GivingHelpcategories (idGivingHelp INT)
Begin
	Select categoryId from GivingHelpPerProfession where GivingHelpPerProfession.GivingHelpId = idGivingHelp;
END $$
DELIMITER ;
#call GivingHelpcategories(7)
------------------------------------------------------------------------
#11.
#shahar checked  not sure about that 
#SP Description: updating GivingHelp categories 
USE GoGood;
#DROP PROCEDURE IF EXISTS UpdateCategoriesForGivingHelp 
DELIMITER $$
CREATE PROCEDURE UpdateCategoriesForGivingHelp (
    IN idGivingHelp INT,
    IN remove_List_categories TEXT,
    IN add_List_categories TEXT
)
BEGIN
    IF remove_List_categories != '' THEN
        DELETE FROM GivingHelpPerProfession
        WHERE GivingHelpPerProfession.givingHelpId = idGivingHelp AND GivingHelpPerProfession.categoryId IN (
            SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(remove_List_categories, ',', numbers.n), ',', -1) AS Value
            FROM (
                SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
            ) numbers
            WHERE n <= 1 + LENGTH(remove_List_categories) - LENGTH(REPLACE(remove_List_categories, ',', ''))
        );
    END IF;
    IF add_List_categories != '' THEN
        INSERT INTO GivingHelpPerProfession (givingHelpId, categoryId)
        SELECT idGivingHelp, SUBSTRING_INDEX(SUBSTRING_INDEX(add_List_categories, ',', numbers.n), ',', -1) AS Value
        FROM (
            SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
        ) numbers
        WHERE n <= 1 + LENGTH(add_List_categories) - LENGTH(REPLACE(add_List_categories, ',', ''));
    END IF;
END $$
DELIMITER ;

 #CALL UpdateCategoriesForGivingHelp(7, '5', '8');
  
/*-------------------------------------------------------------------------------------------------------------------------
#11. --old--
#SP Description: getting recommendtion for post about givinghelp by postId  
USE GoGood;
#DROP PROCEDURE IF EXISTS getRecommendationsForPost;
DELIMITER $$
Create PROCEDURE getRecommendationsForPost(IN idPost INT)
Begin
	Select recommendation.* from recommendation join GivingHelpOwnerPost on recommendation.GivingHelpOwnerPostId = GivingHelpOwnerPost.id and GivingHelpOwnerPost.postId=idPost;
END $$
DELIMITER ;
#call getRecommendationsForPost (7);

/* shahar check again
 select * from recommendation ;
 	Select * from recommendation join GivingHelpOwnerPost on recommendation.GivingHelpOwnerPostId = GivingHelpOwnerPost.id and GivingHelpOwnerPost.postId=33;
*/
#--------------------------------------------------------------------------------------------
#12.
USE GoGood;
DELIMITER $$
Create PROCEDURE getAllWhoGaveItRecommendationsByUserId(IN UserId INT)
Begin
	Select *  from recommendation where  recommendation.WhoGaveItId = UserId;
END $$
DELIMITER ;
# CALL getAllWhoGaveItRecommendationsByUserId('1');
#--------------------------------------------------------------------------------------------
#13. description : get all recommendtions users put on specific user, returning also the name of the user who gave the recommendtions 
USE GoGood;
#DROP PROCEDURE IF EXISTS getAllWhoGotItRecommendationsByUserId 
DELIMITER $$
Create PROCEDURE getAllWhoGotItRecommendationsByUserId(IN UserId INT)
Begin
	#Select *  from recommendation where  recommendation.WhoGotItId = UserId;
	Select GoGood.recommendation.*,
    GoGood.UserGoGood.fullName as nameGaveRec,
    GoGood.UserGoGood.phone as phoneGaveRec,
    GoGood.UserGoGood.userType as userTypeGaveRec
    from GoGood.recommendation 
    inner join 
    GoGood.UserGoGood 
    on GoGood.recommendation.WhoGaveItId= GoGood.UserGoGood.id 
    where GoGood.recommendation.WhoGotItId = UserId;
END $$
DELIMITER ;
#USE GoGood;
#CALL getAllWhoGotItRecommendationsByUserId('55');

#--------------------------------------------------------------------------------------------
# 14.
USE GoGood;
#DROP PROCEDURE IF EXISTS getAllWhoGotItRecommendationsBypostId
DELIMITER $$
Create PROCEDURE getAllRecommendationsBypostId(IN postId INT)
Begin
	Select *  from recommendation where  recommendation.postId = postId ;
END $$
DELIMITER ;

#CALL getAllWhoGotItRecommendationsBypostId(1);
 #--------------------------------------------------------------------------------------------
 #12.old not in use 
 #SP Description: getting the avarege rate of givingHelp by his id 
-- USE GoGood;
-- DROP PROCEDURE IF EXISTS getAvgRateByGivingHelpId
--  DELIMITER $$
-- Create PROCEDURE getAvgRateByGivingHelpId(IN idGivingHelpId INT)
-- Begin
-- 	 	Select   avg(rate) as statisticRate from recommendation join GivingHelpOwnerPost on recommendation.GivingHelpOwnerPostId = GivingHelpOwnerPost.id where  GivingHelpOwnerPost.GivingHelpId=idGivingHelpId;
-- END $$
-- DELIMITER ;
-- call getAvgRateByGivingHelpId(14)
#------------------------------------------------------------------------------------------------------------
# 15. avg rate on user (does not metter if user give or get)
USE GoGood;
 DELIMITER $$
Create PROCEDURE getUserAvgRateByUserId(IN userId INT)
Begin
SELECT avg(rate) as statisticRate  FROM GoGood.recommendation where GoGood.recommendation.WhoGotItId=userId ;
END $$
DELIMITER ;

#Call  getUserAvgRateByUserId(1)
#-----------------------------------------------------------------------------------------------------------------------------------------
#16. SP Description: getting the amount of requset from gettingHelp group by category find by  GettingHelpId
USE GoGood;
#DROP PROCEDURE IF EXISTS GettingHelpIdAmountOfRequset
DELIMITER $$
Create PROCEDURE GettingHelpIdAmountOfRequset(IN idGettingHelpId INT)
Begin
SELECT  count(GettingHelpId) as requsts_counterGettingHelp,categoryId from Post where Post.GettingHelpId=idGettingHelpId group by categoryId;
END $$
DELIMITER ;
#call GettingHelpIdAmountOfRequset(7) ;
#------------------------------------------------------------------------------------------------------------------------------
#17.
#SP Description: getting the amount of work answer by GivingHelp at status 2 and above group by categoryId and filtered by GivingHelpId 
 USE GoGood;
#DROP PROCEDURE IF EXISTS AmountOfrequestBelongToPro;
 DELIMITER $$
Create PROCEDURE AmountOfrequestBelongToPro(IN idGivingHelpId INT)
Begin
SELECT count(GivingHelpId) as GivingHelp_counterWork,categoryId from GivingHelpOwnerPost join Post on GivingHelpOwnerPost.postId=Post.id where GivingHelpOwnerPost.GivingHelpId=idGivingHelpId group by categoryId;
END $$
DELIMITER ;

#call AmountOfrequestBelongToPro(7);
#------------------------------------------------------------------------------------------------------------------------------------
#18.
#SP Description: getting the amount of request by  GettingHelpId vs the general amount 		
USE GoGood;
#DROP PROCEDURE IF EXISTS GettingHelpIdAmountOfrequestNumber
DELIMITER $$
CREATE PROCEDURE GettingHelpIdAmountOfrequestNumber(IN idGettingHelpId INT)
BEGIN
    SELECT COUNT(*) AS requsts_counterGettingHelp FROM GoGood.Post
    UNION
    SELECT COUNT(*) AS requsts_counterGettingHelp FROM GoGood.Post WHERE GettingHelpId = idGettingHelpId;
END $$
DELIMITER ;

#CALL GettingHelpIdAmountOfrequestNumber(7)
#-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#19.
#SP Description: getting the amount of request belong to   gevingHelp vs the general amount 
USE GoGood;
#DROP PROCEDURE IF EXISTS GivingHelpIdAmountOfrequestNumber
DELIMITER $$
CREATE PROCEDURE GivingHelpIdAmountOfrequestNumber(IdGivingHelp INT)
BEGIN
    SELECT count(*) as GivingHelp_counterWork FROM GivingHelpOwnerPost
    UNION
    SELECT count(*) as GivingHelp_counterWork FROM GivingHelpOwnerPost WHERE GivingHelpId = IdGivingHelp;
END $$
DELIMITER ;
#CALL GivingHelpIdAmountOfrequestNumber(7); 
#-------------------------------------------------------------------------------------------------------
# 20. get all posts in status 4  by getHelp user id, bring the id of who gave the help 
USE GoGood;
#DROP PROCEDURE IF EXISTS GetAllPostsOfGetHelpClosed 
DELIMITER $$
CREATE PROCEDURE GetAllPostsOfGetHelpClosed (IN idGettingHelp INT)
BEGIN
	select P.*,O.GivingHelpId from GoGood.Post as P inner join GoGood.GivingHelpOwnerPost as O on P.id=O.postId where P.GettingHelpId= idGettingHelp and P.StatusTypeId=4;
END $$
DELIMITER ;

#Call GetAllPostsOfGetHelpClosed(21);



#---------------------------------------------------------------------------

# 21. get all post in status 4  by gaveHelp user id, bring the id's who get the help 

USE GoGood;
#DROP PROCEDURE IF EXISTS GetAllPostsOfGivingHelpClosed 
DELIMITER $$
CREATE PROCEDURE GetAllPostsOfGivingHelpClosed (IN idGivingHelp INT)
BEGIN
	select P.*,O.GivingHelpId from GoGood.Post as P inner join GoGood.GivingHelpOwnerPost as O on P.id=O.postId  where O.GivingHelpId=idGivingHelp and P.StatusTypeId=4;
END $$
DELIMITER ;

#call GetAllPostsOfGivingHelpClosed (7)


----------------------------------------------------------------------------------------------------
#22

USE GoGood;
#DROP PROCEDURE IF EXISTS GetGivingHelpOwnersPostsByPostId; 
DELIMITER $$
CREATE PROCEDURE GetGivingHelpOwnersPostsByPostId (IN postId INT)
BEGIN
	#select G.GivingHelpId as GivingHelpId from GoGood.GivingHelpOwnerPost as G where G.postId=postId;
    select U.*  from GoGood.GivingHelpOwnerPost as G inner join GoGood.UserGoGood as U on G.GivingHelpId=U.id where G.postId=postId;
END $$
DELIMITER ;

USE GoGood;
call GetGivingHelpOwnersPostsByPostId (8);
USE GoGood;



USE GoGood;
DELETE FROM GoGood.GivingHelpOwnerPost;
DELETE FROM GoGood.recommendation;
DELETE FROM GoGood.Post;

Select * from GoGood.Post;







#----------------------------------------------------------------------------------------------------
#23
#desciption: checks if user already has account
USE GoGood;
#DROP PROCEDURE IF EXISTS ifUserWasBeforeInApp ; 
DELIMITER $$
CREATE PROCEDURE ifUserWasBeforeInApp (IN imei varchar(100))
BEGIN
	select G.imei  from GoGood.UserGoGood as G where G.imei=imei;
END $$imei
DELIMITER ;


#USE GoGood;
#call ifUserWasBeforeInApp ('010341007170810')
#------------------------------------------------------------------------------------
#24
#desciption: get rate of post by id 
USE GoGood;
#DROP PROCEDURE IF EXISTS  ; 

#----------------------------------------------------------------------------------------------------
#25
#desciption: get push massage by id

#DROP PROCEDURE IF EXISTS getPushMessageById;
USE GoGood;
DELIMITER $$
CREATE PROCEDURE getPushMessageById (IN idSent int)
BEGIN
	SELECT * FROM GoGood.PushNotificationMessages WHERE GoGood.PushNotificationMessages.id = idSent;
END $$
DELIMITER ;

USE GoGood;
call getPushMessageById (2);

#------------------------------------------------------------------------------------------
# description: delete user

DROP PROCEDURE IF EXISTS GoGood.deleteUser;

USE GoGood;
DELIMITER $$
CREATE PROCEDURE deleteUser (IN userId int)
BEGIN
	
    DECLARE userTypeValue VARCHAR(50);
    select '** Place your mesage here' AS '** DEBUG:';

    SELECT userType INTO userTypeValue
    FROM GoGood.UserGoGood
    WHERE GoGood.UserGoGood.id = userId;

	
    -- Create a temporary table to store the result
    CREATE TEMPORARY TABLE IF NOT EXISTS TempTable (postId INT);
    
    
    IF userTypeValue = 'GettingHelp' THEN
    
        -- Insert all the matching post ids into the temporary table
        
        INSERT INTO TempTable
        SELECT id
        FROM GoGood.Post as post
        WHERE post.GettingHelpId = userId and post.StatusTypeId IN (1,2,3);
        
        
       
        DELETE FROM GoGood.GivingHelpOwnerPost as OwnerPost 
        WHERE OwnerPost.postId IN (SELECT postId FROM TempTable); 
        
       --  delete the posts from 
        DELETE FROM GoGood.Post
        WHERE id IN (SELECT postId FROM TempTable);
        
      
      
    ELSE
	-- Handle  cases for GivingHelp
        
	-- Insert all the matching user ids and put posts into the temporary table
        INSERT INTO TempTable (postId)
        SELECT postId
        FROM GoGood.GivingHelpOwnerPost as post
        WHERE post.GivingHelpId = userId;

        --  delete the posts belong to pro  
        DELETE FROM GoGood.GivingHelpOwnerPost
        WHERE GoGood.GivingHelpOwnerPost.GivingHelpId = userId;

        --  upadte post status the posts 
        UPDATE GoGood.Post as postT
        set postT.StatusTypeId = 1
        WHERE postT.id IN (SELECT postId FROM TempTable)
        and postT.StatusTypeId IN (2,3);
        
    END IF;




    -- Change the User Details
		UPDATE GoGood.UserGoGood
		SET fullname = 'לא קיים',
			phone = CONCAT('00000', LPAD(FLOOR(1 + RAND() * 99999), 5, '0')),
			imgURL = '',
			FcmToken = NULL,
			isActive = false
		WHERE GoGood.UserGoGood.id = userId;
        
	DROP TEMPORARY TABLE IF EXISTS TempTable;
        
END $$
DELIMITER ;
DELIMITER //



USE GoGood;
DELIMITER $$
#DROP PROCEDURE IF EXISTS getFcmTokenByUserId;
CREATE PROCEDURE getFcmTokenByUserId(IN userId INT)
BEGIN
    DECLARE userFcmToken VARCHAR(255);
    
    SELECT FcmToken INTO userFcmToken
    FROM UserGoGood
    WHERE id = userId;
    
    SELECT userFcmToken AS FcmToken;
END $$

DELIMITER ;

Select * from GoGood.UserGoGood as g where g.id=46;
Select * from GoGood.Post as p where p.GettingHelpId=46;



USE GoGood;
call deleteUser (46);

