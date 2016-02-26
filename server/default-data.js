Meteor.startup(function () {
  if (Colors.find().count() === 0) {
    Colors.insert({Rvalue: 138, Gvalue: 200, Bvalue: 67, createdAt: new Date()});
    Colors.insert({Rvalue: 248, Gvalue: 68, Bvalue: 125, createdAt: new Date()});
    Colors.insert({Rvalue: 21, Gvalue: 38, Bvalue: 40, createdAt: new Date()});
  }
});
