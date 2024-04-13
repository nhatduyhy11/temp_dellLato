const socket = io();

const { name, room } = $.deparam(window.location.search);

socket.on("connect", () => {
  socket.emit("USER_INFO", {
    name,
    room,
  });
});

socket.on("disconnect", () => {
  console.log("Server downs");
});

socket.on("CREATE_MESSAGE_FROM_SERVER_TO_CLIENT", (msg) => {
  const newTemplate = $("#message-template").html();
  const html = Mustache.render(newTemplate, {
    content: msg.content,
    from: msg.from,
    createAt: msg.createAt,
  });

  $("#messages").append(html);
});

// document.getElementById
$("#message-form").on("submit", (e) => {
  e.preventDefault();

  const content = $("[name=message]").val();

  socket.emit("CREATE_MESSAGE_FROM_CLIENT_TO_SERVER", {
    from: name,
    content,
  });

  $("[name=message]").val("");

  $("#messages").scrollTop($("#messages").height());
});

$("#message-location").on("click", () => {
  if (!navigator.geolocation) alert("Your browser is old!");
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    socket.emit("LOCATION_TO_SERVER", {
      from: name,
      lat,
      lng,
    });
  });
});

socket.on("LOCATION_TO_CLIENT", (msg) => {
  const { lat, lng } = msg;

  const newTemplate = $("#location-template").html();
  const html = Mustache.render(newTemplate, {
    href: `https://www.google.com/maps/?q=${lat},${lng}`,
    from: msg.from,
    createAt: msg.createAt,
  });

  $("#messages").append(html);
});

socket.on("USERS_IN_ROOM", (msg) => {
  const users = msg.usersInRoom;
  const ol = $("<ol></ol>");

  users.forEach((user) => {
    const li = $("<li></li>");
    li.text(user.name);
    ol.append(li);
  });
  $("#users").html(ol);
});
