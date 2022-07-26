// Example 2
function wait(ms) {
    /*
    Instructions:
    (1) Wrap this setTimeout in a Promise. resolve() in setTimeout's callback.
    (2) console.log(this) inside the Promise and observe the results.
    (3) Make sure wait returns the Promise too!
     */
    return new Promise((resolve, reject) => { 
      console.log(this);
      window.setTimeout(function () {
        resolve();
      }, ms);
    });
  }
  
  /*
  Uncomment these lines when you want to test!
  You'll know you've done it right when the message on the page changes.
   */
  var milliseconds = 2000;
  wait(milliseconds).then(finish);
  
  // This is just here to help you test.
  function finish() {
    console.log("Complete after " + milliseconds + "ms.");
  }