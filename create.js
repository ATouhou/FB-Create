let argv = require('yargs').argv;
let chance = require('chance')();
let faker = require('faker');
let Nightmare = require('nightmare');
let nightmare = Nightmare({ 
    show: true,
    'webPreferences': { 
       partition: 'nopersist'
    },
    waitTimeout: 50000 
});

// Useragent
let ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0';

// Generate fake information
let firstname = faker.name.firstName();
let surname = faker.name.lastName();
let gender = 1; // 1: Female, 2: Male
let year = chance.year({ min: 1996, max: 1998 });
let dob = chance.birthday({ year: year });

nightmare
    .useragent(ua)
    .goto('http://m.facebook.com/reg')
    .type('input[name="firstname"]', firstname)
    .type('input[name="lastname"]', surname)
    .type('input[name="reg_email__"]', argv.mobile)
    .select('#sex', gender)
    .type('#birthday_day', dob.getDay())
    .type('#birthday_month', dob.getMonth())
    .type('#birthday_year', year)
    .type('input[name="reg_passwd__"]', argv.password)
    .click('#signup_button')
    .wait(40000)
    .evaluate(function() {
        return document.querySelector('body').innerText;
    })
    .then(function(body) {
        if(body.indexOf('Security check' !== -1)) {
            return nightmare
                   .type('input[name="contact_point"]', argv.mobile)
                   .click('input[value="Continue"]')    
                   .wait(40000)
                   .click('a[href*="skip"]')
                   .click('a[href*="skip"]')
                   .click('a[href*="skip"]')
                   .end();
        } else {
            return nightmare
                   .click('a[href*="skip"]')
                   .click('a[href*="skip"]')
                   .click('a[href*="skip"]')
                   end();    
        }
    })
    .then(function() {
        console.log(`${argv.mobile}:${argv.password}:${dob.getDay()}/${dob.getMonth()}/${year}`);
    })
    .catch(function(err) {
        console.log(err);
    });
