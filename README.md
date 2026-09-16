# Ticket system

Ett biljettsystem där användare kan lista, skapa, använda och radera biljetter.

---

För att skapa en biljett används knappen **Create a ticket**.

För att använda en biljett mata in biljettens kod i fältet markerat **Enter the ticket code** och tryck sedan på knappen **Use ticket**.

För att lista och/eller radera biljetter behövs API nyckeln från filen `/backend/.env` som matas in i fältet markerat **Enter the API key** efter det tryck på knappen **Set**. Efter detta kommer biljetterna som finns i systemet listas på hemsidan. Därefter kan **Delete**  knapparna på vardera biljett användas för att radera biljetten.

## Databas

### Tickets

| Column     | Data Type | Constraints |
|------------|-----------|-------------|
| id         | TEXT      | PRIMARY KEY |
| used       | INTEGER   | NOT NULL    |
| created_at | TIMESTAMP | NOT NULL    |
| used_at    | TIMESTAMP |             |

## Kör projektet

För att köra projektet krävs `.env` filer i både `/frontend` och `/backend`. Lägg till variablerna från respektive `.env.example` fil i `.env` filerna.

För att starta backenden kör följande kommandon:
```
cd backend
npm install
npm run dev
```

För att starta frontenden kör följande kommandon:
```
cd frontend
npm install
npm run dev
```
