'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    */
      return queryInterface.bulkInsert('Characters', 
      [
        {
            "nama": "Cob Devin",
            "image": "http://dummyimage.com/178x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Dierdre Berends",
            "image": "http://dummyimage.com/180x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Lenci Bathersby",
            "image": "http://dummyimage.com/236x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Jacky Mouget",
            "image": "http://dummyimage.com/170x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Grier Bagot",
            "image": "http://dummyimage.com/212x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Aliza Chellam",
            "image": "http://dummyimage.com/180x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Franky Rackley",
            "image": "http://dummyimage.com/212x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Myrtle Keuntje",
            "image": "http://dummyimage.com/209x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Camella Foulger",
            "image": "http://dummyimage.com/131x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Cleopatra Leif",
            "image": "http://dummyimage.com/126x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Edlin Scritch",
            "image": "http://dummyimage.com/245x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Anna Stead",
            "image": "http://dummyimage.com/205x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Dore De Biasi",
            "image": "http://dummyimage.com/136x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Ruperto Fallis",
            "image": "http://dummyimage.com/196x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Reynolds Roadknight",
            "image": "http://dummyimage.com/128x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Shaine Rochelle",
            "image": "http://dummyimage.com/125x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Ginger Jordeson",
            "image": "http://dummyimage.com/182x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Dina Kolushev",
            "image": "http://dummyimage.com/242x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Ianthe Folonin",
            "image": "http://dummyimage.com/135x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Marjory Royden",
            "image": "http://dummyimage.com/173x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Terrence Mateo",
            "image": "http://dummyimage.com/219x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Clay Marfell",
            "image": "http://dummyimage.com/216x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Alexia Skrzynski",
            "image": "http://dummyimage.com/112x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Trixi Cammomile",
            "image": "http://dummyimage.com/180x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Kenny Pummell",
            "image": "http://dummyimage.com/234x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Laughton McKenna",
            "image": "http://dummyimage.com/139x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Win Pudge",
            "image": "http://dummyimage.com/112x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Danika Schollar",
            "image": "http://dummyimage.com/150x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Ronica Rochford",
            "image": "http://dummyimage.com/227x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Adoree Gallagher",
            "image": "http://dummyimage.com/237x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Launce Bauldry",
            "image": "http://dummyimage.com/151x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Filmer Brandenberg",
            "image": "http://dummyimage.com/158x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Onfroi Belfit",
            "image": "http://dummyimage.com/115x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Kris Creek",
            "image": "http://dummyimage.com/240x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Derick Robet",
            "image": "http://dummyimage.com/113x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Elisabet Digance",
            "image": "http://dummyimage.com/105x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Merrily Tolmie",
            "image": "http://dummyimage.com/127x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Gennie Gollard",
            "image": "http://dummyimage.com/130x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Dante Willshee",
            "image": "http://dummyimage.com/245x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Anselma Purvess",
            "image": "http://dummyimage.com/201x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Kirbee Crippin",
            "image": "http://dummyimage.com/245x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Kylen Aikman",
            "image": "http://dummyimage.com/232x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Sidnee Ralls",
            "image": "http://dummyimage.com/184x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Huntley Roubert",
            "image": "http://dummyimage.com/135x100.png/cc0000/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Devonne Have",
            "image": "http://dummyimage.com/199x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Jamil Tomaskov",
            "image": "http://dummyimage.com/243x100.png/dddddd/000000",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Gerhard Winsor",
            "image": "http://dummyimage.com/171x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Laurella Kingsley",
            "image": "http://dummyimage.com/128x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Florri Daddow",
            "image": "http://dummyimage.com/152x100.png/ff4444/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "nama": "Priscilla Dimic",
            "image": "http://dummyimage.com/157x100.png/5fa2dd/ffffff",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
      ]  
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
