CREATE TABLE Mahasiswa
(
    nim TEXT primary key,
    nama_Mahasiswa varchar(50) not null,
    alamat TEXT not null,
    jurusan Varchar(50)

);
CREATE TABLE MataKuliah
(
    Id_Matkul TEXT primary key,
    Nama_Matkul varchar(50),
    Sks INT
);
CREATE TABLE Dosen
(
    Nip TEXT primary key,
    Nama_Dosen varchar(50) not null
);
CREATE TABLE Krs
(
    Nim TEXT,
    Id_Matkul TEXT,
    Id_Dosen TEXT,
    Nilai Varchar(2)
);
CREATE TABLE Jurusan
(
    Kode_Jurusan TEXT primary key,
    Nama_Jurusan varchar(50)
);

CREATE TABLE anggota (
    userName TEXT,
    pass TEXT,
    stat VARCHAR(20)
);

INSERT INTO anggota( userName,pass,stat) values 
("azis","12345","ADMIN"),
("duma","11111","ADMIN");
-- DATA ENTRY Mahasiswa

INSERT INTO Mahasiswa
    (nim, nama_Mahasiswa, alamat, jurusan)
values
    ("11415001", "Danu", "Jakarta, DKI Jakarta", "Rekayasa Pertanian"),
    ("11415038", "Toto", "Solo, Jawa Tengah", "Rekayasa Pertanian"),
    ("11415020", "Dayat", "Padang, Sumatera Barat", "Rekayasa Pertanian"),
    ("11215002", "Azis", "Bekasi, Jawa Barat", "Bioengineering"),
    ("11215003", "Stanley", "Medan, Sumatera Utara", "Bioengineering"),
    ("11215013", "Romario", "Bandung, Jawa Barat", "Bioengineering"),
    ("11515023", "Yopi", "Banda Aceh, Aceh ", "Rekayasa Kehutanan"),
    ("11515006", "Rahman", "Bandung, Jawa Barat", "Rekayasa Kehutanan"),
    ("12114001", "Ali", "Sumbawa, NTT", "Pasca Panen"),
    ("12114003", "Doni", "Bandung, Jawa Barat", "Pasca Panen");



-- OUTPUT::
-- NIM         Nama_Mahasiswa  Alamat                Jurusan             Tanggal_Lahir
-- ----------  --------------  --------------------  ------------------  -------------
-- 11415001    Danu            Jakarta, DKI Jakarta  Rekayasa Pertanian  1997-08-22   
-- 11415038    Toto            Solo, Jawa Tengah     Rekayasa Pertanian  1996-10-30   
-- 11415020    Dayat           Padang, Sumatera Bar  Rekayasa Pertanian  1997-07-05   
-- 11215002    Azis            Bekasi, Jawa Barat    Bioengineering      1995-04-04   
-- 11215003    Stanley         Medan, Sumatera Utar  Bioengineering      1998-12-25   
-- 11215013    Romario         Bandung, Jawa Barat   Bioengineering      1999-01-24   
-- 11515023    Yopi            Banda Aceh, Aceh      Rekayasa Kehutanan  2000-12-20   
-- 11515006    Rahman          Bandung, Jawa Barat   Rekayasa Kehutanan  1997-08-27   
-- 12114001    Ali             Sumbawa, NTT          Pasca Panen         1994-05-20   
-- 12114003    Doni            Bandung, Jawa Barat   Pasca Panen         1993-02-10   


-- DATA ENTRY MataKuliah
INSERT INTO MataKuliah
    (Id_Matkul, Nama_Matkul, Sks)
values
    ("RKG1", "Rekayasa Genetika Tumbuhan", 2),
    ("BI01", "Biologi Dasar", 2),
    ("RH02", "Rekayasa Hayati I", 3),
    ("DM02", "Data Mining", 3),
    ("STD1", "Statistik Dasar", 3),
    ("PB01", "Perancangan Bioreaktor", 2),
    ("SM01", "Sensor dan Instrumentasi", 3),
    ("NME1", "Neraca Masa dan Energi", 3),
    ("TDN1", "Termodinamika", 3),
    ("BKO1", "Bio Kimia", 2),
    ("RSH1", "Rekayasa Sel Hewan", 2);



/*/OUTPUT::
Id_Matkul   Nama_Matkul                 SKS       
----------  --------------------------  ----------
RKG1        Rekayasa Genetika Tumbuhan  2         
BI01        Biologi Dasar               2         
RH02        Rekayasa Hayati I           3         
DM02        Data Mining                 3         
STD1        Statistik Dasar             3         
PB01        Perancangan Bioreaktor      2         
SM01        Sensor dan Instrumentasi    3         
NME1        Neraca Masa dan Energi      3         
TDN1        Termodinamika               3         
BKO1        Bio Kimia                   2         
RSH1        Rekayasa Sel Hewan          2    
/*/

/*/DATA ENTRY DOSEN/*/
INSERT INTO Dosen(Nip, Nama_Dosen) values
("1231237","Dr. Robert Manurung, S.T, M.T."), 
("1231231","Dr. Duma Wardoyo, S.T, M.T."),
("1231232","Prof. Dr. Stanley"),
("1231233","Dr. Tatang, S.T, M.T."),
("1231234","Dr. Albert Ginting, S.T, M.T."),
("1231235","Prof. Arief, S.T, M.T."),
("1231236","Dr. Ahmad, S.T, M.T."),
("1231238","Dr. Muhammad Yusuf, S.T, M.T."),
("1231239","Dr. Acep, S.T, M.T."),
("1231240","Dr. Dudung, S.T, M.T.");



/*/OUTPUT::
NIP         Nama_Dosen                    
----------  ------------------------------
1231237     Dr. Robert Manurung, S.T, M.T.
1231231     Dr. Duma Wardoyo, S.T, M.T.   
1231232     Prof. Dr. Stanley             
1231233     Dr. Tatang, S.T, M.T.         
1231234     Dr. Albert Ginting, S.T, M.T. 
1231235     Prof. Arief, S.T, M.T.        
1231236     Dr. Ahmad, S.T, M.T.          
1231238     Dr. Muhammad Yusuf, S.T, M.T. 
1231239     Dr. Acep, S.T, M.T.           
1231240     Dr. Dudung, S.T, M.T.  
/*/


/*/ENTRY JURUSAN /*/
INSERT INTO Jurusan(Kode_Jurusan, Nama_Jurusan) VALUES 
("114","Rekayasa Pertanian"),
("112","Bioengineering"),
("121","Pasca Panen"),
("115","Rekayasa Kehutanan");

-- OUTPUT::
-- Kode_Jurusan  Nama_Jurusan      
-- ------------  ------------------
-- 114           Rekayasa Pertanian
-- 112           Bioengineering    
-- 121           Pasca Panen       
-- 115           Rekayasa Kehutanan
 


-- ENTRY KRS
INSERT INTO Krs(Nim, Id_Matkul, Id_Dosen, Nilai) values 
("11215002","RH02","1231232","A"),
("11215002","DM02","1231233","AB"),
("11215002","NME1","1231237","AB"),
("11215003","RSH1","1231240","C"),
("11215003","DM02","1231233","C"),
("11215003","BK01","1231239","BC"),
("11215013","DM02","1231233","AB"),
("11215013","RSH1","1231240","AB"),
("11215013","SM01","1231236","D"),
("11415038","DM02","1231233","E"),
("11415038","NME1","1231237","E"),
("11415038","TDN1","1231238","E"),
("11415001","DM02","1231233","A"),
("11415020","RH02","1231232","C"),
("11515023","DM02","1231233","C"),
("11515006","DM02","1231233","E"),
("12114001","DM02","1231233","D"),
("12114003","DM02","1231233","A"),
("11215002","STD1","1231234","E"),
("11215003","STD1","1231234","C"),         
("11215003","PB01","1231235","E"),         
("11215013","NME1","1231237","AB");   


