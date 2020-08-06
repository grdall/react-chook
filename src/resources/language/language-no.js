// All text shown to users in norwegian in project
/*
export const VARNAME = "STRING";
*/

// DB table names - do not translate
export const DB_META = "metadata";
export const DB_INGREDIENT = "ingredient";
export const DB_RECIPE = "recipe";

// Dev stuff
export const FUNCTIONALITY_TEST_PANEL = "Testpanel for funksjonalitet";
export const SCRIPT_PANEL = "Skriptpanel";

// Days, Months
export const MON = "Mandag";
export const TUE = "Tirsdag";
export const WED = "Onsdag";
export const THU = "Torsdag";
export const FRI = "Fredag";
export const SAT = "Lørdag";
export const SUN = "Søndag";
export const JAN = "Januar";
export const FEB = "Februar";
export const MAR = "Mars";
export const APR = "April";
export const MAY = "Mai";
export const JUNE = "Juni";
export const JULY = "Juli";
export const AUG = "August";
export const SEPT = "September";
export const OCT = "Oktober";
export const NOV = "November";
export const DEC = "Desember";

// Pages
export const HOME = "Hjem";
export const ALL_RECIPES = "Alle oppskrifter";
export const PROFILE = "Profil";
export const SETTINGS = "Innstillinger";
export const DEV_OPTIONS = "Utvikler alternativer";
export const DEV = "Utvikler";
export const LOG_IN = "Logg inn";
export const LOG_OUT = "Logg ut";

// Emojis
export const EMOJI_RED_X = "❌";
export const EMOJI_GREEN_CHECK = "✔️";
export const EMOJI_CHICKEN = "🐔";
export const EMOJI_CHEF = "👨‍🍳";

// Misc.
export const MAIN_TITLE = "Chook";
export const WIP = "*Under arbeid*";
export const LOADING = "Laster inn...";
export const NORWEGIAN_KRONER = "kr";
export const MINUTES = "minutter";
export const THERE_ARE = "Det er ";
export const RECIPES_IN_DB = " oppskrifter i databasen.";
export const GET_RANDOM_DINNER = "Middagsforslag";
export const GET_DINNER_WEEK_MENU = "Lag en meny for uken";
export const DINNER = "middag";
export const TOTAL_RECIPES = " oppskrifter i databasen";
export const TOTAL_INGREDIENTS = " ingredienser i databasen";
export const LAST_UPDATED = "Oppdatert ";
export const UPDATE_METADATA = "Oppdater metadata";
export const CONTRASTMODE = "Kontrastmodus";
export const METRICMODE = "Bruk metersystem";
export const SCRAPERMODE = "Web-skraper";
export const ABOUT_US = "Om oss";
export const CONTRIBUTE_TO_PAGE = "Bidra til siden";
export const BUTTON = " knapp";
export const METADATA = "Metadata";
export const PREPARATION = "forberedelse";
export const TOTAL = "totalt";
export const RECIPES = "Oppskrifter";
export const RECIPE = "Oppskrift";
export const INGREDIENTS = "Ingredienser";
export const INGREDIENT = "Ingrediens";
export const PRICE = "Pris";
export const RELOAD = "Last inn på nytt";
export const FAILED = "Feilet";
export const MORE_INFORMATION_INGREDIENT = "Mer informasjon (Ingrediens)";
export const MORE_INFORMATION_RECIPE = "Mer informasjon (Oppskrift)";
export const ELEMENT = "Element";
export const CAN_EDIT_DB = "Kan redigere databasen";
export const NOT_LOGGED_IN = "Du er ikke logget inn.";
export const LOGGED_IN_AS = "Logget inn som:";
export const SCROLL_TO_TOP = "Toppen av siden";
export const MADE_WITH_TECH = "Laget med React, Firebase, og litt Kolonial";
export const WAS = "var";

// Upload
export const GENERAL_UPLOAD_INFORMATION = "På denne siden kan du laste opp ingredienser og oppskrifter til databasen. Alle ingredienser og oppskrifter har noen krav som må oppfylles før de godkjennes. Det finnes mer informasjon i panelene under.";
export const UPLOAD_FORM = "Last opp via skjema";
export const UPLOAD_FILE = "Last opp via fil";
export const UPLOAD_CHOOSE_FILE = "Velg en fil som skal lastes opp";
export const OVERVIEW = "Oversikt";
export const UPLOAD_QUEUE = "Opplastningskø";
export const VALIDATE_UPLOAD_DATA = "Valider data for opplasting";
export const NO_VALID_ITEMS_IN_FILE = "Det er ingen gyldige ingredienser eller oppskrifter i filen";
export const NOT_A_NUMBER = "Ikke et tall";
export const NUMBER_BELOW_ZERO = "Tallet er mindre enn null (0)";
export const NOT_AN_INGREDIENTTYPE = "Ikke en ingrediens-type";
export const NOT_VALID_NAME = "Ikke gyldig navn";
export const FAILED_ITEMS = "Feilmeldinger";

// Freetext ingredient information
export const FREETEXT = "Fri-tekst";
export const FREETEXT_MISSING = "Ingen fri-tekst funnet.";
export const FREETEXT_INFO = "Fri-tekst er et verktøy for å legge inn flere oppskrifter uten å bruke tid på å velge felter i et HTML-skjema eller sette opp format som JSON.";
export const FREETEXT_INPUT_INFO = "Denne teksten kan skrives i en valig .txt fil eller i tekstfeltet under og tolkes av nettsiden. På grunn av dette må teksen formateres på en spesiell måte.";
export const FREETEXT_SYNTAX_START = "Denne syntaksen er som følger:";
export const FREETEXT_SYNTAX_DELIM = "!";
export const FREETEXT_SYNTAX_NAME = "<navn på ingrediensen>";
export const FREETEXT_SYNTAX_TYPE = "<typen ingrediens (ENUM: I1)>";
export const FREETEXT_SYNTAX_PRICE = "<pris i NOK>";
export const FREETEXT_SYNTAX_COMMON = "<om ingrediensen er vanlig å ha (VALGFRITT)>";
export const SEASALT = "Havsalt";
export const SPICE = "spice";
export const FREETEXT_SYNTAX_EXAMPLE_PRICE = "36.10";
export const TRUE = "true";
export const FREETEXT_SYNTAX_EXAMPLE_START_INGREDIENT = "Det vil si at en ingrediens som " + SEASALT + " vil se sånn ut:"
export const FREETEXT_SYNTAX_INFO_EXCLAMATION = "- Alle ingredienser og oppskrifter MÅ starte med utropstegn (!).";
export const FREETEXT_SYNTAX_INFO_TYPES = "- En oversikt over typene kan du ser under:";
export const FREETEXT_SYNTAX_INFO_PRICE = "- Pris må være et tall (heltall eller desimal med punktum).";
export const FREETEXT_SYNTAX_INFO_COMMON = "- Vanlighet er valgfritt, men må skrives som \"1\" eller \"true\" om det er forventet at det finnes i det gjennomsnittlige husholdet, eller \"0\" eller \"false\" om det IKKE er forventet. Hvis ingenting skrives er standardverdien \"false\".";
export const FREETEXT_SYNTAX_INFO_KOLONIAL = "- Nettsiden kolonial.no har mange ingredienser om det skulle være nødvendig å sjekke pris. Det vil også gjøres set søk i databasen, og lignende data vil ikke bli lastet opp.";
export const FREETEXT_SYNTAX_INFO_OVERVIEW = "- Alle feilmeldinger kommer opp under \"" + FAILED_ITEMS + "\", mens ingredienser og oppskrifter som er godkjente vises som JSON i \"" + OVERVIEW + "\".";

// Freetext recipe information
export const FREETEXT_SYNTAX_TITLE = "<tittel på oppskrift>";
export const FREETEXT_SYNTAX_PORTIONS = "<prosjoner>";
export const FREETEXT_SYNTAX_TIME = "<tid for forberedelse> <tid totalt>";
export const FREETEXT_SYNTAX_TYPE_DIFF_RATE = "<typen oppskrift (ENUM: R1)> <vanskelighetsgrad (ENUM: R2)> <gradering 0-10>";
export const FREETEXT_SYNTAX_METHOD_TEMP_UNIT = "<tilbredingsmetode (ENUM: R3)> <antall grader> <temperaturenhet (ENUM: R4)>";
export const FREETEXT_SYNTAX_PROTEIN = "<protein (ENUM: R5)>";
export const FREETEXT_SYNTAX_SECTION_DELIM = "+";
export const FREETEXT_SYNTAX_RECIPE_INGREDIENT = "<antall (VALGFRITT)> <måle enhet (ENUM: R6, VALGFRITT)> <ingrediens navn> <forberedning (ENUM: R7, VALGFRITT)>";
export const FREETEXT_SYNTAX_INGREDIENTS = "<liste med ingredienser>";
export const FREETEXT_SYNTAX_INSTRUCTIONS = "<liste med instrukser>";
export const FREETEXT_SYNTAX_NOTES = "<liste med notater>";
export const EXAMPLE_RECIPE_TITLE = "Dim Sum";
export const EXAMPLE_RECIPE_PORTIONS = "4";
export const EXAMPLE_RECIPE_TIME = "15 90";
export const EXAMPLE_RECIPE_TYPE_DIFF_RATE = "tilbehør enkel 7";
export const EXAMPLE_RECIPE_METHOD_TEMP_UNIT = "dampet 200 c";
export const EXAMPLE_RECIPE_PROTEIN = "svin";
export const EXAMPLE_RECIPE_RECIPE_INGREDIENT1 = "400 g svinekjøttdeig";
export const EXAMPLE_RECIPE_RECIPE_INGREDIENT2 = "1 neve fersk koriander finhakket";
export const EXAMPLE_RECIPE_RECIPE_INGREDIENT3 = "2 rød chili finhakket";
export const EXAMPLE_RECIPE_RECIPE_INGREDIENT4 = "3 fedd hvitløk presset";
export const EXAMPLE_RECIPE_RECIPE_INGREDIENT5 = "3 tbs ingefær finhakket";
export const EXAMPLE_RECIPE_RECIPE_INGREDIENT6 = "Dim Sum ark";
export const EXAMPLE_RECIPE_INSTRUCTION1 = "Bland alle ingrediensene bortsett fra pasta flakene og la det stå en time.";
export const EXAMPLE_RECIPE_INSTRUCTION2 = "Pakk små porsjoner med kjøtt miksen inn i pastaplatene og damp dem i noen minutter. tiden det tar å dampe dem varierer etter størrelse og fasong, gjerne mellom 4 og 7 minutter.";
export const EXAMPLE_RECIPE_NOTE1 = "Serveres med Dim Sum dip.";
export const FREETEXT_SYNTAX_EXAMPLE_START_RECIPE = "Det vil si at en ingrediens som " + EXAMPLE_RECIPE_TITLE + " vil se sånn ut:"

export const SIMILAR_IN_DB = "Lignende funnet i database";
export const MISSING_LINES = "Linjer mangler; for kort.";
export const SECTION_MISSING = "Seksjon mangler.";
export const MAX_INGREDIENTS_IN_RECIPE = "Maksimum antall ingredienser i oppskriften.";
export const MAX_INSTRUCTIONS_IN_RECIPE = "Maksimum antall instruksjoner i oppskriften.";
export const MAX_NOTES_IN_RECIPE = "Maksimum antall notater i oppskriften.";
export const INGREDIENT_NOT_FOUND_FILE = "Ingrediens ikke funnet i fil.";
export const INGREDIENT_NOT_FOUND_DB = "Ingrediens ikke funnet i database.";
export const RECIPE_NOT_FOUND_DB = "Oppskrift ikke funnet i database.";
export const OUT_OF_BOUNDS = "Utenfor gyldig rekkevidde.";
export const SET_NAME = "Sett navn";
export const VALID_ENUM_VALUES = "Gyldige enum typer";
export const INGREDIENT_TYPE_ENUMS = "Ingrediens typer (ENUM: I1)";
export const RECIPE_TYPE_ENUMS = "Oppskrifts typer (ENUM: R1)";
export const DIFFICULTY_ENUMS = "Vanskelighetsgrad typer (ENUM: R2)";
export const COOKING_METHOD_ENUMS = "(Varme) Tilbrednings typer (ENUM: R3)";
export const TEMPRATURE_UNIT_ENUMS = "Temperatur enhet typer (ENUM: R4)";
export const PROTEIN_ENUMS = "Protein typer (ENUM: R5)";
export const QUANTITY_UNIT_ENUMS = "Kvanitet enhet typer (ENUM: R6)";
export const PREPARATION_ENUMS = "Forberedelse typer (ENUM: R7)";

export const TITLE = "Tittel";
export const TYPE = "type";
export const GRADE = "Gradering";
export const RATING = "Poeng";
export const PORTIONS = "Porsjoner";
export const PREP_TIME = "Forberedelsestid";
export const TOTAL_TIME = "Total tid";
export const COOKING_METHOD = "Metode";
export const COOKING_METHOD_TEMPERATURE = "Tempratur";
export const COOKING_METHOD_TEMPERATURE_UNIT = "Temperaturenhet";
export const SUBRECIPES = "Underoverskrifter";
export const INSTRUCTIONS = "Instruksjoner";
export const TIPS_NOTES = "Tips og/eller notater";

export const RECIPE_TEXT_FORMAT = "Oppskriftsformat";
export const INGREDIENT_TEXT_FORMAT = "Ingrediensformat"; 

export const UPLOAD = "Last opp";
export const ELEMENTS_TO_UPLOAD = "Elementer som skal lastes opp";

export const FORMAT_GUIDE = "Kopier oppskriftene til filen og formater som forklart i eksempelet.";
export const UPLOAD_GUIDE = "Klikk \"" + VALIDATE_UPLOAD_DATA + "\" for å begynne sjekken av data, deretter klikk \"" + UPLOAD + "\" får å laste opp. For å se mer informasjon, se konsoll-loggen (Høyreklikk > Inspiser > Klikk konsoll i toppen av vinduet som dukket opp).";

export const FILE_SELECTED = "Valgt fil";

// Search
export const SEARCH = "Søk";
export const SEARCH_SOMETHING = "Søk etter noe...";
export const SEARCH_RESULTS_FOR = "Søkeresultater for: ";
export const SEARCH_RESULTS = "Søkeresultater";
export const NO_RESULTS_FOR = "Ingen resultater for: ";
export const INVALID_SEARCH_TERM = "Ugyldig søkeord!";
export const LOAD = "Last inn";

// Errormessages
export const ERROR = "FEIL";
export const UNKNOWN_ERROR = "Feil: Ukjent feil";
export const NOT_FOUND_404 = "Feil: Siden finnes ikke: 404";
export const PAGE_NOT_FOUND = "Feil: Siden du leter etter finnes ikke.";
export const DB_FETCH_FAILED = "Feil: Kunne ikke hente data fra databasen.";
export const DB_SET_FAILED = "Feil: Kunne ikke laste opp data til databasen.";
export const TEST_ERROR = "Feil: Dette er en test feil.";
export const FILE_UPLOAD_ERROR = "Feil: Det skjedde en feil ved opplasting av en fil.";
export const NO_FILE_ERROR = "Feil: Finner ikke fil.";
export const ERROR_PERMISSION_DENIED = "Feil: Tilgang avslått.";
export const ERROR_INVALID_USERNAME_PASSWORD = "Feil: Ugyldig brukernavn eller passord.";
export const ERROR_INVALID_EMAIL = "Feil: Malformatert E-post";
export const ERROR_TOO_MANY_REQUESTS = "Feil: For mange forespørsler.";
export const UNDEFINED = "Udefinert";
export const CHEERIO_KOLONIAL_ERROR = "Feil i Kolonial (Cheerio)";
export const UNKNOWN_VALUE = "Ukjent verdi";
export const INVALID_TYPE = "Ikke en gyldig type";

// Enums
export const ENUM_OTHER = "Annet";
export const ENUM_NONE = "Ingen";
export const ENUM_MEAT = "Kjøtt";
export const ENUM_FISH = "Fisk";
export const ENUM_FOWL = "Fugl/Fjerkre";
export const ENUM_VEGETABLE = "Grønnsak";
export const ENUM_SAUCE = "Saus";
export const ENUM_CONDIMENT = "Tilbehør";
export const ENUM_BAKEDGOOD = "Bakeverk";
export const ENUM_PASTRY = "Bakverk";
export const ENUM_VINEGAR = "Eddik";
export const ENUM_FRUIT = "Frukt";
export const ENUM_HERB = "Urt";
export const ENUM_SPICE = "Krydder";
export const ENUM_PASTA = "Pasta";
export const ENUM_DAIRY = "Meieri";
export const ENUM_EGG = "Egg";
export const ENUM_HONEY = "Honning";
export const ENUM_OIL = "Olje";
export const ENUM_CANDY = "Godteri/Søtsak";
export const ENUM_SEED = "Frø";
export const ENUM_NUT = "Nøtt";
export const ENUM_DRINK = "Drikke";
export const ENUM_BAKE = "Bake";
export const ENUM_ROAST = "Riste";
export const ENUM_FRY = "Steke";
export const ENUM_DEEPFRY = "Fritere";
export const ENUM_BOIL = "Koke";
export const ENUM_SOUSVIDE = "Sous Vide";
export const ENUM_GRILL = "Grill";
export const ENUM_STEAM = "Dampet";
export const ENUM_VERY_EASY = "Veldig Enkel";
export const ENUM_EASY = "Enkel";
export const ENUM_MEDIUM = "Medium";
export const ENUM_HARD = "Vanskelig";
export const ENUM_VERY_HARD = "Veldig Vanskelig";
export const ENUM_WHOLE = "Hel";
export const ENUM_CHOPPED = "Grovhakket";
export const ENUM_MINCED = "Finhakket";
export const ENUM_QUBED = "Kubet";
export const ENUM_QUARTERED = "Kvartert";
export const ENUM_HALVED = "Halvert";
export const ENUM_SLICED = "Skivet";
export const ENUM_DRIED = "Tørket";
export const ENUM_PITTED = "Frø fjernet";
export const ENUM_CORED = "Frø fjernet";
export const ENUM_GRATED = "Raspet";
export const ENUM_MASHED = "Most";
export const ENUM_CRUSHED = "Knust";
export const ENUM_PRESSED = "Presset";
export const ENUM_VEGAN = "Vegansk";
export const ENUM_VEGETARIAN = "Vegetar";
export const ENUM_BEEF = "Storfe";
export const ENUM_LAMB = "Lam";
export const ENUM_PORK = "Svin";
export const ENUM_BIRD = "Fugl";
export const ENUM_SEAFOOD = "Sjømat";
export const ENUM_CELSIUS = "Celsius";
export const ENUM_FAHRENHEIT = "Fahrenheit";
export const ENUM_MAIN_DISH = "Hovedrett";
export const ENUM_SIDE_DISH = "Tilbehør";
export const ENUM_BREAKFAST = "Frokost";
export const ENUM_APPETIZER = "Forett";
export const ENUM_DESSERT = "Dessert";
export const ENUM_SALAD = "Salat";
export const ENUM_TEASPOON = "Teskje";
export const ENUM_TABLESPOON = "Spiseskje";
export const ENUM_CUP = "Kopp";
export const ENUM_CLOVE = "Fedd";
export const ENUM_PINCH = "Klype";
export const ENUM_FIST = "Neve";
export const ENUM_LEAF = "Blad";
export const ENUM_QUBE = "Kube";
export const ENUM_PORTION = "Porsjon";
export const ENUM_SLICE = "Skive";
export const ENUM_PACK = "Pakke";
export const ENUM_BOTTLE = "Flaske";
export const ENUM_CAN = "Boks";
export const ENUM_UNIT = "Enhet";
export const ENUM_SOME = "Litt";
export const ENUM_ALOT = "Mye";
export const ENUM_MG = "Milligram";
export const ENUM_G = "Gram";
export const ENUM_DAG = "Dekagram";
export const ENUM_HG = "Hektogram";
export const ENUM_KG = "Kilogram";
export const ENUM_MM = "Millimeter";
export const ENUM_CM = "Centimeter";
export const ENUM_M = "Meter";
export const ENUM_ML = "Milliliter";
export const ENUM_CL = "Centiliter";
export const ENUM_DL = "Desiliter";
export const ENUM_L = "Liter";
export const ENUM_GR = "Korn";
export const ENUM_IB = "Pund";
export const ENUM_ST = "Stone";
export const ENUM_INCH = "Tomme";
export const ENUM_FOOT = "Fot";
export const ENUM_OZ = "Unse (væske)";
export const ENUM_PT = "Pint";
export const ENUM_QT = "Kvart";
export const ENUM_GAL = "Gallon";