select "countries"."name" as "country",
        count("cities"."cityId") as "totalCities"
  from "cities"
  join "countries" using ("countryId")
group by "countries"."countryId"
;
