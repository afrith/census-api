-- createdb census-api

CREATE EXTENSION postgis;

-- shp2pgsql -s 4326 -W LATIN1 -DI data/EA_SA_2011.shp imp_ea | psql census-api

CREATE TABLE ea (
	code char(8) PRIMARY KEY,
	sal_code char(7),
	sp_code char(9),
	ea_gtype varchar,
	ea_type varchar
);

INSERT INTO ea (code, sp_code, ea_gtype, ea_type)
SELECT ea_code::char(8), sp_code::char(9), ea_gtype, ea_type
FROM imp_ea;

