import React, { useEffect } from "react";

const App = (props) => {
  React.useEffect(() => {
    /*
Instructions:
(1) Refactor .forEach below to create a sequence of Promises that always resolves in the same
    order it was created.
  (a) Fetch each planet's JSON from the array of URLs in the search results.
  (b) Call createPlanetThumb on each planet's response data to add it to the page.
(2) Use developer tools to determine if the planets are being fetched in series or in parallel.
 */

    // Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
    /* jshint unused: false */

    (function (document) {
      "use strict";

      var home = null;

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
        console.log(data["st_spstr"]);
      }

      /**
       * XHR wrapped in a promise.
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
    Refactor this code!
     */
      getJSON("http://localhost:3000/data/earth-like-results.json").then(
        function (response) {
          let sequence = Promise.resolve();
          response.results.forEach(function (url) {
            //sequence = sequence   // Series requests
            sequence  // Parallel requests
              .then(function () {
                return getJSON(url);
              })
              .then(createPlanetThumb);
          });
        }
      );
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
