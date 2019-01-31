CREATE TABLE darbininkas (
  _id_ bigserial PRIMARY KEY,
  _optlock_ bigint DEFAULT 0 NOT NULL,
  pavarde VARCHAR NOT NULL,
  vardas VARCHAR NOT NULL,
  UNIQUE (pavarde, vardas)
);

CREATE TABLE gaminys (
  _id_ bigserial PRIMARY KEY,
  _optlock_ bigint DEFAULT 0 NOT NULL,
  pavadinimas VARCHAR  NOT NULL UNIQUE
);

CREATE TABLE darbo_rezultatas (
  _id_ bigserial PRIMARY KEY,
  _optlock_ bigint DEFAULT 0 NOT NULL,
  darbininkas_id BIGINT NOT NULL REFERENCES darbininkas,
  gaminys_id BIGINT NOT NULL REFERENCES gaminys,
  kiekis decimal(12,4) NOT NULL,
  data_laikas TIMESTAMP NOT NULL,
  UNIQUE (data_laikas, darbininkas_id, gaminys_id)
);

CREATE TABLE gamybos_norma (
  _id_ bigserial PRIMARY KEY,
  _optlock_ bigint DEFAULT 0 NOT NULL,
  gaminys_id BIGINT NOT NULL REFERENCES gaminys,
  kiekis decimal(12,4) NOT NULL,
  uzmokestis_us_kieki decimal(12,4) NOT NULL,
  data_nuo DATE NOT NULL,
  UNIQUE (data_nuo, gaminys_id)
);
