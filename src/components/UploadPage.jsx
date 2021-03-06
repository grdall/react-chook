import React from "react";
import { connect } from "react-redux";

// Redux imports
import { getRecipeData, setRecipeError, setRecipeData } from "../actions/RecipeActions";
import { getIngredientData, setIngredientData } from "../actions/IngredientActions";
import { isFirebaseUserLoggedIn } from "../actions/UserActions";
import { renderLoading, renderError, setTitle, renderToast, getRandomString, toCamelCase, getKolonialItemWithCheerio, searchDatabase, getRecipeFromWebsite } from "../resources/Shared";

// Variable imports
import { UPLOAD, GENERAL_UPLOAD_INFORMATION, UPLOAD_FORM, UPLOAD_FILE, UPLOAD_QUEUE, OVERVIEW, UPLOAD_CHOOSE_FILE, TITLE, TYPE, 
    GRADE, RATING, PORTIONS, PREP_TIME, TOTAL_TIME, COOKING_METHOD, COOKING_METHOD_TEMPERATURE, COOKING_METHOD_TEMPERATURE_UNIT, 
    INGREDIENTS, INSTRUCTIONS, TIPS_NOTES, FILE_UPLOAD_ERROR, NO_FILE_ERROR, VALIDATE_UPLOAD_DATA, NO_VALID_ITEMS_IN_FILE,
    INGREDIENT, RECIPE, FAILED, PRICE, NOT_VALID_NAME, NOT_A_NUMBER, INVALID_TYPE, FAILED_ITEMS, RECIPES, 
    FREETEXT_INFO, FREETEXT_INPUT_INFO, FREETEXT_SYNTAX_START, FREETEXT_SYNTAX_DELIM, FREETEXT_SYNTAX_NAME, FREETEXT_SYNTAX_TYPE, FREETEXT_SYNTAX_PRICE, 
    FREETEXT_SYNTAX_COMMON, SEASALT, SPICE, FREETEXT_SYNTAX_EXAMPLE_PRICE, TRUE, FREETEXT, FREETEXT_MISSING,
    FREETEXT_SYNTAX_INFO_EXCLAMATION, FREETEXT_SYNTAX_INFO_TYPES, FREETEXT_SYNTAX_INFO_PRICE, FREETEXT_SYNTAX_INFO_COMMON, FREETEXT_SYNTAX_INFO_KOLONIAL, 
    FREETEXT_SYNTAX_INFO_OVERVIEW, ELEMENT, SIMILAR_IN_DB, SECTION_MISSING, MAX_INGREDIENTS_IN_RECIPE, MAX_INSTRUCTIONS_IN_RECIPE, MAX_NOTES_IN_RECIPE,
    INGREDIENT_NOT_FOUND_FILE, INGREDIENT_NOT_FOUND_DB, RECIPE_NOT_FOUND_DB, OUT_OF_BOUNDS, SET_NAME, WAS, UNDEFINED, DB_INGREDIENT, CHEERIO_KOLONIAL_ERROR, 
    VALID_ENUM_VALUES, INGREDIENT_TYPE_ENUMS, RECIPE_TYPE_ENUMS, DIFFICULTY_ENUMS, COOKING_METHOD_ENUMS, TEMPRATURE_UNIT_ENUMS, PROTEIN_ENUMS, QUANTITY_UNIT_ENUMS, 
    PREPARATION_ENUMS, MORE_INFORMATION_RECIPE, MORE_INFORMATION_INGREDIENT, FREETEXT_SYNTAX_TIME, FREETEXT_SYNTAX_TYPE_DIFF_RATE, FREETEXT_SYNTAX_METHOD_TEMP_UNIT, 
    FREETEXT_SYNTAX_SECTION_DELIM, FREETEXT_SYNTAX_INSTRUCTIONS, EXAMPLE_RECIPE_TITLE, EXAMPLE_RECIPE_PORTIONS_PROTEIN, EXAMPLE_RECIPE_TIME, 
    EXAMPLE_RECIPE_TYPE_DIFF_RATE, EXAMPLE_RECIPE_METHOD_TEMP_UNIT, EXAMPLE_RECIPE_RECIPE_INGREDIENT1, EXAMPLE_RECIPE_RECIPE_INGREDIENT2, 
    EXAMPLE_RECIPE_RECIPE_INGREDIENT3, EXAMPLE_RECIPE_RECIPE_INGREDIENT4, EXAMPLE_RECIPE_RECIPE_INGREDIENT5, EXAMPLE_RECIPE_RECIPE_INGREDIENT6, EXAMPLE_RECIPE_INSTRUCTION1, 
    EXAMPLE_RECIPE_INSTRUCTION2, EXAMPLE_RECIPE_NOTE1, FREETEXT_SYNTAX_EXAMPLE_START_RECIPE, FREETEXT_SYNTAX_TITLE, FREETEXT_SYNTAX_PORTIONS_PROTEIN, FREETEXT_SYNTAX_INGREDIENTS, 
    FREETEXT_SYNTAX_RECIPE_INGREDIENT, FREETEXT_SYNTAX_NOTES, UPLOAD_FROM_URL, INGREDIENT_MISSING_TYPE, ESSENTIAL
} from "../resources/language";
import { getBackgroundColor, getTextColor, getLightBackgroundColor, RED } from "../resources/colors";

// Component imports
import { Button } from "./common/Button";
import { Panel } from "./common/Panel";
import { Ingredient } from "../models/Ingredient";
import { IngredientType, IngredientTypeValue, IngredientTypeList, IngredientTypeIndexed } from "../models/enums/IngredientType";
import { Recipe } from "../models/Recipe";
import { RecipeIngredient } from "../models/RecipeIngredient";
import { RecipeType, RecipeTypeValue, RecipeTypeList } from "../models/enums/RecipeType";
import { Difficulty, DifficultyValue, DifficultyList } from "../models/enums/Difficulty";
import { CookingMethod, CookingMethodValue, CookingMethodList } from "../models/enums/CookingMethod";
import { TempratureUnit, TempratureUnitValue, TempratureUnitList } from "../models/enums/TempratureUnit";
import { QuantityUnitValue, QuantityUnitList, QuantityUnit } from "../models/enums/QuantityUnit";
import { PreparationValue, PreparationList, Preparation } from "../models/enums/Preparation";
import { Protein, ProteinValue, ProteinList } from "../models/enums/Protein";

class UploadPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = this.initState();

        this.parseFreetext = this.parseFreetext.bind(this);
        this.upload = this.upload.bind(this);
        this.selectFile = this.selectFile.bind(this);
    }

    initState()
    {
        return { freetext: "", filename: "", ingredientQueue: [], recipeQueue: [], errorsQueue: [], temp: "" };
    }

    componentWillMount()
    {
        this.allRecipes = getRecipeData();
        this.allIngredients = getIngredientData();
        
        setTitle(UPLOAD);
    }

    renderGeneralInformation()
    {
        return (
            <div>
                <h3 style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD}</h3>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{GENERAL_UPLOAD_INFORMATION}</p>
            </div>
        );
    }
    
    renderUploadForm()
    {
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <form ref="uploadForm" action="method">
                    {TITLE}<span key="requiredNotifierTitle" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/> 
                    <br/>
                    {TYPE}<span key="requiredNotifierType" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {GRADE}<span key="requiredNotifierGrade" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {RATING}<span key="requiredNotifierRating" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {PORTIONS}<span key="requiredNotifierPortions" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {PREP_TIME}<span key="requiredNotifierPrepTime" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {TOTAL_TIME}<span key="requiredNotifierTotalTime" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    <br/>
                    {COOKING_METHOD} <input type="text" name=""/>
                    <br/>
                    {COOKING_METHOD_TEMPERATURE} <input type="text" name=""/>
                    <br/>
                    {COOKING_METHOD_TEMPERATURE_UNIT} <input type="text" name=""/>
                    <br/>
                    {INGREDIENTS}<span key="requiredNotifierIngredients" style={{ ...{ color: RED } }}>*</span>
                    {/* // Ingredient array, multiple input with option to add more ingredients */}
                    <br/>
                    {INSTRUCTIONS}<span key="requiredNotifierInstructions" style={{ ...{ color: RED } }}>*</span> <input type="text" name="" required/>
                    {/* // Consider textarea for large text fields */}
                    <br/>
                    {TIPS_NOTES} <input type="text" name=""/>
                    <br/>
                    {/* // Once all required fields are filled, validate with the button under  */}
                    {OVERVIEW}
                </form>
            </div>
        );
    }

    renderUploadFile()
    {
        // css-tricks.com/image-upload-manipulation-react/
        // www.w3schools.com/jsref/dom_obj_fileupload.asp
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                {/* <input id="uploadFileId" ref="uploadFile" type="file"/> */}
                <input id="uploadFileId" ref="uploadFile" type="file" style={{ ...{ display: "none"} }}/>
                <Button onClick={this.selectFile} contrastmode={this.props.contrastmode} text={UPLOAD_CHOOSE_FILE}/> 
                <p>
                    {this.state.filename}
                </p>
            </div>
        );
    }  

    renderUploadFromWebsite()
    {
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <input id="getFreetextUrl" ref="getFreetextUrl" type="text" />
                <Button onClick={() => this.getFreetextFromWebsite()} contrastmode={this.props.contrastmode} text={UPLOAD_FROM_URL}/>
            </div>
        );
    }  

    async getFreetextFromWebsite()
    {
        let url = this.refs.getFreetextUrl.value.replace("%3A", ":").replace("%2F", "/"); // Replace escaped : and /
        let text = await getRecipeFromWebsite(url);
        this.setState({ freetext: text });
    }
    
    renderUploadFreetextArea()
    {
        let textAreaStyle = { resize: "vertical", width: "calc(100% - 0.8em)", paddingLeft: "0.5em" };
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}> 
                <textarea style={textAreaStyle} onChange={e => {this.setState({ freetext: e.target.value })}} 
                    id="freetextAreaId" ref="freetextArea" cols='60' rows='8' value={this.state.freetext}>
                    </textarea>
            </div>);
    }

    selectFile()
    {
        this.setState({ freetext: "", filename: "" });
        var fileElement = document.getElementById("uploadFileId");
        fileElement.click();

        fileElement.addEventListener("change", (event) =>
        {
            event.stopPropagation();
            event.preventDefault();
            const fileList = event.target.files;
            let file = fileList[0];

            if(!file)
            {
                setRecipeError(NO_FILE_ERROR);
                console.log("No file: " + fileElement.value);
                return;
            }

            let filename = file.name;
            
            // Setup a file reader
            let r = new FileReader();
            r.onload = e =>
            {
                console.log("File set");
                this.setState({ freetext: e.target.result, filename: filename });
                fileElement.value = null;
            };
            r.onerror = err =>
            {
                setRecipeError(FILE_UPLOAD_ERROR);
                console.log(err);
            }

            // Execute file reader
            r.readAsText(file);
        });
    }

    parseIngredient(lines, i, failedItems)
    {
        // let nLines = lines.length;
        let name = lines[0].replace("\t", "").toString().toLowerCase();
        let typeRaw = lines[1].replace("\t", "").toUpperCase().trim();
        let type = IngredientTypeValue(typeRaw);
        let price = lines[2];
        let isCommodity = false;

        // name cannot be empty or a just a number
        if((name === null || name.length < 1) && isNaN(parseFloat(name)))
        {
            failedItems.push(INGREDIENT + " " + i + " (" + name + "): " + NOT_VALID_NAME + ": \"" + name + "\"");
            return null;
        }

        // type must be parsable to IngredientType
        if(!this.parseEnum(failedItems, type, IngredientType, name, typeRaw))
            return null;

        // price must be a number, 0 or more
        price = this.parseNumber(failedItems, price, PRICE, name, 0, 9999, true);
        if(price === null)
            return null;

        // isCommodity must be "1" or "true" (faux-parse boolean)
        if(lines[3] != null && (lines[3] === "1" ||  lines[3] === "true"))
            isCommodity = true;

        return new Ingredient(getRandomString(), name, type, price, isCommodity);
    }

    async parseRecipe(lines, i, failedItems)
    {
        let canUpload = true;
        let nLines = lines.length;
        let sectionDelim = "+";
        let metaLinesMax = 6;
        let maxArrayItems = 64;

        // Metadata
        let title = lines[0].replace("\t", "").trim();
        let portionsProteinLine = lines[1].toString().trim().split(" ");
        let portions = portionsProteinLine[0];
        let proteinRaw = portionsProteinLine[1].replace("\t", "").toUpperCase().trim();
        let protein = ProteinValue(proteinRaw);
        // let cuisine = lines[1];
        
        // time
        let timeLine = lines[2].toString().trim().split(" ");
        let timePrep = timeLine[0].trim();
        let timeTotal = timeLine[1].trim();
        
        // type, difficulty, rating line. type is required, diff and rate is optional
        let typeDiffRate = lines[3].toString().trim().split(" ");
        let typeRaw = typeDiffRate[0].replace("\t", "").toUpperCase().trim();
        let type = RecipeTypeValue(typeRaw);
        let difficultyRaw = typeDiffRate.length > 1 ? typeDiffRate[1].replace("\t", "").toUpperCase().trim() : null;
        let difficulty = DifficultyValue(difficultyRaw);
        let rating = typeDiffRate.length > 2 ? typeDiffRate[2].trim() : null;
        
        // method++ line
        let methodLine = lines[4].toString().trim().split(" ");
        let cookingMethodRaw = methodLine[0].replace("\t", "").toUpperCase().trim();
        let cookingMethod = CookingMethodValue(cookingMethodRaw);
        let cookingMethodTemp = methodLine.length > 2 ? methodLine[1].trim() : null;
        let cookingMethodTempUnitRaw = methodLine.length > 3 ? methodLine[2].replace("\t", "").toUpperCase().trim() : null;
        let cookingMethodTempUnit = TempratureUnitValue(cookingMethodTempUnitRaw);

        // Arrays
        let subRecipes = [];
        let recipeIngredients = [];
        let instructions = [];
        let notes = [];

        // Control metadata
        console.log("Gathering metadata...");

        // title cannot be empty or a just a number
        if((title === null || title.length < 1) && isNaN(parseFloat(title)))
        {
            failedItems.push(RECIPE + " " + i + " (" + title + "): " + NOT_VALID_NAME + ": \"" + title + "\"");
            return null;
        }

        // Should be numbers: portions, timePrep, timeTotal, rating, cookingMethodTemp
        // Should be enumns: type, difficulty, cookingMethod, cookingMethodTempUnit, protein
        {
            console.log("Checking numbers...");

            portions = this.parseNumber(failedItems, portions, PORTIONS, title, 0, 32);
            if(portions === null)
                return null;

            timePrep = this.parseNumber(failedItems, timePrep, PREP_TIME, title, 0, 9999);
            if(timePrep === null)
                return null;

            timeTotal = this.parseNumber(failedItems, timeTotal, TOTAL_TIME, title, timePrep, 9999);
            if(timeTotal === null)
                return null;
                
            rating = this.parseNumber(failedItems, rating, RATING, title, 0, 10, true);
            if(rating === null)
                return null;
                
            cookingMethodTemp = this.parseNumber(failedItems, cookingMethodTemp, COOKING_METHOD_TEMPERATURE, title, -10, 666);
        } // Recipe metadata parse numbers (the extra parentheses are so this section can be collapsed and make code more readable)
           
        {
            console.log("Checking enums...");
            // parseEnum(messageArray, value, enumCollection, itemName, rawValue)

            if(!this.parseEnum(failedItems, protein, Protein, title, proteinRaw))
                return null;

            if(!this.parseEnum(failedItems, type, RecipeType, title, typeRaw))
                return null;

            if(!this.parseEnum(failedItems, difficulty, Difficulty, title, difficultyRaw))
                return null;

            if(cookingMethod && !this.parseEnum(failedItems, cookingMethod, CookingMethod, title, cookingMethodRaw))
                return null;

            if(cookingMethodTempUnit && !this.parseEnum(failedItems, cookingMethodTempUnit, TempratureUnit, title, cookingMethodTempUnitRaw))
                return null;
        } // Recipe metadata parse enums (the extra parentheses are so this section can be collapsed and make code more readable)
        
        // If degrees are set but not degree unit, default to Celcius
        if(cookingMethodTemp && !cookingMethodTempUnit)
            cookingMethodTempUnit = TempratureUnit.C;

        console.log("Preparing ingredients...");
        // Line after metadata should have a + that ends metadata section and starts ingredient section
        let j = (metaLinesMax - 3);
        while (lines[j].trim() !== sectionDelim)
        {
            if(j > metaLinesMax)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + SECTION_MISSING);
                return null;
            }
            j++;
        }

        // Gather ingredients for recipe
        console.log("Gathering ingredients...");
        let l = j + 1;
        
        while(lines[l] && lines[l].toString().trim() !== sectionDelim)
        {
            if(l > maxArrayItems)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + MAX_INGREDIENTS_IN_RECIPE);
                break;
            }

            let recipeIngredientIndex = 0;
            let ingredientLine = lines[l].toString().split(" ");
            let quantity = null;
            let quantityUnit = null;
            let preparation = null;

            // Quantity will always be the first entry
            if(!isNaN(Number(ingredientLine[0])) && Number(ingredientLine[0]) > 0)
            {
                quantity = Number(ingredientLine[0]);
                recipeIngredientIndex++;
            }

            // Quantity unit is always second if not null
            if(recipeIngredientIndex === 1)
            {
                quantityUnit = QuantityUnitValue(ingredientLine[1].toUpperCase().trim());
                
                if(QuantityUnit[quantityUnit] !== undefined)
                    recipeIngredientIndex++;
            }

            // Preparation will always be the last entry
            preparation = PreparationValue(ingredientLine[ingredientLine.length - 1].toUpperCase().trim());
            let hasPreparation = PreparationValue(preparation) !== null;

            let ingredientName = ingredientLine.slice(recipeIngredientIndex, ingredientLine.length - (hasPreparation ? 1 : 0)).join(" ").toLowerCase();

            if(!ingredientName)
            {
                failedItems.push(RECIPE + " " + i + " (" + ingredientName + "): " + INGREDIENT_NOT_FOUND_FILE);
                return null;
            }

            // If the first character in the line is a "-", it's marked as a subrecipe. Find recipe in DB or fail.
            if(ingredientName[0] === "-")
            {
                let subRecipeName = toCamelCase(ingredientName.substring(1, ingredientName.length)).trim();
                let dbSubRecipes = await getRecipeData("title", subRecipeName);
                if(dbSubRecipes.length !== 1)
                {
                    failedItems.push(RECIPE + " " + i + " (" + subRecipeName + "): " + RECIPE_NOT_FOUND_DB);
                    return null;
                }

                subRecipes.push(new RecipeIngredient(dbSubRecipes[0].id, quantity, dbSubRecipes[0].title, quantityUnit, preparation, true));
            }
            else
            {
                // let searchResult = await getIngredientData("name", ingredientName, 1);
                let searchResult = await searchDatabase(ingredientName, 2, ["name"], DB_INGREDIENT);
                let ingredient = null;

                if(searchResult.length === 0 && this.props.scraper)
                {
                    canUpload = false;
                    this.downloadAndRenderScraperingredient(ingredientName);

                    l++;
                    continue;
                }
                else if(searchResult.length === 0)
                {
                    canUpload = false;
                    failedItems.push(RECIPE + " " + i + " (" + ingredientName + "): " + INGREDIENT_NOT_FOUND_DB);
                    return null;
                }
                else
                    ingredient = searchResult[0];
                
                recipeIngredients.push(new RecipeIngredient(ingredient.id, quantity, ingredient.name, quantityUnit, preparation));
            }
            l++;
        }
        
        // Gather instructions
        console.log("Gathering instructions...");
        let m = l + 1;
        while(lines[m] && lines[m].toString().trim() !== sectionDelim && m < nLines)
        {
            instructions.push(lines[m].toString());

            if(m > maxArrayItems)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + MAX_INSTRUCTIONS_IN_RECIPE);
                break;
            }
            m++;
        }
        
        // Gather notes
        console.log("Gathering notes...");
        let n = m + 1;
        while(n < nLines)
        {
            notes.push(lines[n].toString());

            if(n > maxArrayItems)
            {
                failedItems.push(RECIPE + " " + i + " (" + title + "): " + MAX_NOTES_IN_RECIPE);
                break;
            }
            n++;
        }

        if(!canUpload)
            return null;

        return new Recipe(getRandomString(), 
            toCamelCase(title), 
            type, 
            difficulty,
            rating, 
            portions, 
            timePrep, 
            timeTotal, 
            cookingMethod, 
            cookingMethodTemp, 
            cookingMethodTempUnit, 
            protein,
            recipeIngredients, 
            subRecipes,
            instructions, 
            notes);
    }

    async downloadAndRenderScraperingredient(ingredientName)
    {
        let ingredient = await getKolonialItemWithCheerio(ingredientName);
        let customIngredientName = "";
        let typeSelectHtml = [];
        let failedItems = this.state.errorsQueue;

        if(!ingredient)
        {
            failedItems.push(ingredientName + ": " + CHEERIO_KOLONIAL_ERROR);
            this.setState({ failedItems: failedItems });
            return;
        }

        IngredientTypeIndexed().forEach(e => 
        { 
            typeSelectHtml.push(<option value={e.value}>{e.text}</option>);
        });

        let createdNewIngredientHtml = (<div id={ingredient.id}>
                <div className="rowStyle">{ingredientName + ": " + INGREDIENT_NOT_FOUND_DB}</div>
                <div>
                    { SET_NAME + " (" + WAS} "<a style={{ ...getTextColor(this.props.contrastmode) }} href={ingredient.source_link} target="_blank">
                        <em>{ingredient.original_name}</em></a>"{"):"} 
                    <div className="rowStyle">
                        <input style={{ width: "30%", height: "1.5em", margin: "auto 0" }} id="kolonial-upload-ingredient-name" 
                            onChange={e => customIngredientName = e.target.value} defaultValue={ingredientName}/>

                        <select style={{ width: "20%", height: "1.5em", margin: "auto 0" }} onChange={e => { ingredient.type = e.target.value; this.setState({ temp: e.target.value }); }}>
                            {typeSelectHtml}
                        </select>

                        {ESSENTIAL}: <input type="checkbox" onChange={e => { ingredient.is_commodity = !ingredient.is_commodity; this.setState({ temp: e.target.value }); }} />

                        <Button onClick={() => this.uploadScraperIngredient(ingredient, customIngredientName)} contrastmode={this.props.contrastmode}   
                            text={UPLOAD + " " + INGREDIENT}/>
                    </div>
                </div>
            </div>);

        failedItems.push(createdNewIngredientHtml);
        this.setState({ errorsQueue: failedItems });
    }

    parseNumber(messageArray, n, valueName, itemName, min, max, isFloat = false)
    {
        if(isNaN(Number(n)) || isFloat && isNaN(parseFloat(n)))
        {
            messageArray.push(itemName + ": " + NOT_A_NUMBER + ": " + valueName);
            return null;
        }
        else if(!isFloat && Number(n) < min || Number(n) > max)
        {
            messageArray.push(itemName + ": " + OUT_OF_BOUNDS + ": " + valueName);
            return null;
        }
        else if(isFloat && parseFloat(n) < min || parseFloat(n) > max)
        {
            messageArray.push(itemName + ": " + OUT_OF_BOUNDS + ": " + valueName);
            return null;
        }
        
        if(isFloat)
            return parseFloat(n);
        else
            return Number(n);
    }

    parseEnum(messageArray, value, enumCollection, itemName, rawValue)
    {
        if(!isNaN(value) || enumCollection[value] === undefined)
        {
            messageArray.push(itemName + ": " + INVALID_TYPE + ": \"" + rawValue + "\"");
            return false;
        }
        
        return true;
    }

    async parseFreetext()
    {
        let freetext = this.state.freetext;
        if(freetext === "")
        {
            this.setState({ errorsQueue: [ FREETEXT_MISSING ] });
            return;
        }

        this.setState({ ingredientQueue: [], recipeQueue: [], errorsQueue: [] });
        // Split text on exclamation marks. First instance ([0]) in items should be empty because an item starts with !, i.e. the data is after.
        let ingredients = [];
        let recipes = [];
        let failedItems = [];
        let items = freetext.split("!");

        if(items.length <= 1)
        {
            this.setState({ errorsQueue: [NO_VALID_ITEMS_IN_FILE] });
            return;
        }

        for (let i = 1; i < items.length; i++)
        {
            let lines = items[i].split(/\r?\n/).filter(e => e);
            let nLines = lines.length;

            console.log(i + ": nLines: " + nLines);
            console.log(items[i]);

            // Ingredient has 3 mandatory lines, 1 optional
            // Accepted number of lines for ingredient: 3, 4
            if(nLines === 3 || nLines === 4)
            {
                let parsedIngredient = this.parseIngredient(lines, i, failedItems);
                if(parsedIngredient === null)
                    continue;
                
                ingredients.push(parsedIngredient);
            }

            // Recipe has 10 mandatory lines, potentially infinite
            // Accepted number of lines for ingredient: 10+
            else if(nLines > 9)
            {
                let parsedRecipe = await this.parseRecipe(lines, i, failedItems);
                if(parsedRecipe === null)
                    continue;
                
                recipes.push(parsedRecipe);
            }

            else
                failedItems.push(ELEMENT + " " + i + " (" + "?" + "): " + FAILED); // Unknown entity
        }

        console.log("\nEnqueueing items...");
        console.log(ingredients);
        console.log(recipes);
        console.log(failedItems);

        this.setState({ filename: "", ingredientQueue: ingredients, recipeQueue: recipes, errorsQueue: failedItems });
    }

    async upload()
    {
        if(this.state.errorsQueue.length > 0)
        {
            this.state.errorsQueue.forEach(e => {
                console.log(e);
            });
        }

        if(this.state.ingredientQueue.length === 0 && this.state.recipeQueue.length === 0)
            console.log("No ingredients or recipes in queue to upload");
        else
        {
            this.setState({ errorsQueue: [] });

            if(this.state.ingredientQueue.length > 0)
            {                
                // For each, look for ingredient with the same name, and ID.
                // If no duplicates, upload async.
                // TODO: Consider hash excluding name?,  name could look for 90% match? for similar, include hash? same hash for price and type only, with x% match on name?
                var iQueue = this.state.ingredientQueue;
                for (var j = 0; j < iQueue.length; j++) 
                    this.uploadItem(iQueue[j]);
                    
                this.setState({ ingredientQueue: [] });
            }

            if(this.state.recipeQueue.length > 0)
            {
                var rQueue = this.state.recipeQueue;
                for (var j = 0; j < rQueue.length; j++) 
                    rQueue[j].upload(rQueue[j]);

                this.setState({ recipeQueue: [] });
            }
        }
    }

    async uploadScraperIngredient(i, customIngredientName)
    {
        let errorsQueue = this.state.errorsQueue;
        
        if(customIngredientName)
            i.name = customIngredientName.toLowerCase();

        if(i.type === null)
        {
            errorsQueue.push(<span id={i.id}>{INGREDIENT_MISSING_TYPE + " " + i.original_name}</span>);
            this.setState({ errorsQueue: errorsQueue });
            return;
        }
        
        this.uploadItem(i);
        let spliceIndexes = [];
        // Remove newly uploaded ingredient from state along with error.
        // Simplyfy
        let indexes = errorsQueue.map((e, index) => { return e.props && e.props.id == i.id ? index : null }).filter(e => e !== null).reverse();
        indexes.forEach(e => errorsQueue.splice(e, 1));        

        this.setState({ errorsQueue: errorsQueue });
    }

    async uploadItem(i, itemName = INGREDIENT)
    {
        console.log("\nUploading: " + i.name ?? i.title);
        let failedUploads = this.state.errorsQueue;

        if(i.name === undefined && i.title === undefined)
        {
            failedUploads.push(itemName + " \"" + i.name + "\": " + UNDEFINED);
            this.setState({ errorsQueue: failedUploads });
            return null;
        }

        // let searchResult = await searchDatabase(itemName, 4, ["name"], DB_INGREDIENT); // TODO consider use search function (firebase side ok for now)
        let byNameData = null;
        if(itemName === INGREDIENT)
            byNameData = await getIngredientData("name", i.name);
        else if(itemName === RECIPE)
            byNameData = await getRecipeData("title", i.title);

        if(byNameData !== undefined && byNameData.length !== 0)
        {
            failedUploads.push(itemName + " \"" + i.name + "\": " + SIMILAR_IN_DB + ": " + byNameData[0].name ?? byNameData[0].title);
            this.setState({ errorsQueue: failedUploads });
            return null;
        }

        let byIdData = null;
        if(itemName === INGREDIENT)
            byIdData = await getIngredientData("id", i.id);
        else if(itemName === RECIPE)
            byIdData = await getRecipeData("id", i.id);

        if(byIdData !== undefined && byIdData.length !== 0)
        {
            failedUploads.push(itemName + " \"" + i.id + "\": " + SIMILAR_IN_DB + ", ID: " + byIdData[0].id);
            this.setState({ errorsQueue: failedUploads });
            return null;
        }
        
        console.log("Item ok, will upload async.");
        if(itemName === INGREDIENT)
            setIngredientData(i);
        else if(itemName === RECIPE)
            setRecipeData(i);

        return i;
    }

    renderUploadButtons()
    {
        if(this.props.ingredientLoading || this.props.recipeLoading)
            return renderLoading(false, this.props.contrastmode);

        if(this.props.ingredientError || this.props.recipeError)
            return renderError((this.props.ingredientError || this.props.recipeError), false, this.props.contrastmode);

        // Since components can be stubborn and refuse to re-render with new props, 
        // get a variable that chages (like ms) and set it as a key, this forces the component to re-render.
        let ms = new Date().getMilliseconds();
        
        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                {this.queue ? <p style={{ ...getTextColor(this.props.contrastmode) }}>{UPLOAD_QUEUE + ": " + this.queue}</p> : (null)}

                <div className="rowStyle">
                    <Button key={"validateButton" + ms} onClick={this.parseFreetext} contrastmode={this.props.contrastmode} text={VALIDATE_UPLOAD_DATA}/> 
                    
                    <Button key={"uploadButton" + ms} onClick={(this.state.ingredientQueue.length > 0 || this.state.recipeQueue.length > 0 ? this.upload : (null))} 
                        contrastmode={this.props.contrastmode} text={UPLOAD}/> 
                </div>
            </div>
        );
    }

    renderUploadSummary()
    {
        let textAreaStyle = { resize: "vertical", width: "calc(100% - 0.8em)", paddingLeft: "0.5em" };
        let rows = "32";

        let failedQueue = this.state.errorsQueue;
        let failedList = [];
        failedQueue.forEach(e => 
        {
            failedList.push(<li>{e}</li>);
        });
        let failedData = failedQueue.length === 0 ? null : <ul>{failedList}</ul>; // null, empty, "...", "nothing here yet", or "no fails"

        let ingredientQueue = this.state.ingredientQueue;
        let ingredientData = ingredientQueue.length === 0 ? null :
            <textarea style={textAreaStyle} rows={rows} disabled readonly>
                {JSON.stringify(ingredientQueue, null, 2).toString()}
            </textarea>;

        let recipeQueue = this.state.recipeQueue;
        let recipeData = recipeQueue.length === 0 ? null :
            <textarea style={textAreaStyle} rows={rows} disabled readonly>
                {JSON.stringify(recipeQueue, null, 2).toString()}
            </textarea>;

        return (
            <div style={{ ...getLightBackgroundColor(this.props.contrastmode) }}>
                <h2 style={{ ...getTextColor(this.props.contrastmode) }}>{FAILED_ITEMS}</h2>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{failedData}</p>
                <h2 style={{ ...getTextColor(this.props.contrastmode) }}>{INGREDIENTS}</h2>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{ingredientData}</p>
                <h2 style={{ ...getTextColor(this.props.contrastmode) }}>{RECIPES}</h2>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{recipeData}</p>
            </div>
        );
    }

    renderIngredientFreextextGuide()
    {
        return (
            <Panel title={MORE_INFORMATION_INGREDIENT} contrastmode={this.props.contrastmode}>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_INFO}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_INPUT_INFO}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_START}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_NAME}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_TYPE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_PRICE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_COMMON}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_EXAMPLE_START_RECIPE}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{SEASALT}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{SPICE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_EXAMPLE_PRICE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{TRUE}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_EXCLAMATION}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_TYPES}</p>
                <Panel title={VALID_ENUM_VALUES} contrastmode={this.props.contrastmode}>
                    <Panel title={INGREDIENT_TYPE_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {IngredientTypeList(true)}
                    </Panel>
                </Panel>

                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_PRICE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_COMMON}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_KOLONIAL}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_OVERVIEW}</p>
            </Panel>
        );
    }

    renderRecipeFreextextGuide()
    {
        return (
            <Panel title={MORE_INFORMATION_RECIPE} contrastmode={this.props.contrastmode}>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_INFO}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_INPUT_INFO}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_START}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_TITLE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_PORTIONS_PROTEIN}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_TIME}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_TYPE_DIFF_RATE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_METHOD_TEMP_UNIT}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_SECTION_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INGREDIENTS}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_RECIPE_INGREDIENT}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_SECTION_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INSTRUCTIONS}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_SECTION_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_NOTES}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_EXAMPLE_START_RECIPE}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_TITLE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_PORTIONS_PROTEIN}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_TIME}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_TYPE_DIFF_RATE}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_METHOD_TEMP_UNIT}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_SECTION_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_RECIPE_INGREDIENT1}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_RECIPE_INGREDIENT2}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_RECIPE_INGREDIENT3}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_RECIPE_INGREDIENT4}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_RECIPE_INGREDIENT5}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_RECIPE_INGREDIENT6}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_SECTION_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_INSTRUCTION1}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_INSTRUCTION2}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_SECTION_DELIM}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{EXAMPLE_RECIPE_NOTE1}</p>
                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_EXCLAMATION}</p>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_TYPES}</p>
                <Panel title={VALID_ENUM_VALUES} contrastmode={this.props.contrastmode}>
                    <Panel title={RECIPE_TYPE_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {RecipeTypeList(true)}
                    </Panel>
                    <Panel title={DIFFICULTY_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {DifficultyList(true)}
                    </Panel>
                    <Panel title={COOKING_METHOD_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {CookingMethodList(true)}
                    </Panel>
                    <Panel title={TEMPRATURE_UNIT_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {TempratureUnitList(true)}
                    </Panel>
                    <Panel title={PROTEIN_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {ProteinList(true)}
                    </Panel>
                    <Panel title={QUANTITY_UNIT_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {QuantityUnitList(true)}
                    </Panel>
                    <Panel title={PREPARATION_ENUMS} contrastmode={this.props.contrastmode} startExpanded>
                        {PreparationList(true)}
                    </Panel>
                </Panel>

                <hr/>
                <p style={{ ...getTextColor(this.props.contrastmode) }}>{FREETEXT_SYNTAX_INFO_OVERVIEW}</p>
            </Panel>
        );
    }

    renderContent()
    {
        let uploadContent = null;
        
        if(isFirebaseUserLoggedIn())
            uploadContent = (<span>
                    <Panel title={FREETEXT} contrastmode={this.props.contrastmode}>  {/* Should be freetext not file */}
                        {this.renderUploadFromWebsite()}
                        {this.renderUploadFreetextArea()}
                        {this.renderUploadFile()}
                    </Panel>

                    <hr/>
                    <Panel title={OVERVIEW} contrastmode={this.props.contrastmode} startExpanded>
                        {/* Buttons to validate input
                        Specific info about what's about to be uploaded (number of items, name/title of items)
                        Upload buttons (if validation successful) */}
                        {this.renderUploadButtons()}

                        {/* Render a log or summary for uplodaing queues. */}
                        {this.renderUploadSummary()}
                    </Panel>
                </span>);

        return (
            <div>
                {this.renderGeneralInformation()}
                <hr/>

                {this.renderIngredientFreextextGuide()}
                <hr/>

                {this.renderRecipeFreextextGuide()}
                <hr/>

                {/* <hr/> */}
                {/* Option to upload using a html input form */}
                {/* <Panel title={UPLOAD_FORM} contrastmode={this.props.contrastmode}>
                    {this.renderUploadForm()}
                </Panel> */}

                {uploadContent}

            </div>);
    }

    render()
    {            
        return (
            <div style={getBackgroundColor(this.props.contrastmode)}>
                <div className="pageRootContainer">
                    <div style={{ ...getBackgroundColor(this.props.contrastmode) }}>
                        {renderToast(this.props.toastMessage, 5000, this.props.contrastmode)}   
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => 
{
    const { contrastmode, scraper, toastMessage } = state.settings;
    const { recipeError, recipeLoading, recipeResult } = state.recipe;
    const { ingredientError, ingredientLoading, ingredientResult } = state.ingredient;
    return { contrastmode, scraper, toastMessage,
        recipeError, recipeLoading, recipeResult, 
        ingredientError, ingredientLoading, ingredientResult };
};
  
export default connect(
    mapStateToProps, { getRecipeData, getIngredientData }
)(UploadPage);