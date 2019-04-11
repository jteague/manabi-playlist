
CREATE DATABASE IF NOT EXISTS `manabi_playlist`;
USE `manabi_playlist`;

CREATE TABLE `gig` (
	`id` int(10) UNSIGNED NOT NULL,
	`venue` varchar(100) DEFAULT NULL,
	`date` date DEFAULT NULL
);

CREATE TABLE `song` (
	`id` int(10) UNSIGNED NOT NULL,
	`name` varchar(100) DEFAULT NULL,
	`artist` varchar(100) DEFAULT NULL
);

CREATE TABLE `song_note` (
	`id` int(10) UNSIGNED NOT NULL,
	`song_id` int(10) UNSIGNED NOT NULL,
	`gig_id` int(10) UNSIGNED NOT NULL,
	`user_uid` varchar(100) NOT NULL,
	`notes` text,
	`bad_horns` tinyint(1) NOT NULL DEFAULT '0',
	`bad_rhythm` tinyint(1) NOT NULL DEFAULT '0',
	`bad_start` tinyint(1) NOT NULL DEFAULT '0',
	`bad_end` tinyint(1) NOT NULL DEFAULT '0'
);

ALTER TABLE `gig` ADD PRIMARY KEY (`id`);
ALTER TABLE `song` ADD PRIMARY KEY (`id`);
ALTER TABLE `song_note` ADD PRIMARY KEY (`id`);

-- Insert gigs
INSERT INTO `gig` (`id`, `venue`, `date`) VALUES (1, 'Rio', '2019-04-02');

-- Insert songs
INSERT INTO `song` (`id`, `name`, `artist`) VALUES
(1, 'Canoa Ranchaa', 'Grupo Niche'),
(2, 'La Bilirrubina', 'Juan Luis Guerra'),
(3, 'Che Che Cole', 'Hector Lavoe'),
(4, 'Indestructible', 'Ray Barretto'),
(5, 'Lloraras', 'Oscar D\'Leon'),
(6, 'El Preso', 'Fruko Y Sus Tesos'),
(7, 'Quimbara', 'Celia Cruz'),
(8, 'Guantanamera', 'Celia Cruz'),
(9, 'La Quiero A Morir', 'D.L.G.'),
(10, 'El Raton', 'Cheo Feliciano'),
(11, 'Cali Pachanguero', 'Grupo Niche'),
(12, 'Mi Gente', 'Hector Lavoe'),
(13, 'Hablemos El Mismo Idioma', 'Gloria Estefan'),
(14, 'Oye Como Va', 'Tito Puente'),
(15, 'Aguanile', 'Hector Lavoe'),
(16, 'La Pantera Mambo', 'LA-33'),
(17, 'La Noche', 'Joe Arroyo Y La Verdad'),
(18, 'Vivir Lo Nuestro', 'Marc Anthony'),
(19, 'Nadie Como Ella', 'Marc Anthony'),
(20, 'Ausencia', 'Hector Lavoe'),
(21, 'Camaleon', 'Ruben Blades'),
(22, 'Yerbero Modeno', 'Celia Cruz'),
(23, 'Yo No Se Manana', 'Luis Enrique'),
(24, 'La Agarro Bajando', 'Gilberto Santa Rosa'),
(25, 'Mi Media Mitad', 'Rey Ruiz'),
(26, 'Chan Chan', 'Buena Vista Social Club'),
(27, 'Es Mentiroso', 'Olga Tañon'),
(28, 'Vivir Mi Vida', 'Marc Anthony & India'),
(29, 'Tu Eres Ajena', 'Eddy Herrera'),
(30, 'Anacaona', 'Cheo Feliciano'),
(31, 'He Tratado', 'Victor Manuelle'),
(32, 'Si Me Dejas No Vale', 'La Linea'),
(33, 'Manteca', 'Poncho Sanchez'),
(34, 'Lo Que Va a Pasar', 'Irakere'),
(35, 'Fireball', 'Pitbull'),
(36, 'Brujería', 'El Gran Combo de Puerto Rico'),
(37, 'Las Caleñas son como las flores', 'The Latin Brothers'),
(38, 'Sway', 'Rosemary Clooney'),
(39, 'Ran Kan Kan', 'Tito Puente'),
(40, 'La Vida Es Un Carnaval', 'Celia Cruz'),
(41, 'Casi un Hechizo', 'Jerry Rivera'),
(42, 'Loco', 'Enrique Iglesias'),
(43, 'Despacito', 'Luis Fonsi'),
(44, 'Conga', 'Gloria Estefan'),
(45, 'Happy', 'Pharrell Williams'),
(46, 'Uptown Funk', 'Tony Succar'),
(47, 'Hello', 'Mandinga'),
(48, 'I Want You Back', 'Tony Succar'),
(49, 'Acid', 'Ray Barretto'),
(50, 'Como Abeja Al Panal', 'Juan Luis Guerra'),
(51, 'Tu Carinito', 'Puerto Rican Power'),
(52, 'Cumbia Sobre El Mar', 'Quantic');

-- Insert song_notes
INSERT INTO `song_note` (`id`, `song_id`, `gig_id`, `user_uid`, `notes`, `bad_horns`, `bad_rhythm`, `bad_start`, `bad_end`) VALUES
(1, 52, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(2, 1, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(3, 6, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(4, 5, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(5, 24, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(6, 27, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(7, 4, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(8, 44, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(9, 51, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(10, 36, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(11, 17, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(12, 37, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(13, 40, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(14, 11, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(15, 29, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(16, 2, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(17, 28, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0),
(18, 15, 1, '05010064646602010010166001440256024', NULL, 0, 0, 0, 0);

ALTER TABLE `gig` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `song` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
ALTER TABLE `song_note` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

COMMIT;
