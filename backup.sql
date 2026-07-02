BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "customers" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"company"	TEXT,
	"email"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	INTEGER,
	"vendor_id"	INTEGER,
	"product_name"	TEXT NOT NULL,
	"price"	REAL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("vendor_id") REFERENCES "vendors"("id")
);
CREATE TABLE IF NOT EXISTS "vendors" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"city"	TEXT,
	"email"	TEXT,
	"rating"	REAL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "products" VALUES (1,2,'Steel Pipes',450.0);
INSERT INTO "vendors" VALUES (1,'Desi_Bhojan','Bangalore','orders.desibhojan@gmail.com',3.1);
INSERT INTO "vendors" VALUES (2,'Mothers Kitchen','Bangalore','motherskitchen.info@gmail.com',4.7);
INSERT INTO "vendors" VALUES (3,'Home kitchen','Bangalore','homekitchen.orders@gmail.com',3.2);
INSERT INTO "vendors" VALUES (4,'Desi Zayka','Bangalore','desizayka.catering@gmail.com',3.5);
INSERT INTO "vendors" VALUES (5,'Priya''s Home Kitchen','Bangalore','priyashomekitchen@gmail.com',4.3);
INSERT INTO "vendors" VALUES (6,'Preeti Parlour','Bangalore','preetiparlour.salon@gmail.com',4.9);
INSERT INTO "vendors" VALUES (7,'Siddhu Jhoote Wala','Bangalore','siddhujootewala@gmail.com',4.5);
INSERT INTO "vendors" VALUES (8,'Mummy Vaste Dhabba','Bangalore','mummyvastedhabba@gmail.com',3.9);
INSERT INTO "vendors" VALUES (9,'Fool Wali','Bangalore','foolwali.florist@gmail.com',4.1);
INSERT INTO "vendors" VALUES (10,'Jaggu Fruits','Bangalore','jaggufruits.fresh@gmail.com',4.8);
INSERT INTO "vendors" VALUES (11,'COOL Icecreams','Bangalore','coolicecreams.orders@gmail.com',3.0);
INSERT INTO "vendors" VALUES (12,'Cold Creams','Bangalore','coldcreams.orders@gmail.com',5.0);
INSERT INTO "vendors" VALUES (13,'Home Del8','Bangalore','homedel8.delivery@gmail.com',4.6);
INSERT INTO "vendors" VALUES (14,'Kapoor and Sons (Tailor)','Bangalore','kapoorandsonstailors@gmail.com',3.9);
INSERT INTO "vendors" VALUES (15,'Uncle Golgappe','Bangalore','unclegolgappe@gmail.com',5.0);
INSERT INTO "vendors" VALUES (16,'Cake Lane','Bangalore','cakelane.bakes@gmail.com',4.1);
INSERT INTO "vendors" VALUES (17,'Lata''s Parlour','Bangalore','latasparlour.beauty@gmail.com',4.4);
INSERT INTO "vendors" VALUES (18,'Pind Di Rasoi','Bangalore','pinddirasoi.orders@gmail.com',3.6);
INSERT INTO "vendors" VALUES (19,'Laziz Bhojan','Bangalore','lazizbhojan.catering@gmail.com',3.7);
INSERT INTO "vendors" VALUES (20,'Ghar Ka Swad','Bangalore','gharkaswad.tiffin@gmail.com',4.0);
INSERT INTO "vendors" VALUES (21,'The Icebox','Bangalore','theicebox.desserts@gmail.com',4.0);
INSERT INTO "vendors" VALUES (22,'Chill Pill Icecreams','Bangalore','chillpillicecreams@gmail.com',5.0);
INSERT INTO "vendors" VALUES (23,'Ritu’s Beauty Zone','Bangalore','ritusbeautyzone@gmail.com',3.0);
INSERT INTO "vendors" VALUES (24,'Divya’s Bridal Studio','Bangalore','divyasbridalstudio@gmail.com',3.7);
INSERT INTO "vendors" VALUES (25,'Classic Drapes','Bangalore','classicdrapes.decor@gmail.com',4.5);
INSERT INTO "vendors" VALUES (26,'Junction 91','Chennai','junction91.cafe@gmail.com',3.8);
INSERT INTO "vendors" VALUES (27,'Masterji Tailors','Chennai','masterjitailors.info@gmail.com',3.9);
INSERT INTO "vendors" VALUES (28,'Bharat Provisions','Chennai','bharatprovisions@gmail.com',4.9);
INSERT INTO "vendors" VALUES (29,'Gupta Ji Daily Needs','Chennai','guptajidailyneeds@gmail.com',4.1);
INSERT INTO "vendors" VALUES (30,'City Supermarket','Chennai','citysupermarket.help@gmail.com',3.9);
INSERT INTO "vendors" VALUES (31,'Fancy Cloth House','Chennai','fancyclothhouse@gmail.com',3.0);
INSERT INTO "vendors" VALUES (32,'Novelty Saree House','Chennai','noveltysareehouse@gmail.com',3.7);
INSERT INTO "vendors" VALUES (33,'Kumar Electricals','Chennai','kumarelectricals.shop@gmail.com',4.4);
INSERT INTO "vendors" VALUES (34,'Sonu Cycle Works','Chennai','sonucycleworks@gmail.com',3.3);
INSERT INTO "vendors" VALUES (35,'Speedo Motor Repairs','Chennai','speedomotorrepairs@gmail.com',3.4);
INSERT INTO "vendors" VALUES (36,'Apple Perfect Mobile Care','Chennai','perfectmobilecare.apple@gmail.com',3.9);
INSERT INTO "vendors" VALUES (37,'Bright Dry Cleaners','Chennai','brightdrycleaners@gmail.com',4.3);
INSERT INTO "vendors" VALUES (38,'Star Photocopy & Lamination','Chennai','starphotocopy.print@gmail.com',3.0);
INSERT INTO "vendors" VALUES (39,'Preeti Beauty Zone','Chennai','preetibeautyzone@gmail.com',4.4);
INSERT INTO "vendors" VALUES (40,'Fancy Chappal House','Chennai','fancychappalhouse@gmail.com',3.4);
INSERT INTO "vendors" VALUES (41,'Celebration Balloons','Chennai','celebrationballoons.decor@gmail.com',3.8);
INSERT INTO "vendors" VALUES (42,'Utsav Puja Samagri','Chennai','utsavpujasamagri@gmail.com',4.3);
INSERT INTO "vendors" VALUES (43,'Christiansen, Grant and Herzog','Chennai','info.cghfirm@gmail.com',5.0);
INSERT INTO "vendors" VALUES (44,'Home Decor Center','Chennai','homedecorcenter.sales@gmail.com',3.3);
INSERT INTO "vendors" VALUES (45,'Gaurav Chashme Wale','Chennai','gauravchashmewale@gmail.com',4.0);
INSERT INTO "vendors" VALUES (46,'Gupta Ji Atta Chakki','Chennai','guptajiattachakki@gmail.com',4.8);
INSERT INTO "vendors" VALUES (47,'Mishra Ironing Service','Chennai','mishraironingservice@gmail.com',4.3);
INSERT INTO "vendors" VALUES (48,'Pappu Key Makers','Chennai','pappukeymakers@gmail.com',4.4);
INSERT INTO "vendors" VALUES (49,'Kiran Ladies Corner','Chennai','kiranladiescorner@gmail.com',3.2);
INSERT INTO "vendors" VALUES (50,'Anil Cycle Repair Works','Chennai','anilcyclerepair@gmail.com',3.3);
INSERT INTO "vendors" VALUES (53,'Updated Vendor','Mysore','updated@gmail.com',4.9);
INSERT INTO "vendors" VALUES (54,'Metro Traders','Bangalore','metro@gmail.com',4.7);
COMMIT;
