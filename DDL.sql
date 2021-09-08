CREATE TABLE public.genre (
	"key" uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar NOT NULL,
	"createdAt" timestamptz NULL DEFAULT now(),
	CONSTRAINT genre_pkey PRIMARY KEY (key)
);

CREATE TABLE public.category (
	"key" uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar NOT NULL,
	"genreKey" uuid NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT category_pkey PRIMARY KEY (key),
	CONSTRAINT "category_genreKey_fkey" FOREIGN KEY ("genreKey") REFERENCES public.genre("key")
);

CREATE TABLE public.item (
	"key" uuid NOT NULL DEFAULT uuid_generate_v4(),
	"genreKey" uuid NOT NULL,
	"categoryKey" uuid NOT NULL,
	"brand" varchar NOT NULL,
	"size" varchar NULL,
	"price" int8 NOT NULL,
	"purchaseDate" varchar NOT NULL,
	"imageKey" uuid NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"userId" varchar NOT NULL,
	"initialUseCount" int8 NOT NULL,
	CONSTRAINT item_pkey PRIMARY KEY (key),
	CONSTRAINT "item_categoryKey_fkey" FOREIGN KEY ("categoryKey") REFERENCES public.category("key"),
	CONSTRAINT "item_genreKey_fkey" FOREIGN KEY ("genreKey") REFERENCES public.genre("key")
);

CREATE TABLE public.calendar (
	"date" varchar NOT NULL,
	"itemKey" uuid NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"userId" varchar NOT NULL,
	CONSTRAINT calendar_pkey PRIMARY KEY (date, "itemKey"),
	CONSTRAINT "calendar_itemKey_fkey" FOREIGN KEY ("itemKey") REFERENCES public.item("key")
);

CREATE OR REPLACE VIEW public."itemView"
AS SELECT
    item."key",
    item."genreKey",
    item."categoryKey",
    item."brand",
    item."size",
    item."price",
    item."purchaseDate",
    item."imageKey",
    item."createdAt",
    item."userId",
    item."initialUseCount",
    COALESCE(tmp."useCount", 0) AS "useCount",
    item."initialUseCount" + COALESCE(tmp."useCount", 0) AS "totalUseCount"
  FROM item
    LEFT JOIN (
      SELECT
        calendar."itemKey" AS "itemKey",
        count(*) AS "useCount"
      FROM calendar
      GROUP BY calendar."itemKey"
    ) tmp ON item."key" = tmp."itemKey";

CREATE OR REPLACE VIEW public."itemSummary"
AS SELECT
    COALESCE(COUNT("itemView"."key"), 0) as "count",
    SUM(COALESCE("itemView"."price", 0)) AS "price",
    SUM(COALESCE("itemView"."totalUseCount", 0)) AS "totalUseCount",
    "itemView"."userId"
  FROM "itemView"
  GROUP BY "itemView"."userId";

CREATE OR REPLACE VIEW public."genreSummary"
AS SELECT
    genre."key",
    genre."name",
    genre."createdAt",
    "itemView"."userId",
    COALESCE(COUNT("itemView"."key"), 0) as "itemCount",
    SUM(COALESCE("itemView"."totalUseCount", 0)) AS "itemTotalUseCount"
  FROM genre
    LEFT JOIN "itemView"
      ON genre."key" = "itemView"."genreKey"
  GROUP BY genre."key", "itemView"."userId";
