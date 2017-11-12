(function (io) {

  // as soon as this file is loaded, connect automatically,
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' +
        'e.g. to send a GET request to Sails, try \n' +
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }


})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);

/**
 * Register Form
 */

(function ($) {
  var registerForm = $("#register form"),
    errorDiv = $("#error"),
    successDiv = $("#success"),
    username = registerForm.find("input[name=username]"),
    password = registerForm.find("input[name=password]"),
    passwordConfirm = registerForm.find("input[name=passwordConfirm]");

  errorDiv.hide();
  successDiv.hide();

  registerForm.submit(function (e) {
    e.preventDefault();

    errorDiv.hide();
    errorDiv.html("");
    successDiv.hide();
    successDiv.html("");

    if (password.val() === passwordConfirm.val()) {
      register(username.val(), password.val());
    } else {
      errorDiv.html("<p>Passwords must match.</p>");
      errorDiv.slideDown();
    }
  });

  var register = function (username, password) {
    $.post('/user', {
      username: username,
      password: password
    }).then(function (data) {
      successDiv.html("<p>Successfully create user " + data.username + ". You may log in now.</p>");
      successDiv.slideDown();
    }).fail(function (data) {
      errorDiv.html("<p>Error creating user.</p>");
      errorDiv.slideDown();
      console.log(data);
    });
  };
})(jQuery);

