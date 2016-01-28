Meteor.startup(function () {
  if (Colors.find().count() === 0) {
    Colors.insert({R: 138, G: 200, B: 67, createdAt: new Date()});
    Colors.insert({R: 248, G: 68, B: 125, createdAt: new Date()});
    Colors.insert({R: 21, G: 38, B: 40, createdAt: new Date()});
  }
});
