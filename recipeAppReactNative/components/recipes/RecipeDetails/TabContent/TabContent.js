import React from 'react';
import IngredientsTab from './IngredientsTab';
import AboutTab from './AboutTab';
import InstructionsTab from './InstructionsTab';

const TabContent = ({
  activeTab,
  data,
  ingredients,
}) => {
  switch (activeTab) {
    case "Ingredients":
      return <IngredientsTab ingredients = {ingredients} />;
    case "About":
      return <AboutTab data={data} />;
    case "Instructions":
        return <InstructionsTab data={data} />;
    default:
      return null;
  }
};

export default TabContent;
