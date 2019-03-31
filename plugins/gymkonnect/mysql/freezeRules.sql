SET @MPack = (SELECT `id` FROM `p_gym_package` WHERE `name`='Monthly');
SET @QPack = (SELECT `id` FROM `p_gym_package` WHERE `name`='Quaterly');
SET @HPack = (SELECT `id` FROM `p_gym_package` WHERE `name`='Half');
SET @YPack = (SELECT `id` FROM `p_gym_package` WHERE `name`='Yearly');

SET @STUCat = (SELECT `id` FROM `p_category` WHERE `name`='Student');
SET @SS_Cat = (SELECT `id` FROM `p_category` WHERE `name`='Senior Citizen');
SET @PROCat = (SELECT `id` FROM `p_category` WHERE `name`='Professionals');
SET @BUICat = (SELECT `id` FROM `p_category` WHERE `name`='Buisness Man');
SET @CSUCat = (SELECT `id` FROM `p_category` WHERE `name`='Chowgule Students');
SET @GENCat = (SELECT `id` FROM `p_category` WHERE `name`='General');
SET @OTHCat = (SELECT `id` FROM `p_category` WHERE `name`='Other Students & staffs');

SET @GPro = (SELECT `id` FROM `p_gym_programme` WHERE `name`='Gold');
SET @PPro = (SELECT `id` FROM `p_gym_programme` WHERE `name`='Platinum');

INSERT INTO `p_gym_freeze_rules` (`id`, `active`, `createdAt`, `author`, `modifications`, `lastModifiedAt`, `lastModifier`, `serverId`, `packages`, `category`, `grouping`, `programme`, `count`, `minDays`, `maxDays`) VALUES
( 1, 1, '2019-03-14 23:58:54', 1, '[]', NULL, NULL, NULL, @MPack, @CSUCat, NULL, @GPro, NULL, 0, 0),
( 2, 1, '2019-03-14 23:58:54', 1, '[]', NULL, NULL, NULL, @QPack, @CSUCat, NULL, @GPro, NULL, 5, 10),
( 3, 1, '2019-03-14 23:58:54', 1, '[]', NULL, NULL, NULL, @HPack, @CSUCat, NULL, @GPro, NULL, 5, 20),
( 4, 1, '2019-03-14 23:58:54', 1, '[]', NULL, NULL, NULL, @YPack, @CSUCat, NULL, @GPro, NULL, 5, 40),
( 5, 1, '2019-03-15 00:01:23', 1, '[]', NULL, NULL, NULL, @MPack, @CSUCat, NULL, @PPro, NULL, 0, 0),
( 6, 1, '2019-03-15 00:01:23', 1, '[]', NULL, NULL, NULL, @QPack, @CSUCat, NULL, @PPro, NULL, 5, 15),
( 7, 1, '2019-03-15 00:01:23', 1, '[]', NULL, NULL, NULL, @HPack, @CSUCat, NULL, @PPro, NULL, 5, 30),
( 8, 1, '2019-03-15 00:01:23', 1, '[]', NULL, NULL, NULL, @YPack, @CSUCat, NULL, @PPro, NULL, 5, 60),
( 9, 1, '2019-03-15 00:04:30', 1, '[]', NULL, NULL, NULL, @MPack, @OTHCat, NULL, @PPro, NULL, 0, 0),
(10, 1, '2019-03-15 00:04:31', 1, '[]', NULL, NULL, NULL, @QPack, @OTHCat, NULL, @PPro, NULL, 5, 15),
(11, 1, '2019-03-15 00:04:31', 1, '[]', NULL, NULL, NULL, @HPack, @OTHCat, NULL, @PPro, NULL, 5, 30),
(12, 1, '2019-03-15 00:04:31', 1, '[]', NULL, NULL, NULL, @YPack, @OTHCat, NULL, @PPro, NULL, 5, 60),
(13, 1, '2019-03-15 00:05:17', 1, '[]', NULL, NULL, NULL, @MPack, @OTHCat, NULL, @GPro, NULL, 0, 0),
(14, 1, '2019-03-15 00:05:17', 1, '[]', NULL, NULL, NULL, @QPack, @OTHCat, NULL, @GPro, NULL, 5, 10),
(15, 1, '2019-03-15 00:05:17', 1, '[]', NULL, NULL, NULL, @HPack, @OTHCat, NULL, @GPro, NULL, 5, 20),
(16, 1, '2019-03-15 00:05:17', 1, '[]', NULL, NULL, NULL, @YPack, @OTHCat, NULL, @GPro, NULL, 5, 40),
(17, 1, '2019-03-15 00:09:28', 1, '[]', NULL, NULL, NULL, @MPack, @GENCat, NULL, @GPro, NULL, 0, 0),
(18, 1, '2019-03-15 00:09:28', 1, '[]', NULL, NULL, NULL, @QPack, @GENCat, NULL, @GPro, NULL, 5, 10),
(19, 1, '2019-03-15 00:09:28', 1, '[]', NULL, NULL, NULL, @HPack, @GENCat, NULL, @GPro, NULL, 5, 20),
(20, 1, '2019-03-15 00:09:28', 1, '[]', NULL, NULL, NULL, @YPack, @GENCat, NULL, @GPro, NULL, 5, 40),
(21, 1, '2019-03-15 00:10:14', 1, '[]', NULL, NULL, NULL, @MPack, @GENCat, NULL, @PPro, NULL, 0, 0),
(22, 1, '2019-03-15 00:10:15', 1, '[]', NULL, NULL, NULL, @QPack, @GENCat, NULL, @PPro, NULL, 5, 15),
(23, 1, '2019-03-15 00:10:15', 1, '[]', NULL, NULL, NULL, @HPack, @GENCat, NULL, @PPro, NULL, 5, 30),
(24, 1, '2019-03-15 00:10:15', 1, '[]', NULL, NULL, NULL, @YPack, @GENCat, NULL, @PPro, NULL, 5, 60),
(25, 1, '2019-03-15 00:10:54', 1, '[]', NULL, NULL, NULL, @MPack, @SS_Cat, NULL, @PPro, NULL, 0, 0),
(26, 1, '2019-03-15 00:10:54', 1, '[]', NULL, NULL, NULL, @QPack, @SS_Cat, NULL, @PPro, NULL, 5, 15),
(27, 1, '2019-03-15 00:10:54', 1, '[]', NULL, NULL, NULL, @HPack, @SS_Cat, NULL, @PPro, NULL, 5, 30),
(28, 1, '2019-03-15 00:10:54', 1, '[]', NULL, NULL, NULL, @YPack, @SS_Cat, NULL, @PPro, NULL, 5, 60),
(29, 1, '2019-03-15 00:11:32', 1, '[]', NULL, NULL, NULL, @MPack, @SS_Cat, NULL, @GPro, NULL, 0, 0),
(30, 1, '2019-03-15 00:11:32', 1, '[]', NULL, NULL, NULL, @QPack, @SS_Cat, NULL, @GPro, NULL, 5, 10),
(31, 1, '2019-03-15 00:11:32', 1, '[]', NULL, NULL, NULL, @HPack, @SS_Cat, NULL, @GPro, NULL, 5, 20),
(32, 1, '2019-03-15 00:11:32', 1, '[]', NULL, NULL, NULL, @YPack, @SS_Cat, NULL, @GPro, NULL, 5, 40);