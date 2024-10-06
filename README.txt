We are a group of students from the University of Florida completing our senior year project. MiniFridge is a web application optimized for mobile use that will aid college students and young professionals keep track of food purchases, maintain a list of what to buy, and get notifications for foods that will expire soon. The main functionality will include an inventory list, to buy list, and expiration notifications. Pages included in frontend will be 
login/signup 

homepage-pantry- inventory list 
to buy list page
notifications page -expiration only show up on that page if its 5 days from expiring 
profile page
	settings 

We will use multiple databases.
A food Database - integrated into the NutritionX open database, it will contain all the foods a user can add to their inventory and to buy lists. 
Users Database Contains:
User -> email, password
has a 
InvList-> FoodItems
ToBuyList->FoodItems 

Food Database Contains:
FoodItem -> name, amount, expiration date, photo