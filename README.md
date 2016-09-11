FB Create (In Development)
==========================

**FB Create** is a nightmareJS script used to create Facebook accounts using mobile numbers.

Install
-------

    git clone https://github.com/JamesTheHacker/FB-Create
    cd FB-Create
    npm install

Usage
-----

    node create.js --mobile "07743600000" --password="SeCrEtPaSsWoRd"

A Facebook account will be created using the mobile number provided when running `create.js`. A code will be sent to this number and the user will have to manually type the SMS code into the confirmation box. You may get asked to enter the mobile number twice. This is normal.

Firstname, lastname, and date of birth are automatically generated.
