import React, { useEffect } from "react";

const App = (props) => {
  React.useEffect(() => {
    /*
Challenge:
Use what you've learned about Promises to request thumbnails in parallel but create them in the
proper order even if all the requests haven't finished.
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
       * Helper function to create a planet thumbnail - Promisified version!
       * @param  {Object} data - The raw data describing the planet.
       */
      function createPlanetThumb(data) {
        return new Promise(function (resolve) {
          console.log("rendered: " + data.pl_name);
          resolve();
        });
      }

      /**
       * XHR wrapped in a promise
       * @param  {String} url - The URL to fetch.
       * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
       */
      function get(url) {
        return fetch(url);
      }

      /**
       * Performs an XHR for a JSON and returns a parsed JSON response.
       * @param  {String} url - The JSON URL to fetch.
       * @return {Promise}    - A promise that passes the parsed JSON response.
       */
      /**
       * Performs an XHR for a JSON and returns a parsed JSON response - with a delay!
       * @param  {String} url - The JSON URL to fetch.
       * @return {Promise}    - A promise that passes the parsed JSON response.
       */
      function getJSON(url) {
        console.log("sent: " + url);
        return get(url).then(function (response) {
          // For testing purposes, I'm making sure that the urls don't return in order
          if (url === "http://localhost:3000/data/planets/Kepler-62f.json") {
            return new Promise(function (resolve) {
              setTimeout(function () {
                console.log("received: " + url);
                resolve(response.json());
              }, 500);
            });
          } else {
            console.log("received: " + url);
            return response.json();
          }
        });
      }

      //window.addEventListener("WebComponentsReady", function () {
      home = document.querySelector('section[data-route="home"]');

      getJSON("http://localhost:3000/data/earth-like-results.json")
        .then(function (response) {
          addSearchHeader(response.query);
          return response;
        })
        .then(function (response) {
          var sequence = Promise.resolve();

          // .map executes all of the network requests immediately.
          var arrayOfExecutingPromises = response.results.map(function (
            result
          ) {
            return getJSON(result);
          });

          arrayOfExecutingPromises.forEach(function (request) {
            // Loop through the pending requests that were returned by .map (and are in order) and
            // turn them into a sequence.
            // request is a getJSON() that's currently executing.
            sequence = sequence.then(function () {
              // Remember that createPlanetThumb is a Promise, so it must resolve before Promises
              // later in the sequence can execute.
              return request.then(createPlanetThumb);
            });
          });
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
