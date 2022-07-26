// Example 3
function ready() {
  /*
    Instructions:
    (1) Set network throttling.
    (2) Wrap an event listener for readystatechange in a Promise.
    (3) If document.readyState is not 'loading', resolve().
    (4) Test by chaining wrapperResolved(). If all goes well, you should see "Resolved" on the page!
  
    Make sure you return the Promise!
     */
  return new Promise((resolve, reject) => {
    function changeReadyState() {
      if (document.readyState !== "loading") {
        resolve();
      }
      if (document.readyState == "loading") {
        reject();
      }
    }
    document.addEventListener("readystatechange", changeReadyState);
    changeReadyState();
  });
}

/*
  Don't forget to test your code!
  Call wrapperResolved when the DOM is ready.
   */
ready().then(wrapperResolved).catch(wrapperRejected);

// Just here for your testing
function wrapperResolved() {
  console.log("Resolved!");
}

function wrapperRejected() {
  console.log("Rejected!");
}
