import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Examples from '../imports/api/examples.js';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

function insertExample(text,trueLabel,id){
  Examples.insert({text,trueLabel,id,createdAt:new Date()});
}


Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com'
    );
  }

  if (Examples.find().count()===0){
    insertExample(
      'NEW YORK, September 3 (New Ratings) - The European Union has reportedly made significant progress in settling its prolonged antitrust case against The Coca-Cola Co (KO.',
      'business',
      0,
    );

    insertExample(
      'Captain Inzamam-ul-Haq praised his spinners after Pakistan knocked Kenya out of the Champions Trophy with a seven-wicket win at Edgbaston.',
      'sports',
      1,
    );

    insertExample(
      'U2 and Apple Computer are expected to announce next week that they have inked a deal to sell custom iPods. According to a source, the band #39;s upcoming Interscope album  quot;How to Dismantle an Atomic Bomb, quot; due Nov.',
      'sci-tech',
      2,
      );

    insertExample(
      'Oracle Corp. handed the software industry some positive earnings news after the bell on Tuesday, but investors pulled cash from the sector on concerns that information technology spending has become anemic.',
      'business',
      3,
    );

    insertExample(
      'AFP - A little known radical Islamic group has threatened to kill Indian cricketers when they tour Bangladesh from Tuesday, the Indian High Commission told AFP.',
      'world',
      4,
    );

    insertExample(
      "Documents show that the nation's most influential rail-safety group is tightly bound to the railroad industry.",
      'world',
      5,
    );

    insertExample(
      "Cornice blasts Seagate's suit over patents for tiny hard drives used in portable gadgets.",
      'sci-tech',
      6,
    );


    insertExample(
      'ROSTOV-ON-DON, RUSSIA - Three Russian police officers have been charged with criminal negligence in connection with the Beslan school hostage-taking that left 360 people dead, almost half of them children.',
      'world',
      7,
    );

    insertExample(
      'SYDNEY, Sep 25: Australia #39;s stand-in captain and wicketkeeper Adam Gilchrist has said that his twin responsibilities will not come in the way of seeking a winning start for his team against India in next month #39;s Test series.',
      'sports',
      8,
    );

    insertExample(
      'Japanese stocks rose 1.9 percent by midsession on Monday as a strong performance by US semiconductor-related stocks gave a push to Japanese peers such as Advantest Corp.',
      'business',
      9,
    );

  }
});
