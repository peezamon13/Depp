import React from "react";

import MenuWrapper from "../../components/product/MenuWrapper";


const Index = ({ categoryList, productList }) => {
  return (
    <React.Fragment>

      <MenuWrapper categoryList={categoryList} productList={productList} />
      
    </React.Fragment>
  );
};

export default Index;
