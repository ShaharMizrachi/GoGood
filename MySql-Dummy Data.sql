USE GoGood;
INSERT INTO UserGoGood (fullName, phone, imgURL, imei, userType) VALUES
(N'מייקל גורדן','0502366499','https://randomuser.me/api/portraits/women/41.jpg' ,'010341007170810','Both'),
(N'אנגלינה גולי','0502366944','https://randomuser.me/api/portraits/women/50.jpg','354403053702203','Both'),
(N'אילון מאסק','0503155966','https://randomuser.me/api/portraits/men/38.jpg','353645054962308','Both'),
(N'וורן באפט','0503466977','https://randomuser.me/api/portraits/women/19.jpg','013092000946170','Both'),
(N'סוזי סטיבנס','0501977866','https://randomuser.me/api/portraits/women/83.jpg','356152045422457','Both'), 
(N'גוליה רובינסון','0501699788','https://randomuser.me/api/portraits/men/46.jpg','358796089177258','Both'),
(N'עמוס קינן','0504444444','https://randomuser.me/api/portraits/men/25.jpg','864267002854735','Both'),
(N'שושנה קיסר','0504334444','https://randomuser.me/api/portraits/women/65.jpg','353621032443224','Both'),
(N'קוקימה פלטנר','0504333444','https://randomuser.me/api/portraits/women/78.jpg','010240002067197','Both'),
(N'גרי פנדלבאום','0504332422','https://randomuser.me/api/portraits/men/30.jpg','010240002067197','Both'),
(N'נועה פטרסן','0501111111','https://randomuser.me/api/portraits/men/60.jpg','357809028528746','GivingHelp'),
(N'שושנה מזרחי','0502356109','https://randomuser.me/api/portraits/women/5.jpg','358321079236475','GivingHelp'),
(N'כריס בראון','0507899988','https://randomuser.me/api/portraits/women/68.jpg','356983057471184','GivingHelp'),
(N'אריאל יוספי','0507988699','https://randomuser.me/api/portraits/women/59.jpg','357378019631976','GivingHelp'),
(N'מרשל ברוס','0507966588','https://randomuser.me/api/portraits/women/57.jpg','990004527894517','GivingHelp'),
(N'שחר מזרחי','050799688','https://randomuser.me/api/portraits/women/45.jpg','351986065643798','GivingHelp'),
(N'סטיבן סיגל','0579655844','https://randomuser.me/api/portraits/men/47.jpg','358778059061548','GivingHelp'),
(N'סילבסטר סטלון','0516977466','https://randomuser.me/api/portraits/men/70.jpg','356565086131663','GivingHelp'),
(N'ארנולד שוורצנגר','0512366599','https://randomuser.me/api/portraits/women/33.jpg','356967062061361','GivingHelp'),
(N'זאן קלוד ואן דאם','0516977855','https://randomuser.me/api/portraits/men/11.jpg','359495081430125','GivingHelp'),
(N'בני ציצווה','0502222222','https://randomuser.me/api/portraits/men/74.jpg','010240002067197','GettingHelp'),
(N'יורם קפיטולניק','0504331443','https://randomuser.me/api/portraits/men/62.jpg','010240002067197','GettingHelp'),
(N'מיכה פורטוגלי','0504331441','https://randomuser.me/api/portraits/men/80.jpg','010247002067197','GettingHelp'),
(N'אילנה אילנה','0504331445','https://randomuser.me/api/portraits/women/9.jpg','010240002067197','GettingHelp'),
(N'יורם ארבל','0504124441','https://randomuser.me/api/portraits/men/44.jpg','864267002554735','GettingHelp'),
(N'גרשום שלום','0504234414','https://randomuser.me/api/portraits/men/40.jpg','353624032443224','GettingHelp'),
(N'ריאד אלימלך','0501333466','https://randomuser.me/api/portraits/men/8.jpg','010240032067197','GettingHelp'),
(N'אבנר עבדאללה','0504332421','https://randomuser.me/api/portraits/men/50.jpg','010240002067197','GettingHelp'),
(N'פואד גלזר','0504337443','https://randomuser.me/api/portraits/men/97.jpg','010240002067197','GettingHelp'),
(N'קלונימוס בוסקילה','0504371443','https://randomuser.me/api/portraits/men/79.jpg','010240002067197','GettingHelp'),
(N'אספסיאנוס מורדוך','0504731441','https://randomuser.me/api/portraits/men/31.jpg','0102403302067197','GettingHelp'),
(N'סולטנה קסטל','0504331471','https://randomuser.me/api/portraits/women/47.jpg','0102220002067197','GettingHelp'),
(N'בן ציון','0504331478','https://randomuser.me/api/portraits/men/89.jpg','010240002227197','GettingHelp'),
(N'בן ציון זהרה','0504331475','https://randomuser.me/api/portraits/women/62.jpg','010240005567197','GettingHelp'),
(N'מטילדה','0504331485','https://randomuser.me/api/portraits/women/2.jpg','0102400772067197','GettingHelp');

USE GoGood;
INSERT INTO EnumProfession (category, icon) VALUES
(N'repairst','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/Professionals-2.png'),
(N'clothes and games','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/Professionals-3.png'),
(N'ride and transportation','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/Professionals-4.png'),
(N'Home equipment','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/Professionals-5.png'),
(N'cleanliness','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/Professionals-6.png'),
(N'food and basic products','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/Professionals-7.png');
-----------------------------------------------------------------------------------------------------------------------


USE GoGood;
INSERT INTO StatusType (statusType,icon) VALUES
('pending to GivingHelp','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/stats-1.png'),
('pending to GettingHelp','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/stats-2.png'),
('active','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/stats-3.png'),
('closed','http://adishapiras.tempurl.co.il/wp-content/uploads/2022/09/stats-4.png'),
('deleted_pendingGivingHelp',''),
('deleted_pendingGettingHelp',''),
('deleted_pendingActive',''),
('deleted_closed','');
-------------------------------------------------------------------
USE GoGood;
INSERT INTO traslator (he, en)  VALUES
(N'תיקונים','repairst'),
(N'בגדים ומשחקים','clothes and games'),
(N'טרמפ והובלה','ride and transportation'),
(N'ציוד לבית','home equipment'),
(N'מזון ומוצרי בסיס','food and basic products');
-------------------------------------------------------------------

USE GoGood;
INSERT INTO GivingHelpPerProfession (categoryId, GivingHelpId) VALUES
  (1, 7), (2, 7), (3, 7), (4, 7), (5, 7), (8, 7), (12, 7),
  (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (10, 1),
  (1, 11), (2, 11), (5, 11), (7, 11), (9, 11), (10, 11), (11, 10), (12, 11),
  (3, 2), (4, 2), (5, 2), (6, 2),
  (9, 12), (8, 12), (10, 12),
  (5, 8), (8, 8),
  (4, 6), (6, 6),
  (1, 9), (3, 9), (5, 9),
  (9, 10), (10, 10),
  (9, 12), (10, 12), (11, 12), (4, 12),
  (9, 13), (10, 13), (11, 13), (12, 14), (1, 14), (7, 14),
  (5, 15), (6, 15), (7, 15),
  (4, 16), (5, 16), (6, 16), (7, 16),
  (4, 13);



-----------------------------------------------------------------------------------------------------------------------

INSERT INTO Post (categoryId, GettingHelpId, problemTitle, problemDescription, problemPic, StatusTypeId, dateUpdete, latitude, longitude) VALUES  /*categoryId(EnumProfession(id)),GettingHelpId(UserGoGood(id)),problemTitle,problemDescription,problemPic,StatusTypeId(StatusType(id)),dateUpdete,latitude,longitude */
(2,1,N'יש לי פיצוץ בצנרת',N'יש לי פיצוץ בצנרת חמור מאוד כל הבית שלי על המים  מישהו בא לשחות','https://www.tovtoda.co.il/images/articles/Plumber8.jpg#https://www.renovations-israel.co.il/wp-content/uploads/2018/02/burst-water-pipe.jpg#https://www.renovations-israel.co.il/wp-content/uploads/2018/02/burst-water-pipe2.jpg#',1,'2022-08-21',31.420931,34.589661),
(3,2,N'צריך להוריד את הדשא',N'צריך להוריד את הדשא הוא ארוך מאוד,קשה לי את רחוקה ממני','https://eco-garden.co.il/wp-content/uploads/2021/09/Eleusine-weeding.jpg#https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4PwyATTvaKm4i7nP3U0nOa9Vtg6ejkae7pgu4m-lVjnJhHP4Jc6d0mnvnmRf4ILULv0&usqp=CAU#',1,'2022-08-21',31.525700,34.599998),
(1,1,N'צריך להחליף נורה',N' צריך להחליף נורה, אני נמוכה מידי תעזרו לי בבקשה','https://ae01.alicdn.com/kf/HTB15c_ANVXXXXXEapXXq6xXFXXXM/ZX-LED.jpg#',1,'2022-08-21',32.085300,34.781769),
(4,1,N'יש לי גוק באוכל',N'יש לי גוק באוכל ואני צריכה מדביר שיעשה עבודה של מקצוענים','',1,'2022-08-21',32.085300,34.750280),
(5,1,N'יש לי לכלוך באוזן',N' יש לי לכלוך באוזן הימינית קשה לי לשמוע ','',1,'2022-08-21',32.016500,34.781769),
(6,1,N'נשברה לי השמשה של המשקפיים',N'נשברה לי השמשה של המשקפיים','http://cdn7.dissolve.com/p/D473_5_012/D473_5_012_0004_600.jpg#',1,'2022-08-21',32.016500,34.781769),
(7,21,N'המזגן שלי לא מקרר',N'המזגן שלי לא מקרר ,יש לי מלא גבינות שעומדות להתקלקל אני צריכה עזרה!','https://www.tovtoda.co.il/images/articles/air-conditioner_85080678_s-2015%20(1).jpg#https://www.tadiran-group.co.il/wp-content/uploads/2020/10/rsz_shutterstock_1131854678-1.jpg#',1,'2022-08-21',32.016500,34.781769),
(8,1,N'אבד לי המפתח של השכן',N'אבד לי המפתח של השכן, הוא נמצא בקומה החמישית יש צורך בפריצה','https://i.ytimg.com/vi/D-4akqAqc_o/maxresdefault.jpg#',1,'2022-08-21',32.016500,34.781769),
(2,5,N'יש לי סתימה בצנרת',N'יש לי סתימה בצנרת שפכתי מלא שמן,בזמן בישול שניצלים, למושיע יקבל שניצל של ממה עוף','https://flash24.co.il/wp-content/uploads/2020/12/%D7%A1%D7%AA%D7%99%D7%9E%D7%941-1024x576.jpg#https://i.ytimg.com/vi/mKvbH9WH-7Q/maxresdefault.jpg#',2,'2022-08-21',31.420931,34.589661),
(3,6,N'קיצוץ עץ בגינה',N' יש לי שעורה בעין מעץ בגינה שנכנס לי לעין צריך לקצץ אותו','https://img.mako.co.il/2013/03/21/157870157_i.jpg#',2,'2022-08-21',31.525700,34.599998),
(1,7,N'הכבל מאריך שלי מקצר ',N'הכבל מאריך שלי מקצר ויש לי ילדים שצריכים את זה בשביל המחשב','https://bizzness.net/wp-content/uploads/2021/07/technology-5226166_1280.jpg#https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qnE8CvEdf_6icjafJc_o03aaRazAA0F1Y65FbNiEJ10Urdj1MhEShf9qD-MDXe9fXuc&usqp=CAU#',2,'2022-08-21',32.085300,34.781769),
(4,8,N'יש לי נמלה אש בעוגיות',N'יש לי נמלה אש בעוגיות ואני צריכה מדביר דחוףףףףףףףף זה מסוכן ','https://img.mako.co.il/2014/05/13/pavlov_ants_16_c.jpg#https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWc2-h7qwCi1FEIfYogx9IR6-YPhAYZiD-wQ&usqp=CAU#',2,'2022-08-21',32.085300,34.750280),
(2,1,N'יש לי סתימה במקלחת',N'יש לי סתימה במקלחת אני חוזר מהעבודה ואין לי איך להתקלח','https://www.yadla5.org.il/wp-content/uploads/2022/05/drain__1652734989.jpg#https://www.ynet.co.il/PicServer5/2017/09/09/8023419/80234180990100640360no.jpg#',3,'2022-08-21',32.016500,34.781769),
(3,1,N'השיח שלי גדול',N'השיח שלי גדול צריך קיצוץ בזריז','https://anenet110.files.wordpress.com/2015/11/dscn9677.jpg#https://lirp.cdn-website.com/4456f91f/dms3rep/multi/opt/%D7%9E%D7%90%D7%9E%D7%A8+%D7%92%D7%9F+%D7%92%D7%93%D7%A8-1920w.png#',3,'2022-08-21',32.016500,34.781769),
(1,21,N'הטוסטר שלי לא עובד',N'הטוסטר שלי לא עובד אבל מי שיעזור יקבל טוסט גבינה צהובה ובלי בצל','https://shop.bondigo.co.il/wp-content/uploads/2020/01/%D7%98%D7%95%D7%A1%D7%98%D7%A8-%D7%92%D7%A8%D7%99%D7%9C-%D7%AA%D7%A2%D7%A9%D7%99%D7%99%D7%AA%D7%99-hot-point-XH811E.png#',3,'2022-08-21',32.029740,34.743290),
(4,21,N'יש לי גוקים בכל הבית',N'יש לי גוקים בכל הבית הם מתפסים לי על הקירות של אלינור ','',3,'2022-08-21',32.030080,34.743900),
(5,1,N'אין לי כוח לרחוץ כלים',N'אין לי כוח לרחוץ כלים נשבר לי אז מי בא לעזור?','http://magazine.yad2.co.il/wp-content/uploads/2018/12/744_1-006-2.jpg#',2,'2022-08-21',32.016690,34.743800),
(6,21,N'נשבר לי',N'נשבר לי כל הבית אני צריכה עזרה מיקצועית ודחופה','https://www.ambari.org.il/wp-content/uploads/2018/11/%D7%91%D7%99%D7%AA-%D7%94%D7%A8%D7%95%D7%A1.jpg#https://www.zhk.co.il/wp-content/uploads/2021/07/%D7%A0%D7%A4%D7%99%D7%9C%D7%94-%D7%98%D7%99%D7%9C-%D7%9E%D7%9C%D7%97%D7%9E%D7%AA-%D7%97%D7%91%D7%A0%D7%95%D7%9F-%D7%94%D7%A9%D7%A0%D7%99%D7%94-%D7%9C%D7%A9%D7%A2%D7%A8-%D7%94%D7%A4%D7%95%D7%A8%D7%98%D7%9C-660x330.jpg#',2,'2022-08-21',32.014150,34.741720),
(7,22,N'נגמר לי הגז',N'נגמר לי הגז ואני צריכה לישון עזרה','https://www.mizug-avir.org/files/tinymceuploads/670_blog_body_heb_5_1_1538052529.jpg#',2,'2022-08-21',32.015940,34.742660),
(8,1,N'ננעלתי מחוץ לבית',N' ננעלתי מחוץ לבית ויש פה וחתולים מסוכנים','https://ynet-images1.yit.co.il/picserver5/wcm_upload/2021/08/29/SyZKtB4KbY/___________________________________________________4_.jpeg#https://ynet-images1.yit.co.il/picserver5/wcm_upload/2021/08/29/S1gFFr4KZt/___________________________________________________3_.jpeg#https://d3m9l0v76dty0.cloudfront.net/system/photos/8997245/original/1c4a54eb5e988206137425a23f91e5fb.jpg#',2,'2022-08-21',32.015940,34.742660),
(5,2,N'עף לי הסכך',N'עף לי הסכך וכל הבית מלוכלך','https://img.yad2.co.il/Pic/202210/07/3_0/o/y2_1_05573_20221007112724.jpeg?l=5&c=3&w=280&h=280#',3,'2022-08-21',32.014150,34.741720),
(6,3,N'נשבר לי החלון',N'נשבר לי החלון הסלון וחדר השינה ','https://cdn.w600.comps.canstockphoto.co.il/%D7%A9%D7%91%D7%95%D7%A8-%D7%A1%D7%A4%D7%95%D7%AA-%D7%AA%D7%9E%D7%95%D7%A0%D7%94_csp21139715.jpg#https://previews.123rf.com/images/thomaseder/thomaseder1702/thomaseder170200052/72007283-box-and-bed-in-an-abandoned-broken-room.jpg#https://upload.wikimedia.org/wikipedia/commons/d/d3/Broken_window_large.jpg#',3,'2022-08-21',32.014150,34.741720),
(7,1,N'לא יודעת מה קורה לי אני אוהבת חם לי קר לי',N'לא יודעת מה קורה לי אני אוהבת חם לי קר לי המילים מתבלבלות לי','',3,'2022-08-21',32.030080,34.743900),
(8,5,N'ננעלתי מחוץ לבית של האקס',N'ננעלתי מחוץ לבית של האקס אני צריכה דחוף לקחת כמה דברים','',3,'2022-08-21',32.016500,34.781769),
(9,22,N'נצריך לדפוק משהו על העץ',N'צריך לדפוק משהו על העץ','https://discoverorgil.b-cdn.net/images/w400/19243890.jpg#https://i0.wp.com/www.emeryhorvath.com/wp-content/uploads/2016/04/nail-453782_960_720.jpg?fit=960%2C640&ssl=1#',3,'2022-08-21',32.085300,34.750280),
(10,1,N'צריך לעשות מעקה לגגי',N'צריך לעשות מעקה לגגי','https://i.ytimg.com/vi/yIemMmPmK7k/maxresdefault.jpg#https://soragdoor.com/wp-content/uploads/2020/03/5501.jpg#https://www.valex.co.il/wp-content/uploads/2017/08/maake-le-hazer-angli-klassi-r28.jpg#',3,'2022-08-21',31.420931,34.589661),
(11,1,N'יש לי ריח לא נעים בבית',N'יש לי ריח לא נעים בבית','https://www.mizugavir.com/wp-content/uploads/2016/08/450.jpg#',3,'2022-08-21',32.016500,34.781769),
(9,1,N'צריכה לשים מדף לתמונות של הנכדים',N'צריכה לשים מדף לתמונות של הנכדים ואני סבתא נחמדה','https://lcp.co.il/wp-content/uploads/2021/03/41ZA.png#https://naturefurniture.co.il/wp-content/uploads/2022/01/790%D7%A8%D7%94%D7%99%D7%98%D7%99-%D7%98%D7%91%D7%A2-scaled-1.jpg#https://ynet-images1.yit.co.il/picserver5/crop_images/2021/03/08/HJEr00jL7m00/HJEr00jL7m00_0_0_1000_668_0_x-large.jpg#',3,'2022-08-21',32.085300,34.750280),
(10,22,N'הכלב בורח לי מהכלוב',N'הכלב בורח לי מהכלוב ואין לי כוח לרדוף אחריו','https://www.doctorvet.co.il/wp-content/uploads/2017/01/dogs-in-winter.jpg#https://dk4ipyj2mndfl.cloudfront.net/hj1v_SHAGIR8M5.jpg#https://pbs.twimg.com/media/EsHYsW3XIAI3ork.jpg#;',2,'2022-08-21',31.525700,34.599998),
(11,1,N'הביוב שלי מעל גרה',N'הביוב שלי מעל גרה וזאת לא חיה כשרה','',2,'2022-08-21',31.420931,34.589661),
(9,22,N'צריך לנגר את השולחן',N'צריך לנגר את השולחן הוא נשבר לי אחרי הפוקר','https://i.imgur.com/cqI4otx.jpg#',2,'2022-08-21',31.420931,34.589661),
(10,1,N'צריכה מסגרת לילדים',N'צריכה מסגרת לילדים אפילו מסגרת של תמונה','',2,'2022-08-21',32.016500,34.781769),
(11,2,N'יש לי ריח של ביוב בבית',N'יש לי ריח של ביוב בבית','',4,'2022-08-21',31.420931,34.589661),
(9,1,N'צריכה לבנות סוכה',N'צריכה לבנות סוכה','',4,'2022-08-21',32.016500,34.781769),
(10,4,N'אין לי גדר לבית',N'אין לי גדר לבית','',4,'2022-08-21',31.420931,34.589661),
(3,5,N'מרוב עצים לא רואים את היער',N'מרוב עצים לא רואים את היער','https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full_caption/public/field_blog_entry_images/2020-09/treestruckee_0.jpg?itok=5aDrP113#https://images-stylist.s3-eu-west-1.amazonaws.com/app/uploads/2021/11/24122846/dark-woods-podcast-2.jpg#',4,'2022-08-21',32.016500,34.781769);

-----------------------------------------------------------------------------------------------------------------------

INSERT INTO GivingHelpOwnerPost (postId, GivingHelpId)  VALUES /* --postId,GivingHelpId(UserGoGood(id)) */ 
(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),
(12,7),(15,7),(16,7),(17,7),(18,7),(19,7),(20,7),(21,7),(22,7),(23,7),(24,7),(25,7),(26,7),
(27,11),
(28,12),
(29,13),(30,13),
(31,14),(32,14),(33,14),
(34,12),
(35,13),
(36,9);

-----------------------------------------------------------------------------------------------------------------------
/*
INSERT INTO recommendation (GivingHelpOwnerPostId, review, rate)  VALUES #GivingHelpOwnerPostId(GivingHelpOwnerPost(id)),review ,rate 
(26,N'היה מצויין איזה איש גדול מהחיים ממש מלאך',5),
(27,N'לא מי יודע מה טעון שיפור',4),
(28,N'אחלה עבודה יכל לסדר גם את הצנרת ולהביא לאפה שווארמה',3),
(25,N'סבבה ',2);
*/
#-------------------------------------------------------------------------------------------------------------------------------
insert into GoGood.PushNotificationMessages(title,body,comment) VALUES
(N'איזה כיף! יש מתנדב',N'אנא אשר/י לו לקבל את פרטי ההתקשרות שלך','מתנדב הציע עזרה'),
(N'ישמח מאוד לקבל את עזרתך',N'שם היוזר',N'מבקש עזרה אישר מתנדב'),
(N'הקשה חדשה לידך',N'בקשה חדשה במרחק המרחק קילומטר ממך ממך',N'נפתחה בקשה במרחק של עד 5 קילומטר ממך'),
(N'ביטול היתנדבות',N'מתנדב בחר לבטל את ההתנדבות',N'מתנדב בחר לבטל את ההתנדבות'),
(N'חוות דעת',N'הושארה על ידי יוזר חוות דעת',N'הושארה על ידי יוזר חוות דעת'),
(N'השארת המלצה',N'הבקשה הסתיימה בהצלחה? סגור והשאר המלצה',N'עדכון סטטוס פגישה');

SELECT * FROM GoGood.PushNotificationMessages;










SELECT * FROM GoGood.UserGoGood;
SELECT * FROM GoGood.EnumProfession;
SELECT * FROM GoGood.StatusType;
SELECT * FROM GoGood.GivingHelpPerProfession;
SELECT * FROM GoGood.traslator;
SELECT * FROM GoGood.Post ;
SELECT * FROM GoGood.StatusType;
SELECT * FROM GoGood.GivingHelpOwnerPost;
SELECT * FROM GoGood.recommendation; 
SELECT * FROM GoGood.Log;
SELECT * FROM GoGood.PushNotificationMessages;



SELECT * FROM GoGood.GivingHelpOwnerPost as G inner join GoGood.Post as P on G.postId=P.id where P.StatusTypeId=4 



USE GoGood;
SET SQL_SAFE_UPDATES = 0;

USE GoGood;
DELETE FROM  GoGood.traslator;
DELETE FROM GoGood.EnumProfession where id=17;


TRUNCATE TABLE recommendation;

USE GoGood;
INSERT INTO recommendation (postId, review, rate, whoGaveItId, whoGotItId, reviewDate)
SELECT postId, review, rate, whoGaveItId, whoGotItId, reviewDate FROM (
    SELECT
        P.id AS postId,
        CONCAT(' כן ושאר הירקות שדגמ חלךמ זוהי המלצה לפוסט מזוייף בלה בלה בלה בלה בלה בלה סבלגכדחינגד לחדגמחלחלמדגלח לחגדמ ', P.id) AS review,
        ROUND(RAND() * 5) AS rate,
        UGG1.id AS whoGaveItId,
        UGG2.id AS whoGotItId,
        DATE_ADD(P.dateUpdete, INTERVAL ROUND(RAND() * 30) DAY) AS reviewDate,
        ROW_NUMBER() OVER(PARTITION BY P.id ORDER BY RAND()) as row_num
    FROM
        Post AS P
        CROSS JOIN UserGoGood AS UGG1
        CROSS JOIN UserGoGood AS UGG2
    WHERE
        UGG1.id <> UGG2.id
) as Temp
WHERE row_num <= 2;







