(function () {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();
    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  function getGreeting(name) {
    if (name[0].toLowerCase() === 'j') {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }

  var greetings = names.map(getGreeting);
  console.log(greetings);

  var separatedGreetings = names.reduce(function (acc, name) {
    if (name[0].toLowerCase() === 'j') {
      acc.bye.push(byeSpeaker.speakSimple(name));
    } else {
      acc.hello.push(helloSpeaker.speakSimple(name));
    }
    return acc;
  }, { hello: [], bye: [] });

  console.log("Hello Greetings:", separatedGreetings.hello);
  console.log("Goodbye Greetings:", separatedGreetings.bye);
})();