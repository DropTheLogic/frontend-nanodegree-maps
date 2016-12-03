#Google Maps Neighborhood Project: The Williamsburger!

##About
This [Udacity](udacity.com) [project](https://classroom.udacity.com/nanodegrees/nd001/parts/00113454014/modules/271165859175462/lessons/2711658591239847/concepts/26906985370923) creates a web-app neighborhood map of burger joints by using the Google maps and Foursquare APIs.

##Install
No pre-processors or build tools were used in this project. To deploy, simply download or clone the project. In order for the APIs to function, certain strings need to be replaced:
* index.html: in the final `<script>` tag of the body, replace `APIKEY` with a valid Google Maps API key.
* js/app.js : in the `getFoursquareData` function, replace the values for the attributes named `'client_secret'` and `'cliend_id'` with valid Foursquare developer client_secret and client_id keys.

##How to Use
The app parses a database of places and loads information about them into an array of markers, which are then dropped onto a map. There is also a list view of the same markers along the left side. Loading indicators display until all the data is loaded.

#####Basic Use
Clicking either a list item or a marker will open an info window above the corresponding marker on the map, displaying formatted information about that place. 

#####Filtering
Above the list is an input that allows for filtering of the list and markers. The filter will limit the displayed markers and list items to ones that match the query, either in name or address.