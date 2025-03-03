Feature: Abstracta store page

  Scenario Outline: Add and remove an item from the Abstracta store page
    Given user goes to the Abstracta store page
    When the user enters "<product>" on the searchbar
    And user clicks on search button
    And user selects the option 1
    And user adds the product to the shopping cart
    And user clicks on the shopping cart button
    And user clicks on the view shopping card button
    Then "<product>" should be on column "<productColumn>" in the shopping cart
    When user clicks on remove item from the shopping cart
    Then shopping card should be empty
    
    Examples:
      | product | productColumn | 
      | iPhone  | Product Name  | 