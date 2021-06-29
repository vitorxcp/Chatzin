$(function() {
  if(localStorage.tt === '0'){}else{
    localStorage.setItem('tt','a')
    localStorage.setItem('i'," [MEMBRO]")
  }
  const id = localStorage.i
 
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  
  var countUser
  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page

  // Prompt for setting a username
  var username;
  var usering;
  var username2;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput;

  var socket = io();

  function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "[1 Participante.]";
    } else {
      message += "[]" + data.numUsers + " Participantes.]";
    }
    countUser = data.numUsers
   // log(message);
  }

  // Sets the client's username
  function setUsername () {
    username = cleanInput($usernameInput.val().trim()+id);
     username2 = cleanInput($usernameInput.val().trim());
usering = "user"
    if(username === id){
      username = "Guest"+id
      console.log(id)
    }

    // If the username is valid
    if (username) {
    
      $currentInput = $inputMessage;
      let a = username
       var $aeditado = $('<strong><a>')
      .text("CEO")
      .css('color', "red")
      if(a === "vitor_xp [MEMBRO]") a = "vitor_xp"
if(username === "vitor_xp [MEMBRO]") username = a+` [CEO]`
 if(a === "Papel [MEMBRO]") a = "Papel"
if(username === "Papel [MEMBRO]") username = a+` [MOD+]`
if(a === "Pedro M [MEMBRO]") a = "Pedro M"
if(username === "Pedro M [MEMBRO]") username = a+` [VIP++]`
      socket.emit('add user', username);
    }
       if (username2) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();
      let a = username2
       var $aeditado = $('<strong><a>')
      .text("CEO")
      .css('color', "red")
      if(a === "vitor_xp [MEMBRO]") a = "vitor_xp"
if(username2 === "vitor_xp ghj") username2 = a+` [CEO]`
 if(a === "Papel [MEMBRO]") a = "Papel"
if(username2 === "Papel [MEMBRO]") username2 = a+` [MOD+]`
if(a === "Pedro M [MEMBRO]") a = "Pedro M"
if(username2 === "Pedro M [MEMBRO]") username2 = a+` [VIP++]`
      socket.emit('add user', username2);
    }
  }
  var membros;


  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
      var message1 = $inputMessage.val();
    // Prevent markup from being injected into the message
   // message = cleanInput(message);
    // if there is a non-empty message and a socket connection
     	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	const hora = ping.getHours();
	const minutos = ping.getMinutes();
        let hrs = ""+hora+":"+minutos+""
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
    //     username: usering,
        message: "a",
        message: "\n "+message
      });
      if(message === "/users"){
        	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	const hora = ping.getHours();
	const minutos = ping.getMinutes();
        let hrs = ""+hora+":"+minutos+""
        addChatMessage({
          username: "Chatzin [BOT]",
          message: "Temos " + countUser + " Participantes."
        });
      }
    if(message === "/teste"){
         if(username === "vitor_xp [CEO]") {
           addChatMessage({
          username: "Chatzin [BOT]",
        message: "Opa bb, como vai?"
        });
           return;
         }

       
          
   addChatMessage({
          username: "Chatzin [BOT]",
        message: "Comando indisponível para uso..."
        });
    }
       
        if(message === "/help" | message === "/ajuda"){
          //addChatTyping(username)
          if(username === "vitor_xp [CEO]") {
//removeChatTyping(username)
return  addChatMessage({
          username: "Chatzin [BOT]",
          message: `/users - total de membros. | /members1234 - nome dos membros. | /ping - veja o ping do WebSocket. | /teste - teste de comandos.`
        });}
        	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	const hora = ping.getHours();
	const minutos = ping.getMinutes();
        let hrs = ""+hora+":"+minutos+""
       
          addChatMessage({
          username: "Chatzin [BOT]",
          message: `/users - total de membros. | /ping - veja o ping do WebSocket.`
        });
       //   removeChatTyping(username)
      }
      if(message === "/members1234") {
          amsfd()
        	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	const hora = ping.getHours();
	const minutos = ping.getMinutes();
        let hrs = ""+hora+":"+minutos+""
        addChatMessage({
          username: "Chatzin [BOT]",
          message: "" + membros + "."
        });
      }
 if(message === "/ping") {
    
        addChatMessage({
          username: "Chatzin [BOT]",
          message: "WebSocket API Ping: ...ms. | Site API Ping: ...ms."
        });
      }
      // tell server to execute 'new messages' and send along one parameter
      socket.emit('new message', message);
    }
  }

  // Log a message
  function log (message, options) {
    var $el = $('<li><br>').addClass('log').text(message);
     var $el2 = $('<br>').text(" ");
    addMessageElement($el ,$el2 , options);
  }
  

  // Adds the visual chat message to the message list
  function addChatMessage  (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $Div = $('</br><div id="jump"></div></br>')
      	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	const hora = ping.getHours();
	const minutos = ping.getMinutes();
    let coloruser = "#929191" 
    if(data.username === "vitor_xp [CEO]") coloruser = "red"
    if(data.username === "Pedro M [VIP++]") coloruser = "#5FDA55"
    if(data.username === "Chatzin [BOT]") coloruser = "#00ADFF"
     if(data.username === "Papel [MOD+]") coloruser = "#00A6D8"
      //getUsernameColor(data.username)
        let hrs = ""+hora+":"+minutos+""
    var $usernameDiv = $('<span class="username"/>')
      .text(data.username+" - "+hrs)
      .css('color', coloruser)
      var $divsoria = $('<br><a>')
      .text("-")
      .css('color', "#36393f")
      
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message).css("color", "#fafafa");
    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($Div, $usernameDiv, $divsoria, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = 'Está digitando...';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
       return $(this).data('username') === data.usering;
    });
  }
//  <script type="text/javascript" src="https://l2.io/ip.js?var=userip"></script>
  // Gets the color of a username through our hash function
  function getUsernameColor (username, usering) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < usering.length; i++) {
       hash = usering.charCodeAt(i) + (hash << 5) - hash;
    }
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }
function amsfd (){
   setUsername()
      membros = [""+username2+"(Você)", ]
   }
  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    // membros.push(data.username)
    connected = true;
    // Display the welcome message
    var message = "Você Acaba de Entrar No Chat, Atualmente Temos "+data.numUsers+" Usuarios Aqui!";
    log(message, {
      prepend: true
    });
  //  membros.push(data.username)
    addParticipantsMessage(data);
   // let as = membros.indexOf(data.username)
   // membros.splice(as, 1)
  });

  // Whenever the server emits 'new messages', update the chat body
  socket.on('new message', function (data) {
   //  membros.push(data.username)
    addChatMessage(data);
  });
  
  // Whenever the server emits 'alerta', log it in the chat body
  

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user entrou', function (data) {
    amsfd()
    log("[+] "+data.username + ' entrou');
//   log("Guest"+id + ' saiu');
    membros.push(data.username)
    addParticipantsMessage(data);
    
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user saiu', function (data) {
    amsfd()
    if(data.username === "Guest"){
      log("Guest"+id + ' saiu');
      console.log("Guest"+id + ' saiu');
    }else{
      log("[-] "+data.username + ' saiu');
      console.log(data.username + ' saiu');
    }
    let as = membros.indexOf(data.username)
    membros.splice(as, 1)
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
   //  membros.push(data.username)
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
   //  membros.push(data.username)
    removeChatTyping(data);
  });
});