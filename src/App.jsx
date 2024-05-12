import React, { useState } from "react";
import axios from "axios";

function App() {
  const [recipe, setRecipe] = useState({});
  const [ingredient, setIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showDietChecklist, setShowDietChecklist] = useState(false);
  const [showMealTypeChecklist, setShowMealTypeChecklist] = useState(false);
  const [showHealthChecklist, setShowHealthChecklist] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [selectedHealth, setSelectedHealth] = useState(null);

  const [dietItem, setDietItem] = useState([
    { id: 0, text: "Any", checked: true },
    { id: 1, text: "Balanced", checked: false },
    { id: 2, text: "High-fiber", checked: false },
    { id: 3, text: "High-protein", checked: false },
    { id: 4, text: "Low-carb", checked: false },
    { id: 5, text: "Low-fat", checked: false },
    { id: 6, text: "Low-sodium", checked: false },
  ]);

  const [mealTypeItem, setMealTypeItem] = useState([
    { id: 7, text: "Any", checked: true },
    { id: 8, text: "Breakfast", checked: false },
    { id: 9, text: "Brunch", checked: false },
    { id: 10, text: "Lunch&Dinner", checked: false },
    { id: 11, text: "Snack", checked: false },
    { id: 12, text: "Teatime", checked: false },
  ]);

  const [healthItem, setHealthItem] = useState([
    { id: 13, text: "Any", checked: true },
    { id: 14, text: "Alcohol-cocktail", checked: false },
    { id: 15, text: "Alcohol-free", checked: false },
    { id: 16, text: "Celery-free", checked: false },
    { id: 17, text: "Crustacean-free", checked: false },
    { id: 18, text: "Dairy-Free", checked: false },
    { id: 19, text: "Egg-free", checked: false },
    { id: 20, text: "Fish-free", checked: false },
    { id: 21, text: "Fodmap-free", checked: false },
    { id: 22, text: "Gluten-free", checked: false },
    { id: 23, text: "Immuno-supportive", checked: false },
    { id: 24, text: "Keto-friendly", checked: false },
    { id: 25, text: "Kidney-friendly", checked: false },
    { id: 26, text: "Kosher", checked: false },
    { id: 27, text: "Low-potassium", checked: false },
    { id: 28, text: "Low-sugar", checked: false },
    { id: 29, text: "Lupine-free", checked: false },
    { id: 30, text: "Mediterranean", checked: false },
    { id: 31, text: "Mollusk-free", checked: false },
    { id: 32, text: "Mustard-free", checked: false },
    { id: 33, text: "Paleo", checked: false },
    { id: 34, text: "Peanut-free", checked: false },
    { id: 35, text: "Pescatarian", checked: false },
    { id: 36, text: "Pork-free", checked: false },
    { id: 37, text: "Red-Meat-free", checked: false },
    { id: 38, text: "Sesame-free", checked: false },
    { id: 39, text: "Shellfish-free", checked: false },
    { id: 40, text: "Soy-free", checked: false },
    { id: 41, text: "Sugar-conscious", checked: false },
    { id: 42, text: "Sulfite-free", checked: false },
    { id: 43, text: "Tree-nut-free", checked: false },
    { id: 44, text: "Vegan", checked: false },
    { id: 45, text: "Vegetarian", checked: false },
    { id: 46, text: "Wheat-free", checked: false },
  ]);

  let url = `https://api.edamam.com/search?q=${ingredient}&app_id=6848e697&app_key=
  19fafd92032e4496a5731ba3f23219ff&from=0&to=100`;

  const searchRecipes = () => {
    if (selectedDiet) {
      const lowercaseDiet = selectedDiet.toLowerCase();
      url += `&diet=${lowercaseDiet}`;
    }
    if (selectedMealType) {
      const lowercaseMealType = selectedMealType.toLowerCase();
      url += `&mealType=${lowercaseMealType}`;
    }
    if (selectedHealth) {
      if (selectedHealth !== "Mediterranean") {
        const lowercaseHealth = selectedHealth.toLowerCase();
        url += `&health=${lowercaseHealth}`;
      } else {
        url += `&health=${selectedHealth}`;
      }
    }
    if (cuisine) {
      url += `&cuisineType=${cuisine}`;
    }
    axios.get(url).then((response) => {
      setRecipe(response.data);
    });
    setIngredient("");
    setCuisine("");
    console.log(url);
  };

  const updateSelectedItem = (item, checklist) => {
    if (checklist === "diet") {
      if (item.id !== 0) {
        setSelectedDiet(item.text);
      } else {
        setSelectedDiet(null);
      }
    }
    if (checklist === "meal-type") {
      if (item.id !== 7) {
        setSelectedMealType(item.text);
      } else {
        setSelectedMealType(null);
      }
    }
    if (checklist === "health") {
      if (item.id !== 13) {
        setSelectedHealth(item.text);
      } else {
        setSelectedMealType(null);
      }
    }
  };

  const displayFilter = () => {
    setShowFilter((prevShowFilter) => !prevShowFilter);
    setShowDietChecklist(false);
    setShowMealTypeChecklist(false);
    setShowHealthChecklist(false);
  };

  const displayDietChecklist = () => {
    setShowDietChecklist(!showDietChecklist);
    showMealTypeChecklist && setShowMealTypeChecklist(false);
    showHealthChecklist && setShowHealthChecklist(false);
    console.log(showDietChecklist);
    console.log(showMealTypeChecklist);
  };

  const displayMealTypeChecklist = () => {
    setShowMealTypeChecklist(!showMealTypeChecklist);
    showDietChecklist && setShowDietChecklist(false);
    showHealthChecklist && setShowHealthChecklist(false);
  };

  const displayHealthChecklist = () => {
    setShowHealthChecklist(!showHealthChecklist);
    showDietChecklist && setShowDietChecklist(false);
    showMealTypeChecklist && setShowMealTypeChecklist(false);
  };

  const toggleItem = (id, checklist) => {
    if (checklist === "diet") {
      setDietItem(
        dietItem.map((item) => ({
          ...item,
          checked: item.id === id,
        }))
      );
    }
    if (checklist === "meal-type") {
      setMealTypeItem(
        mealTypeItem.map((item) => ({
          ...item,
          checked: item.id === id,
        }))
      );
    }

    if (checklist === "health") {
      setHealthItem(
        healthItem.map((item) => ({
          ...item,
          checked: item.id === id,
        }))
      );
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="field">
          <button className="filter" onClick={displayFilter}>
            =
          </button>
          {showFilter && (
            <div className="filter-overlay">
              <div className="filter-content">
                <p onClick={displayDietChecklist}>Diet</p>
                <p onClick={displayMealTypeChecklist}>Meal Type</p>
                <p onClick={displayHealthChecklist}>Health</p>
              </div>
            </div>
          )}
          {showDietChecklist && (
            <div className="diet">
              <ul className="list">
                {dietItem.map((item) => (
                  <li key={item.id} className="diet-items">
                    <label>
                      <input
                        type="radio"
                        checked={item.checked}
                        onChange={() => {
                          toggleItem(item.id, "diet");
                          updateSelectedItem(item, "diet");
                        }}
                      />
                      {item.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showMealTypeChecklist && (
            <div className="meal-type">
              <ul className="list2">
                {mealTypeItem.map((item) => (
                  <li key={item.id} className="meal-type-items">
                    <label>
                      <input
                        type="radio"
                        checked={item.checked}
                        onChange={() => {
                          toggleItem(item.id, "meal-type");
                          updateSelectedItem(item, "meal-type");
                        }}
                      />
                      {item.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showHealthChecklist && (
            <div className="health">
              <ul className="list3">
                {healthItem.map((item) => (
                  <li key={item.id} className="health-items">
                    <label>
                      <input
                        type="radio"
                        checked={item.checked}
                        name="item"
                        onChange={() => {
                          toggleItem(item.id, "health");
                          updateSelectedItem(item, "health");
                        }}
                      />
                      {item.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="ingredient">
            <input
              value={ingredient}
              onChange={(event) => setIngredient(event.target.value)}
              placeholder="Enter Ingredients"
              name="item"
              type="text"
            />
          </div>
          <div className="cuisine">
            <input
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
              placeholder="Enter Cuisine"
              type="text"
            />
          </div>
          <button className="search" onClick={searchRecipes}>
            Search Recipes
          </button>
        </div>
        <div className="top-wrapper">
          <div className="top">
            {recipe.hits
              ? recipe.hits.map((hit, index) => (
                  <a key={index} href={hit.recipe.url} target="_blank">
                    <p>{hit.recipe.label}</p>
                  </a>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
