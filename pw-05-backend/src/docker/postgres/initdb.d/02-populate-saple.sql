INSERT INTO darbininkas (_id_, pavarde, vardas) VALUES
(3, 'Pavardė 1', 'Vardas 1'),
(5, 'Pavardė 2', 'Vardas 2'),
(4, 'Pavardė 3', 'Vardas 3'),
(1, 'Pavardė 4', 'Vardas 4'),
(2, 'Pavardė 5', 'Vardas 5');
ALTER SEQUENCE darbininkas__id__seq RESTART WITH 6;

INSERT INTO gaminys (_id_, pavadinimas) VALUES
(2, 'Gaminys 1'),
(3, 'Gaminys 2'),
(1, 'Gaminys 3');
ALTER SEQUENCE gaminys__id__seq RESTART WITH 4;

INSERT INTO gamybos_norma (_id_, gaminys_id, kiekis, uzmokestis_us_kieki, data_nuo) VALUES
(1, 1, 13.0000, 10.0000, '2010-06-22'),
(2, 2, 3.0000, 20.0000, '2009-03-15'),
(3, 1, 10.0000, 10.0000, '2009-01-19'),
(4, 2, 2.0000, 15.0000, '2009-01-15'),
(5, 1, 15.0000, 20.0000, '2009-09-28'),
(6, 1, 8.0000, 15.0000, '2007-01-01'),
(7, 1, 12.0000, 20.0000, '2010-06-10'),
(8, 3, 6.0000, 20.0000, '2010-03-20'),
(9, 3, 7.0000, 10.0000, '2009-06-11'),
(10, 1, 9.0000, 20.0000, '2009-01-10'),
(11, 1, 14.0000, 15.0000, '2010-09-18'),
(12, 2, 4.0000, 10.0000, '2010-09-10'),
(13, 2, 1.0000, 10.0000, '2000-01-01'),
(14, 1, 11.0000, 15.0000, '2010-01-01'),
(15, 3, 5.0000, 15.0000, '2000-01-01');
ALTER SEQUENCE gamybos_norma__id__seq RESTART WITH 16;

INSERT INTO darbo_rezultatas (_id_, darbininkas_id, gaminys_id, kiekis, data_laikas) VALUES
(1, 1, 2, 2.0000, '2009-03-11 17:00:00'),
(2, 2, 1, 3.0000, '2010-09-29 00:00:00'),
(3, 1, 2, 1.0000, '2009-06-22 00:00:00'),
(4, 3, 3, 4.0000, '2010-06-04 00:00:00'),
(5, 4, 1, 3.0000, '2010-09-08 00:00:00'),
(6, 5, 2, 2.0000, '2010-09-23 00:00:00'),
(7, 1, 3, 5.0000, '2010-03-14 17:00:00'),
(8, 4, 2, 4.0000, '2009-01-30 17:00:00'),
(9, 2, 2, 2.0000, '2010-09-02 00:00:00'),
(10, 1, 1, 5.0000, '2010-09-19 00:00:00'),
(11, 4, 3, 3.0000, '2010-03-03 00:00:00'),
(12, 4, 3, 4.0000, '2010-06-25 00:00:00'),
(13, 5, 1, 1.0000, '2009-03-06 00:00:00'),
(14, 1, 1, 1.0000, '2009-03-27 00:00:00'),
(15, 4, 1, 3.0000, '2009-03-17 00:00:00'),
(16, 3, 2, 4.0000, '2010-09-13 17:00:00'),
(17, 3, 1, 5.0000, '2009-01-26 17:00:00'),
(18, 3, 2, 1.0000, '2009-01-10 17:00:00'),
(19, 2, 1, 2.0000, '2010-06-07 00:00:00'),
(20, 2, 3, 3.0000, '2010-03-24 00:00:00'),
(21, 5, 3, 1.0000, '2010-06-15 00:00:00'),
(22, 2, 1, 2.0000, '2009-01-16 17:00:00'),
(23, 3, 2, 5.0000, '2009-03-31 00:00:00'),
(24, 2, 2, 2.0000, '2009-03-21 00:00:00'),
(25, 3, 1, 4.0000, '2010-06-18 00:00:00'),
(26, 4, 2, 3.0000, '2009-06-12 00:00:00'),
(27, 5, 1, 2.0000, '2010-06-28 00:00:00'),
(28, 5, 2, 1.0000, '2009-01-20 17:00:00'),
(29, 1, 1, 5.0000, '2009-01-05 00:00:00'),
(30, 5, 2, 1.0000, '2009-06-01 00:00:00');
ALTER SEQUENCE darbo_rezultatas__id__seq RESTART WITH 31;
