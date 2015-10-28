# Kollégiumi Recept Gyűjtemény
Alkalmazások Fejlesztése 1. beadandó - Kollégiumi recept gyűjtemény

## Követelményanalízis

Követelmények összegyűjtése: a nyújtandó szolgáltatások ismertetése rövid, szöveges leírásként, sokszor felsorolásként jelenik meg.
Funkcionális elvárások
Nem funkcionális követelmények

### Funkcionális elvárások
**A programnak tartalmaznia kell:**
- legalább két modellt, egy-sok kapcsolatban
- legalább 1 űrlapot
- legalább 1 listázó oldalt
- legyen lehetőség új felvételére
- legyen lehetőség meglévő szerkesztésére
- legyen lehetőség meglévő törlésére
- legyenek benne csak hitelesítés után elérhető funkciók

### Nem funkcionális elvárások
- perzisztálás fájlba történjen
- közzététel Herokun

### Szerepkörök
- A honlap használatához regisztráció szükséges
- A regisztrált tagok beléphetnek, létrehozhatnak/módosíthatnak/törölhetnek recepteket

![Használati Eset Diagram](docs/images/hasznalati_eset_diagram.png)

Egy recept törlésének pontos menete:
- A felhasználónak először regisztárlnia kell név, neptun kód, jelszó és avatar megadásával (az utolsó nem kötelező)
- Sikeres regisztrációt követően az oldal automatikusan belépteti
- A menüsor "Hozzáadás" elemére kattintva a felhasználó a "Recept Beküldése" oldalra kerül
- Itt a név, nehézség és leírás megadása után rögzítheti a receptjét
- A "Listázás" menüpontra kattintva a felhasználó láthatja a beküldött recepteket
- Itt megjelölheti az általa elkészíteni kívánt recepteket, módosíthatja és törölheti őket a megfelelő gombokra kattintva
- Végül pedig a jobb felső sarokban lévő "Kilépés" gombra kattintva kijelentkezhet



## Tervezés
## Implementáció
## Tesztelés
## Felhasználói dokumentáció
