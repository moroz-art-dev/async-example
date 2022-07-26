import React, { useEffect } from "react";

const App = (props) => {
  React.useEffect(() => {
    /*
Instructions:
(1) Get the planet data and add the search header.
(2) Create the first thumbnail with createPlanetThumb(data)
(3) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
 */

    // Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
    /* jshint unused: false */

    (function (document) {
      "use strict";

      let home = null;

      /**
       * Helper function to show the search query.
       * @param {String} query - The search query.
       */
      function addSearchHeader(query) {
        home.innerHTML = '<h2 class="page-title">query: ' + query + "</h2>";
      }

      /**
       * Helper function to create a planet thumbnail.
       * @param  {Object} data - The raw data describing the planet.
       */
      function createPlanetThumb(data) {
        console.log("data", data);
      }

      /**
       * XHR wrapped in a promise
       * @param  {String} url - The URL to fetch.
       * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
       */
      function get(url) {
        return fetch(url, {
          method: "get",
        });
      }

      /**
       * Performs an XHR for a JSON and returns a parsed JSON response.
       * @param  {String} url - The JSON URL to fetch.
       * @return {Promise}    - A promise that passes the parsed JSON response.
       */
      function getJSON(url) {
        return get(url).then(function (response) {
          return response.json();
        });
      }

      //window.addEventListener("WebComponentsReady", function () {
      home = document.querySelector("section");
      /*
    Uncomment the next line and start here when you're ready to add the first thumbnail!
    Your code goes here!
     */
      getJSON("http://localhost:3000/data/earth-like-results.json")
        .then(function (response) {
          addSearchHeader(response.query);
          console.log(response.results[0]);
          return getJSON(response.results[0]);
        })
        .catch(function () {
          throw Error("Search Request Error");
        })
        // .then(function (planetData) {
        //   createPlanetThumb(planetData);
        // })
        .then(createPlanetThumb)
        .catch(function (e) {
          addSearchHeader("unknown");
          console.log(e);
        });
      //});
    })(document);
  }, []);
  return (
    <div className="App">
      <section></section>
    </div>
  );
};

export default App;
